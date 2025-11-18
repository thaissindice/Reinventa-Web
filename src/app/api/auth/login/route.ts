// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";

/**
 * Quick-auth route:
 * - Se houver Prisma exportado em /lib/prisma (DATABASE_URL configurada), tenta usar.
 * - Senão, usa um array de "demoUsers" (fallback) para testes rápidos.
 *
 * WARNING: demo fallback usa base64 (btoa) como "hash" — apenas para desenvolvimento.
 */

function demoHash(pw: string) {
  try { return typeof window === "undefined" ? Buffer.from(pw).toString("base64") : btoa(pw); }
  catch { return pw; }
}

const demoUsers = [
  { id: 1, email: "mentor@example.com", passwordHash: demoHash("mentorpass"), role: "mentor", name: "Mentor Demo" },
  { id: 2, email: "candidate@example.com", passwordHash: demoHash("candidatepass"), role: "candidate", name: "Candidato Demo" },
];

let prisma: any = null;
try {
  // tenta importar prisma se existir (não falha se arquivo não existir)
  // ajuste o caminho se o seu prisma export for diferente
  // (você mostrou `export default prisma;` e também `export const prisma = ...` em lugares diferentes,
  //  então testamos ambos.)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const p = require("../../../../lib/prisma");
  prisma = p?.default ?? p?.prisma ?? null;
} catch (e) {
  prisma = null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    // tenta usar Prisma (recomendado se tiver DB)
    if (prisma) {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        // se você estiver armazenando hash real, verifique aqui conforme seu schema
        if (!user) {
          return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });
        }
        // aqui assumimos que user.passwordHash existe (ajusta conforme seu schema)
        const incomingHash = demoHash(password); // substitua por verificação real (bcrypt) se usar DB
        if ((user.passwordHash ?? user.password ?? "") !== incomingHash) {
          return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });
        }

        // retorno simples: token não real (você pode integrar JWT depois)
        const payload = { id: user.id, email: user.email, role: user.role ?? "candidate" };
        return NextResponse.json({ user: payload, token: "dev-token-" + String(user.id) }, { status: 200 });
      } catch (err) {
        console.error("Prisma login error:", err);
        // se algo falhar com prisma, caímos para fallback
      }
    }

    // fallback: demo users (útil para entrega, sem DB)
    const user = demoUsers.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
    if (!user) return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });

    if (user.passwordHash !== demoHash(password)) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });
    }

    const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
    return NextResponse.json({ user: payload, token: "dev-token-" + String(user.id) }, { status: 200 });
  } catch (err) {
    console.error("login route error:", err);
    return NextResponse.json({ message: "Erro no servidor." }, { status: 500 });
  }
}

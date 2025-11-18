// src/app/api/apply/route.ts
import { NextResponse } from "next/server";

type ApplyBody = {
  jobId?: string | number;
  jobTitle?: string;
  name?: string;
  email?: string;
  cvLink?: string;
  date?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyBody;

    // validação simples
    if (!body.name || !body.email) {
      return NextResponse.json({ ok: false, error: "name_and_email_required" }, { status: 400 });
    }

    // aqui você pode validar email com regex se quiser
    // const emailValid = /\S+@\S+\.\S+/.test(body.email);

    // log para dev (vai aparecer no terminal onde rodou `npm run dev`)
    console.log("[API] nova candidatura recebida:", JSON.stringify(body));

    // ---- se quiser salvar no DB com Prisma, descomente e adapte:
    // import prisma from "@/lib/prisma"; // exemplo de import
    // await prisma.application.create({ data: { jobId: String(body.jobId), jobTitle: body.jobTitle, name: body.name, email: body.email, cvLink: body.cvLink, appliedAt: new Date(body.date || undefined) } });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[API apply] erro:", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

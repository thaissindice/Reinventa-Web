// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ message: "Bad request" }, { status: 400 });

    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password)
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });

    // Busca usuário no banco (assumindo model User com campo email + passwordHash)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // compara senha (bcrypt). Ajuste se seu campo tem outro nome (ex: password)
    const hashed = (user as any).passwordHash ?? (user as any).password;
    const match = await bcrypt.compare(password, hashed);
    if (!match) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET not set");
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    // gera JWT
    const payload = { id: user.id, email: user.email, role: (user as any).role ?? "candidate" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    // retorna token + user (sem senha)
    const response = NextResponse.json({
      user: { id: user.id, email: user.email, role: (user as any).role ?? "candidate" },
      token,
    });

    // opcional: setar cookie httpOnly (mais seguro)
    // response.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

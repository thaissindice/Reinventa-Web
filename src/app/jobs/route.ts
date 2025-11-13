import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 10);

  try {
    const jobs = await prisma.job.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: Math.min(limit, 50),
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        locationType: true,
        location: true,
        salary: true,
        companyName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ jobs });
  } catch (e) {
    console.error("Erro ao buscar vagas:", e);
    return NextResponse.json(
      { jobs: [], error: "Falha ao buscar vagas" },
      { status: 500 }
    );
  }
}

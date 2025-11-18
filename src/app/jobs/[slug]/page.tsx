import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ApplyButton from "@/components/ApplyButton";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    select: { title: true, companyName: true },
  });

  return {
    title: job
      ? `${job.title} — ${job.companyName} | Reinventa+`
      : "Vaga | Reinventa+",
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      companyName: true,
      type: true,
      locationType: true,
      location: true,
      salary: true,
      description: true,
      applicationEmail: true,
      applicationUrl: true,
      approved: true,
    },
  });

  if (!job || !job.approved) return notFound();

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <p className="text-gray-600">
        {job.companyName} • {job.location ?? job.locationType} • {job.type}
      </p>

      <p className="text-lg">{formatBRL(job.salary)} / mês</p>

      {job.description && (
        <section className="prose max-w-none">
          <h2>Descrição</h2>
          <p>{job.description}</p>
        </section>
      )}

      {/* ----------- área de candidatura ----------- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Como se candidatar</h2>

        
<section className="space-y-4">
  <h2 className="text-xl font-semibold">Como se candidatar</h2>
  <ApplyButton jobId={params.slug} jobTitle={job.title} />
</section>


        {/* 🔗 link externo opcional */}
        {job.applicationUrl && (
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300 text-sm"
          >
            Ver página da vaga
          </a>
        )}

        {job.applicationEmail && (
          <a
            href={`mailto:${job.applicationEmail}`}
            className="inline-block rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300 text-sm"
          >
            Enviar currículo por e-mail
          </a>
        )}
      </section>
    </main>
  );
}

function formatBRL(v?: number) {
  if (typeof v !== "number") return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(v);
}

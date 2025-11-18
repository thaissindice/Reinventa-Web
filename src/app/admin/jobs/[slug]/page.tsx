import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  // normaliza campos que podem ser `null` em `undefined` para
  // casar com os tipos do componente JobPage
  const jobForComponent = {
    ...job,
    companyLogoUrl: job.companyLogoUrl ?? undefined,
    applicationUrl: job.applicationUrl ?? undefined,
    applicationEmail: job.applicationEmail ?? undefined,
    location: job.location ?? undefined,
  };

    return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={jobForComponent} />
      <AdminSidebar job={job} />
    </main>
  );

}

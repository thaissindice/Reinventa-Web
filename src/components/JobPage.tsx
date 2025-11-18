// src/components/JobPage.tsx
"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Markdown from "./Markdown";
import ApplyModal from "./ApplyModal";

type JobPropsShape = Partial<Job> & {
  companyName?: string;
  companyLogoUrl?: string;
  applicationUrl?: string;
};

interface JobPageProps {
  job: JobPropsShape;
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    id,
  },
}: JobPageProps) {
  const [openApply, setOpenApply] = useState(false);

  return (
    <>
      <section className="w-full grow space-y-5">
        <div className="flex items-start gap-4">
          {companyLogoUrl && (
            <div className="min-w-[100px]">
              <Image
                src={companyLogoUrl}
                alt="Company logo"
                width={100}
                height={100}
                className="rounded-xl object-cover"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                  {title}
                </h1>

                <p className="font-semibold text-slate-700 mt-1">
                  {applicationUrl ? (
                    <a
                      href={new URL(applicationUrl).origin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-2"
                    >
                      {companyName} <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span>{companyName}</span>
                  )}
                </p>
              </div>

              {/* Ações: aplicar (modal) + link externo (se houver) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenApply(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
                >
                  Candidatar-se
                </button>

                {applicationUrl && (
                  <a
                    href={applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-slate-700 hover:bg-slate-50"
                    title="Abrir site da candidatura"
                  >
                    Ir para candidatura
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            <div className="text-muted-foreground mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </p>
              <p className="flex items-center gap-2">
                <Globe2 size={16} className="shrink-0" />
                {location || "Worldwide"}
              </p>
              <p className="flex items-center gap-2">
                <Banknote size={16} className="shrink-0" />
                {formatMoney(salary)}
              </p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          {description && <Markdown>{description}</Markdown>}
        </div>
      </section>

      {/* Modal de candidatura */}
      <ApplyModal
        open={openApply}
        onClose={() => setOpenApply(false)}
        jobId={id ?? undefined}
        jobTitle={title}
      />
    </>
  );
}

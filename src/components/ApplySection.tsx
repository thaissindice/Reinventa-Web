// src/components/ApplySection.tsx
"use client";
import { useState } from "react";
import ApplyModal from "./ApplyModal";

type Props = {
  applicationUrl?: string | null;
  applicationEmail?: string | null;
  jobId?: string | number;
  jobTitle?: string;
};

export default function ApplySection({ applicationUrl, applicationEmail, jobId, jobTitle }: Props) {
  const [open, setOpen] = useState(false);

  if (applicationUrl) {
    return (
      <a
        href={applicationUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Candidatar-se pelo site
      </a>
    );
  }

  if (applicationEmail) {
    return (
      <a
        href={`mailto:${applicationEmail}`}
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Enviar e-mail
      </a>
    );
  }

  // Caso padrão: abrir modal
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Aplicar
      </button>

      <ApplyModal open={open} onClose={() => setOpen(false)} jobId={jobId} jobTitle={jobTitle} />
    </>
  );
}

// src/components/AppliedBadge.tsx
"use client";

import { useEffect, useState } from "react";

type Props = { jobId: string };

const STORAGE_KEY = "rs:applied_jobs_v1";

function readApplied(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function AppliedBadge({ jobId }: Props) {
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(readApplied().includes(jobId));
    function onChange() {
      setApplied(readApplied().includes(jobId));
    }
    window.addEventListener("storage", onChange);
    window.addEventListener("applied_jobs_changed", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("applied_jobs_changed", onChange);
    };
  }, [jobId]);

  if (!applied) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md">
      ✓ Candidatado
    </span>
  );
}

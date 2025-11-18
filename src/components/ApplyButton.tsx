// src/components/ApplyButton.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  jobId: string;
  jobTitle?: string;
};

const STORAGE_KEY = "rs:applied_jobs_v1";

function readApplied(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeApplied(arr: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    // also dispatch event so other components in same tab can listen (optional)
    window.dispatchEvent(new Event("applied_jobs_changed"));
  } catch {}
}

export default function ApplyButton({ jobId, jobTitle }: Props) {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function toggleApply() {
    setLoading(true);
    try {
      const list = readApplied();
      if (list.includes(jobId)) {
        // confirmar remoção
        const ok = confirm(`Cancelar sua candidatura para "${jobTitle ?? jobId}"?`);
        if (!ok) {
          setLoading(false);
          return;
        }
        const next = list.filter((x) => x !== jobId);
        writeApplied(next);
        setApplied(false);
      } else {
        // confirmar candidatura
        const ok = confirm(`Deseja se candidatar a "${jobTitle ?? jobId}"?`);
        if (!ok) {
          setLoading(false);
          return;
        }
        const next = Array.from(new Set([...list, jobId]));
        writeApplied(next);
        setApplied(true);
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar candidatura (ver console).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleApply}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition ${
        applied
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      } ${loading ? "opacity-60 pointer-events-none" : ""}`}
      title={applied ? "Cancelar candidatura" : "Candidatar-se"}
    >
      {applied ? "Candidatado" : "Candidatar-se"}
    </button>
  );
}

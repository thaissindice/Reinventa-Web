"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { email: string; role: "mentor" | "aprendiz" | "empresa" };
type Job = {
  id: number;
  slug: string;
  title: string;
  type: string;
  locationType: string;
  location?: string | null;
  salary: number;
  companyName: string;
  createdAt: string; // serializado
};

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // exige login
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(raw));
  }, [router]);

  // busca vagas após ter usuário
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await fetch("/api/jobs?limit=8", { cache: "no-store" });
        const data = await res.json();
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user) return <div className="p-6">Redirecionando…</div>;

  const isAprendiz = user.role === "aprendiz";

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">


      {/* Painel do APRENDIZ */}
      {isAprendiz && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Vagas recomendadas</h2>

          {loading ? (
            <p>Carregando…</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">Ainda não há vagas aprovadas. Volte mais tarde.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {jobs.map((job) => (
                <li key={job.id} className="rounded-xl border p-4">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.companyName} • {job.location ?? job.locationType} • {job.type}
                  </p>
                  <p className="mt-1 text-sm">{formatBRL(job.salary)} / mês</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => router.push(`/jobs/${job.slug}`)} // <<< usa slug
                      className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      Ver detalhes
                    </button>
                    <button
                      onClick={() => alert("Aplicação simulada!")}
                      className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
                    >
                      Aplicar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Mentor/empresa: placeholder simples (pode evoluir depois) */}
      {!isAprendiz && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Vagas recentes</h2>
          <p className="text-gray-600">Use “Postar vaga” para criar novas.</p>
        </section>
      )}
    </main>
  );
}

function formatBRL(v?: number) {
  if (typeof v !== "number") return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

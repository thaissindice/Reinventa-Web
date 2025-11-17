// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type JobItem = {
  id: number;
  title: string;
  slug?: string;
  type?: string;
  location?: string;
  salary?: string | number;
  companyName?: string;
  createdAt?: string;
  description?: string;
};

export default function Page() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "loading" | "mentor" | "candidate" | "no-user"
  >("loading");
  const [user, setUser] = useState<any | null>(null);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([]); // simula vagas salvas pelo aprendiz

  // pega user do localStorage e decide view
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        setStatus("no-user");
        router.push("/login");
        return;
      }
      const parsed = JSON.parse(raw);
      setUser(parsed);
      const role = (parsed?.role || "candidate").toString().toLowerCase();
      if (role === "mentor") setStatus("mentor");
      else setStatus("candidate");
    } catch (e) {
      setStatus("no-user");
      router.push("/login");
    }
  }, [router]);

  // busca vagas para ambos (mentor e candidate)
  useEffect(() => {
    if (status === "loading" || status === "no-user") return;

    const abort = new AbortController();
    async function loadJobs() {
      setLoadingJobs(true);
      setError(null);
      try {
        const res = await fetch("/api/jobs?limit=50", { signal: abort.signal });
        if (!res.ok) throw new Error("Falha ao buscar vagas");
        const data = await res.json();
        setJobs(Array.isArray(data?.jobs) ? data.jobs : []);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message || "Erro ao carregar vagas");
      } finally {
        setLoadingJobs(false);
      }
    }

    loadJobs();
    return () => abort.abort();
  }, [status]);

  // estatísticas simples (mentor)
  const stats = useMemo(() => {
    const total = jobs.length;
    const pendentes = jobs.filter((j) =>
      String(j.title || "").toLowerCase().includes("pendente")
    ).length;
    const recent = jobs.filter((j) => {
      if (!j.createdAt) return false;
      return Date.now() - new Date(j.createdAt).getTime() < 1000 * 60 * 60 * 24;
    }).length;
    return { total, pendentes, recent };
  }, [jobs]);

  // ações mentor
  async function handleDelete(id: number) {
    const ok = confirm("Remover essa vaga? Essa ação não pode ser desfeita.");
    if (!ok) return;
    const prev = [...jobs];
    setJobs((s) => s.filter((j) => j.id !== id));
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setJobs(prev);
        alert("Falha ao excluir no servidor (rota pode não existir).");
      }
    } catch {
      setJobs(prev);
      alert("Erro ao excluir (servidor inacessível).");
    }
  }
  function handleEdit(slug?: string, id?: number) {
    if (slug) router.push(`/post-job/${slug}/edit`);
    else if (id) router.push(`/post-job?edit=${id}`);
    else router.push("/post-job");
  }

  // aprendiz: salvar/unsave local (simulado)
  function toggleSave(id: number) {
    setSavedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  // UI states
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-muted-foreground">Carregando dashboard…</p>
      </div>
    );
  }
  if (status === "no-user") return null;

  // === CANDIDATE VIEW (aprendiz) ===
  if (status === "candidate") {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Olá, {user?.name || user?.email?.split?.("@")?.[0] || "aprendiz"} 👋</h1>
            <p className="text-muted-foreground mt-1">Explore vagas, salve oportunidades e se capacite.</p>
          </div>
          <div>
            <button onClick={() => router.push("/courses")} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Ver cursos</button>
          </div>
        </header>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-muted-foreground">Vagas recentes</div>
            <div className="text-2xl font-bold mt-2">{jobs.length}</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-muted-foreground">Vagas salvas</div>
            <div className="text-2xl font-bold mt-2">{savedIds.length}</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-muted-foreground">Cursos recomendados</div>
            <div className="text-2xl font-bold mt-2">3</div>
          </div>
        </div>

        {/* lista de vagas (apenas primeiras 6) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Vagas recentes</h2>
            <a className="text-sm text-muted-foreground underline" href="#vagas" onClick={(e) => { e.preventDefault(); document.getElementById("vagas")?.scrollIntoView({behavior:"smooth"}); }}>Ir para lista</a>
          </div>

          {loadingJobs && <div className="text-muted-foreground">Carregando vagas...</div>}
          {error && <div className="text-red-600">Erro: {error}</div>}

          <div className="grid grid-cols-1 gap-4">
            {jobs.slice(0, 6).map((job) => (
              <article key={job.id} className="bg-card border border-border rounded-2xl p-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.companyName} • {job.location}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{job.description ?? ""}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button onClick={() => router.push(`/jobs/${job.slug ?? job.id}`)} className="text-sm px-3 py-1 bg-muted/40 rounded-md">Ver</button>
                  <button onClick={() => toggleSave(job.id)} className={`text-sm px-3 py-1 rounded-md ${savedIds.includes(job.id) ? "bg-indigo-600 text-white" : "bg-muted/20"}`}>
                    {savedIds.includes(job.id) ? "Salvo" : "Salvar"}
                  </button>
                </div>
              </article>
            ))}
            {jobs.length === 0 && !loadingJobs && <div className="text-muted-foreground">Nenhuma vaga encontrada.</div>}
          </div>
        </section>

        {/* cursos rápidos */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Capacitação recomendada</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/courses#cv" className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold">Como escrever um currículo</h4>
              <p className="text-sm text-muted-foreground mt-2">Dicas práticas para destacar experiência e habilidades.</p>
            </a>
            <a href="/courses#entrevista" className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold">Preparação para entrevistas</h4>
              <p className="text-sm text-muted-foreground mt-2">Perguntas típicas e como respondê-las com confiança.</p>
            </a>
            <a href="/courses#softskills" className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold">Soft skills essenciais</h4>
              <p className="text-sm text-muted-foreground mt-2">Comunicação, organização e trabalho em equipe.</p>
            </a>
          </div>
        </section>

        
      </div>
    );
  }

  // === MENTOR VIEW ===
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* Header / boas-vindas */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Olá, {user?.name || user?.email?.split?.("@")?.[0] || "Mentor"} 👋</h1>
          <p className="text-muted-foreground mt-1">Painel do Mentor — gerencie suas vagas e acompanhe candidaturas.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/post-job")} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition">Postar vaga</button>
          <a href="/courses" className="text-sm text-muted-foreground underline">Capacitação (vídeos)</a>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-muted-foreground">Vagas publicadas</div>
          <div className="text-2xl font-bold mt-2">{stats.total}</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-muted-foreground">Vagas pendentes</div>
          <div className="text-2xl font-bold mt-2">{stats.pendentes}</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-sm text-muted-foreground">Criadas últimas 24h</div>
          <div className="text-2xl font-bold mt-2">{stats.recent}</div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="font-semibold">Dicas rápidas</h3>
            <p className="text-sm text-muted-foreground">
              Use <strong>Postar vaga</strong> para cadastrar novas oportunidades.
            </p>
            <a href="/post-job" className="text-sm text-indigo-600 underline">Criar nova vaga</a>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Suas vagas</h2>
            <div className="text-sm text-muted-foreground">{loadingJobs ? "Carregando..." : `${jobs.length} vagas`}</div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">Erro ao carregar vagas: {error}</div>}

          {!loadingJobs && jobs.length === 0 && <div className="bg-card border border-border rounded-2xl p-6 shadow-sm"><p className="text-muted-foreground">Você não publicou nenhuma vaga ainda. Clique em "Postar vaga" para começar.</p></div>}

          <div className="space-y-4">
            {jobs.map((job) => (
              <article key={job.id} className="bg-white border border-border rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.companyName} • {job.location}</p>
                    <div className="text-sm mt-2 text-muted-foreground line-clamp-2">
                      <span>Tipo: {job.type || "—"} · Salário: {job.salary ?? "—"}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">Criada em: {job.createdAt ? new Date(job.createdAt).toLocaleString() : "—"}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => handleEdit(job.slug, job.id)} className="text-sm bg-muted/40 px-3 py-1 rounded-md hover:bg-muted transition">Editar</button>
                    <button onClick={() => handleDelete(job.id)} className="text-sm text-red-600 border border-red-100 px-3 py-1 rounded-md hover:bg-red-50 transition">Excluir</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

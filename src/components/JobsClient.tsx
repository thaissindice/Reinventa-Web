// src/components/JobsClient.tsx
"use client";
import { useState, useMemo } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  remote: boolean;
  description?: string; // agora opcional — evita erro se faltar
};

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Todos");
  const [location, setLocation] = useState("Todos");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialJobs.filter((job) => {
      const matchesSearch =
        q === "" ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q);

      const matchesType = type === "Todos" || job.type === type;

      const matchesLocation =
        location === "Todos" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesRemote = !remoteOnly || job.remote === true;

      return matchesSearch && matchesType && matchesLocation && matchesRemote;
    });
  }, [initialJobs, search, type, location, remoteOnly]);

  return (
    // grid que alinha filtros + lista
    <div className="grid grid-cols-12 gap-8">
      {/* filtros */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Filtrar vagas</h3>
          <div className="space-y-4">
            <input
              aria-label="Pesquisar vagas"
              placeholder="Título ou empresa"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-input rounded-lg p-2 text-sm bg-background"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-input rounded-lg p-2 text-sm bg-background"
            >
              <option value="Todos">Todos os tipos</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
            </select>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-input rounded-lg p-2 text-sm bg-background"
            >
              <option value="Todos">Todas as localizações</option>
              <option value="Remoto">Remoto</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
              />
              Apenas vagas remotas
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearch("");
                  setType("Todos");
                  setLocation("Todos");
                  setRemoteOnly(false);
                }}
                className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground py-2 rounded-lg font-medium transition"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* lista de vagas */}
      <section className="col-span-12 md:col-span-8 lg:col-span-9">
        <h1 className="text-3xl font-bold mb-2">Todas as vagas</h1>
        <p className="text-muted-foreground mb-6">
          Encontre oportunidades que combinam com seu perfil.
        </p>

        {filteredJobs.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma vaga encontrada.</p>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center text-xl">
                    💼
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{job.location}</p>
                    <p className="text-sm font-medium mt-1">{job.salary}</p>

                    {/* mostra descrição somente se existir */}
                    {job.description ? (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {job.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-muted-foreground border border-border px-2 py-1 rounded-lg">
                      {job.type}
                    </span>
                    <p className="text-xs text-muted-foreground mt-3">há 38 minutos</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

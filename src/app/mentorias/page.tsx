// src/app/mentorias/page.tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentorias — Reinventa+",
  description:
    "Mentorias e guias práticos para quem está recomeçando: vídeos curtos, trilhas e mentores experientes.",
};

type Mentoria = {
  id: number;
  title: string;
  mentor: string;
  duration: string;
  level?: string;
  description: string;
  thumbnail?: string; // caminho em /assets/mentorias/...
  videoUrl?: string; // ou rota interna
};

const mentorias: Mentoria[] = [
  {
    id: 1,
    title: "Como montar um currículo para recolocação",
    mentor: "Joana Silva",
    duration: "18 min",
    level: "Iniciante",
    description:
      "Aprenda a destacar habilidades e experiências aplicáveis, mesmo sem diploma formal.",
    thumbnail: "/assets/mentorias/cv.png",
    videoUrl: "/videos/cv-recolocacao",
  },
  {
    id: 2,
    title: "Transição de carreira prática para técnicos",
    mentor: "Rafael Costa",
    duration: "32 min",
    level: "Intermediário",
    description:
      "Passo a passo para adaptar conhecimentos técnicos para vagas no mercado atual.",
    thumbnail: "/assets/mentorias/transicao-tecnica.png",
    videoUrl: "/videos/transicao-tecnica",
  },
  {
    id: 3,
    title: "Criando conteúdo (vídeos) com smartphone",
    mentor: "Mariana Alves",
    duration: "22 min",
    level: "Iniciante",
    description:
      "Como gravar, editar e publicar vídeos simples que geram engajamento para cursos e consultorias.",
    thumbnail: "/assets/mentorias/video-smartphone.png",
    videoUrl: "/videos/video-smartphone",
  },
];

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Mentorias</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Cursos rápidos e mentorias pensadas para quem está recomeçando.
          Vídeos práticos, passo a passo e material complementar.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentorias.map((m) => (
          <article
            key={m.id}
            className="bg-card border border-border rounded-2xl p-4 flex gap-4 hover:shadow-md transition"
          >
            <div className="w-36 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {m.thumbnail ? (
                <img
                  src={m.thumbnail}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  🎥
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {m.mentor} • {m.duration}
                  </p>
                </div>

                {m.level && (
                  <span className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground">
                    {m.level}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                {m.description}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={m.videoUrl || "#"}
                  className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                >
                  Ver vídeo
                </Link>

                <Link href="#" className="text-sm text-muted-foreground underline">
                  Ver material complementar
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-10 text-sm text-muted-foreground">
        Não encontrou o que precisa?{" "}
        <Link href="/contato" className="underline">
          Fale com a equipe
        </Link>{" "}
        — podemos organizar mentorias ao vivo.
      </footer>
    </main>
  );
}

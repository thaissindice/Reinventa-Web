// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const header = document.querySelector("header");
  const headerHeight = header ? (header as HTMLElement).offsetHeight : 80;
  const targetY = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
  window.scrollTo({ top: targetY, behavior: "smooth" });
  return true;
}

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const goToHomeAndScroll = async (id: string) => {
    // se já estiver na home, só scroll
    if (pathname === "/" || pathname === "") {
      const ok = scrollToId(id);
      if (!ok) {
        // se ainda não montou, tenta com um pequeno delay
        setTimeout(() => scrollToId(id), 120);
      }
      return;
    }

    // se não estiver na home, navega pra / e depois tenta scroll
    // usamos uma pequena espera porque Next não dá callback direto após navegação do app-router
    await router.push(`/?scrollTo=${id}`);
    // espera o próximo tick pra tentar scroll (a página inicial deve montar o id)
    setTimeout(() => scrollToId(id), 200);
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-white/80">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold">Reinventa+</h3>
          <p className="text-sm text-slate-600 max-w-lg">
            Conectando talentos a oportunidades e cursos para o futuro do trabalho.
          </p>
        </div>

        <nav className="flex gap-6">
          <button
            onClick={() => goToHomeAndScroll("hero-title")}
            className="text-sm text-slate-700 hover:text-indigo-600 transition"
          >
            Sobre
          </button>

          <Link href="/mentorias" className="text-sm text-slate-700 hover:text-indigo-600 transition">
            Mentorias
          </Link>

          <button
            onClick={() => goToHomeAndScroll("vagas")}
            className="text-sm text-slate-700 hover:text-indigo-600 transition"
          >
            Vagas
          </button>

          <button
            onClick={() => router.push("/chatbot")}
            className="text-sm text-slate-700 hover:text-indigo-600 transition"
          >
            Contato
          </button>
        </nav>

        <div className="text-xs text-slate-400 mt-4 md:mt-0">
          © {new Date().getFullYear()} Reinventa+. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

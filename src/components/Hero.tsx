// src/components/Hero.tsx
"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";


export default function Hero() {
  return (
    <header
      aria-labelledby="hero-title"
      className="pt-12 md:pt-20 pb-10 bg-gradient-to-b from-indigo-50 via-white to-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-white/80 backdrop-blur-md border border-indigo-100 rounded-3xl p-8 md:p-10 shadow-xl transition">
          {/* Texto */}
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <h1
              id="hero-title"
              className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-800"
            >
              Reinvente o seu caminho{" "}
              <span className="text-indigo-600">profissional</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              O{" "}
              <strong className="text-indigo-700 font-semibold">
                Reinventa+
              </strong>{" "}
              conecta talentos a oportunidades e cursos pensados para o futuro
              do trabalho — mais inclusivo, sustentável e alinhado às
              necessidades reais do mercado.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#vagas"
                aria-label="Ir para a lista de vagas"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 shadow-md transition-all duration-200 text-center"
              >
                🌱 Explorar vagas
              </a>

              
            </div>

            <p className="text-sm text-slate-500 max-w-lg">
              Precisa de ajuda para se candidatar? Veja nossas{" "}
              <a href="/mentorias" className="text-indigo-600 underline">
                mentorias
              </a>{" "}
              e guias passo a passo para quem está recomeçando.
            </p>

            {/* Logos */}
            <div className="pt-6 border-t border-slate-200 mt-8">
              <p className="text-xs text-slate-400 mb-3">
                Parceiros que acreditam em um futuro de trabalho mais humano:
              </p>
              <div className="flex gap-x-6 items-center opacity-80 hover:opacity-100 transition">
                <img src="/assets/logos/alura.png" alt="Alura" className="h-5" />
                <img src="/assets/logos/fiap.png" alt="FIAP" className="h-5" />
                <img src="/assets/logos/ibm.png" alt="IBM" className="h-5" />
              </div>
            </div>
          </div>

          {/* Imagem e halo */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-end">
            <div className="relative w-52 h-52">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(79,70,229,0.2), rgba(16,185,129,0.15) 40%, rgba(167,139,250,0.1) 70%)",
                }}
              />
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-indigo-100 bg-white/60 flex items-center justify-center">
                <Image
                  src="/assets/persona.jpg"
                  alt="Mentor sênior sorrindo, representando experiência e acolhimento"
                  width={520}
                  height={520}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!email) return "Digite seu e-mail.";
    if (!/\S+@\S+\.\S+/.test(email)) return "E-mail inválido.";
    if (!password) return "Digite sua senha.";
    if (password.length < 4) return "Senha muito curta.";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);

      // Simula login bem-sucedido:
      const user = {
        email,
        role: email.includes("mentor") ? "mentor" : "candidate",
      };

      try {
        if (remember) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.setItem("user", JSON.stringify(user)); // ou mudar lógica
      } catch {
        // ignore
      }

      // redireciona para dashboard ou home
      router.push("/dashboard");
    }, 900);
  };

  return (
    <main className="min-h-screen bg-muted/50 flex items-start md:items-center justify-center py-16 md:py-24">
      <div className="max-w-md w-full px-6">
        {/* small brand at top */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logos/novologo.png"
                alt="Logo Reinventa+"
                width={42}
                height={42}
                priority
              />
              <span className="text-slate-700 font-semibold">Reinventa+</span>
            </div>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-labelledby="login-title"
          className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-md"
        >
          <h1 id="login-title" className="text-xl md:text-2xl font-extrabold text-slate-800 text-center">
            Entrar no Reinventa+
          </h1>

          <p className="text-sm text-slate-500 mt-2 text-center">
            Acesse sua conta para gerenciar vagas, candidaturas e mentorias.
          </p>

          {/* error */}
          {error && (
            <div role="alert" className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">E-mail</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-input rounded-lg p-3 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="seu@exemplo.com"
                aria-label="E-mail"
                required
              />
            </label>

            <label className="block relative">
              <span className="text-sm font-medium text-slate-600">Senha</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-2 w-full border border-input rounded-lg p-3 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 pr-12"
                placeholder="••••••••"
                aria-label="Senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-[42px] text-sm text-slate-500"
                aria-pressed={showPassword}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-indigo-600"
                />
                Lembrar-me
              </label>

              <Link href="/forgot" className="text-indigo-600 hover:underline">
                Esqueci a senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 disabled:opacity-60 text-white py-3 rounded-lg font-medium mt-2 hover:bg-indigo-700 transition"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>

            <div className="text-center text-sm text-slate-500 mt-2">
              Não tem conta?{" "}
              <Link href="/signup" className="text-indigo-600 hover:underline">
                Cadastre-se
              </Link>
            </div>
          </div>

          {/* small footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Ao entrar você concorda com os termos de uso do Reinventa+.
          </div>
        </form>
      </div>
    </main>
  );
}

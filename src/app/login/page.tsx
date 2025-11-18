"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) router.replace("/dashboard");
    } catch {}
  }, [router]);

  function validate() {
    if (!email) return "Digite seu e-mail ou usuário.";
    if (!password) return "Digite sua senha.";
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // LOGIN FIXO DE DEMONSTRAÇÃO
      if (email === "mentor" && password === "123456") {
        localStorage.setItem(
          "user",
          JSON.stringify({ email: "mentor", name: "Mentor Demo", role: "mentor" })
        );
        router.push("/dashboard");
        return;
      }

      if (email === "aprendiz" && password === "123456") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "aprendiz",
            name: "Aprendiz Demo",
            role: "candidate",
          })
        );
        router.push("/dashboard");
        return;
      }

      setError("Credenciais inválidas. Use as contas de demonstração.");
      setLoading(false);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-muted/50 flex items-center justify-center py-16">
      <div className="max-w-md w-full px-6">

        {/* Aviso de demonstração */}
        <div className="mb-6 bg-indigo-50 border border-indigo-200 text-indigo-800 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-2">Acesso de demonstração:</p>
          <p><strong>Mentor:</strong> usuário: <code>mentor</code> | senha: <code>123456</code></p>
          <p><strong>Aprendiz:</strong> usuário: <code>aprendiz</code> | senha: <code>123456</code></p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border rounded-2xl p-8 shadow-md"
        >
          <h1 className="text-2xl font-extrabold text-center text-slate-800">
            Entrar no Reinventa+
          </h1>

          <p className="text-sm text-slate-500 mt-2 text-center">
            Acesse sua conta para gerenciar vagas, candidaturas e mentorias.
          </p>

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="E-mail ou usuário"
              className="w-full border rounded-lg p-3 bg-yellow-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="w-full border rounded-lg p-3 bg-yellow-50 pr-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-3 text-sm text-slate-500"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-slate-500">
            Não tem conta?{" "}
            <Link href="/register" className="text-indigo-600 underline">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

// src/components/ApplyModal.tsx
"use client";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId?: string | number;
  jobTitle?: string;
};

export default function ApplyModal({ open, onClose, jobId, jobTitle }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = { jobId, jobTitle, name, email, cvLink, date: new Date().toISOString() };

      // tenta enviar para API; se não existir, grava localmente
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao enviar");

      setSent(true);
      setName("");
      setEmail("");
      setCvLink("");
    } catch (err) {
      // fallback simples: salva localmente
      const existing = JSON.parse(localStorage.getItem("applies") || "[]");
      localStorage.setItem("applies", JSON.stringify([...existing, { jobId, jobTitle, name, email, cvLink, date: new Date().toISOString() }]));
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Candidatar-se</h3>
              <p className="text-sm text-slate-500">{jobTitle ?? "Vaga"}</p>
            </div>
            <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-700">Fechar</button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {sent ? (
              <div className="p-4 bg-green-50 border border-green-100 rounded-md text-green-800">
                Sua candidatura foi recebida. Obrigada! ✨
              </div>
            ) : (
              <>
                <label className="block text-sm text-slate-700">Nome</label>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-md border mt-1 mb-3" />

                <label className="block text-sm text-slate-700">E-mail</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md border mt-1 mb-3" />

                <label className="block text-sm text-slate-700">Link do CV (opcional)</label>
                <input value={cvLink} onChange={(e) => setCvLink(e.target.value)} className="w-full p-3 rounded-md border mt-1 mb-4" />

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancelar</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                    {loading ? "Enviando..." : "Enviar candidatura"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

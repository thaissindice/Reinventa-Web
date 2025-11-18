"use client";
import { useState } from "react";

function makeToken() {
  return Math.random().toString(36).slice(2,10);
}

export default function ForgotPage() {
  const [email,setEmail]=useState("");
  const [link,setLink]=useState<string | null>(null);
  const [msg,setMsg]=useState<string | null>(null);

  const handle = (e:React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("rs:users")||"[]");
    const user = users.find((u:any)=>u.email===email);
    if (!user) {
      setMsg("Se esse e-mail estiver cadastrado, enviaremos instruções. (demo)");
      return;
    }
    const token = makeToken();
    const expires = Date.now() + 1000*60*20; // 20 min
    localStorage.setItem(`rs:pwreset:${email}`, JSON.stringify({ token, expires }));
    // simula envio de email: mostramos link direto
    const resetUrl = `${location.origin}/reset?email=${encodeURIComponent(email)}&token=${token}`;
    setLink(resetUrl);
    setMsg("Link de reset gerado (demo) — copie/abra o link abaixo.");
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Esqueci minha senha</h1>
      {msg && <div className="mb-3 text-sm text-indigo-700">{msg}</div>}
      <form onSubmit={handle} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Seu e-mail" type="email" className="w-full p-2 border rounded" required />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Gerar link de reset (demo)</button>
      </form>
      {link && (
        <div className="mt-4 p-3 bg-slate-50 border rounded">
          <div className="text-xs text-muted-foreground">Link (simulado):</div>
          <a className="text-indigo-600 break-all" href={link}>{link}</a>
        </div>
      )}
    </main>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function getUsers() {
  try { return JSON.parse(localStorage.getItem("rs:users") || "[]"); } catch { return []; }
}
function saveUsers(users: any[]) { localStorage.setItem("rs:users", JSON.stringify(users)); }
function hash(password: string) { return btoa(password); } // demo ONLY
function validEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function RegisterPage() {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState<string | null>(null);
  const [error,setError]=useState<string | null>(null);
  const router = useRouter();

  const handle = (e:React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);

    if (!name.trim()) { setError("Digite seu nome."); return; }
    if (!validEmail(email)) { setError("E-mail inválido. Use formato nome@exemplo.com"); return; }
    if (password.length < 6) { setError("Senha precisa ter pelo menos 6 caracteres."); return; }

    const users = getUsers();
    if (users.find((u:any)=>u.email === email)) {
      setError("Já existe uma conta com esse e-mail.");
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      name,
      passwordHash: hash(password),
      role: email.includes("mentor") ? "mentor" : "candidate", // simples heurística demo
    };

    users.push(newUser);
    saveUsers(users);

    setMsg("Conta criada! Redirecionando para login...");
    setTimeout(()=> router.push("/login"), 800);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Criar conta</h1>

      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      {msg && <div className="mb-3 text-sm text-indigo-700">{msg}</div>}

      <form onSubmit={handle} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome completo" className="w-full p-2 border rounded" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" type="email" className="w-full p-2 border rounded" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha (mín. 6)" type="password" className="w-full p-2 border rounded" required minLength={6} />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Criar conta</button>
      </form>
    </main>
  );
}

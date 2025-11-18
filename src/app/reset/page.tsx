"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function getReset(email:string) {
  try { return JSON.parse(localStorage.getItem(`rs:pwreset:${email}`)||"null"); } catch { return null; }
}
function hash(p:string){ return btoa(p); }
function getUsers(){ return JSON.parse(localStorage.getItem("rs:users")||"[]"); }
function saveUsers(u:any[]){ localStorage.setItem("rs:users", JSON.stringify(u)); }

export default function ResetPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const email = sp.get("email") || "";
  const token = sp.get("token") || "";

  const [ok,setOk] = useState(false);
  const [pw,setPw] = useState("");
  const [msg,setMsg] = useState<string | null>(null);

  useEffect(()=>{
    if(!email || !token) { setMsg("Link inválido."); return; }
    const data = getReset(email);
    if(!data || data.token !== token || Date.now() > data.expires) {
      setMsg("Token inválido ou expirado.");
      return;
    }
    setOk(true);
  },[email,token]);

  const handle = (e:React.FormEvent) => {
    e.preventDefault();
    if(!ok) return;
    const users = getUsers();
    const idx = users.findIndex((u:any)=>u.email===email);
    if(idx === -1) { setMsg("Usuário não encontrado."); return; }
    users[idx].passwordHash = hash(pw);
    saveUsers(users);
    localStorage.removeItem(`rs:pwreset:${email}`);
    setMsg("Senha atualizada! Redirecionando para login...");
    setTimeout(()=> router.push("/login"), 900);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Redefinir senha</h1>
      {msg && <div className="mb-3 text-sm text-indigo-700">{msg}</div>}
      {ok ? (
        <form onSubmit={handle} className="space-y-3">
          <input placeholder="Nova senha" type="password" value={pw} onChange={e=>setPw(e.target.value)} className="w-full p-2 border rounded" required minLength={6} />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Salvar nova senha</button>
        </form>
      ) : (
        <div className="text-sm text-muted-foreground">Aguardando validação do token...</div>
      )}
    </main>
  );
}

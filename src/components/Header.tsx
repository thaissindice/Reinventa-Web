// src/components/Header.tsx
"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string; role?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
      else setUser(null);
    } catch {
      setUser(null);
    }
    // reexecuta quando a rota muda (útil para capturar login/logout)
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center">
            💻
          </div>
          <div className="font-semibold text-lg">Reinventa+</div>
        </Link>

        <div>
          {user ? (
            <>
              {user.role === "mentor" && (
                <Link
                  href="/post-job"
                  className="bg-purple-600 text-white px-4 py-2 rounded mr-2"
                >
                  Postar vaga
                </Link>
              )}
              <Link href="/dashboard" className="mx-2">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-slate-900 text-white px-4 py-2 rounded"
              >
                Sair
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-slate-900 text-white px-4 py-2 rounded">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

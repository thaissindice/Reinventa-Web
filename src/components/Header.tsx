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
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-b from-indigo-50/80 to-white/90 border-b border-indigo-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo (clique volta pra home) */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/assets/logos/novologo.png"
            alt="Logo Reinventa+"
            className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Ações */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Exemplo: checagem robusta para role */}
{(user?.role || "").toString().toLowerCase() === "mentor" && (
  <Link
    href="/post-job"
    className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-all duration-200 mr-3"
  >
    Postar vaga
  </Link>
)}



              <Link
                href="/dashboard"
                className="text-slate-700 font-medium hover:text-indigo-700 transition-colors duration-200"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-slate-900 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-800 transition-all duration-200"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium hover:bg-indigo-700 transition-all duration-200"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

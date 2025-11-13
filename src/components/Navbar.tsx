"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type User = { email: string; role: "mentor" | "aprendiz" | "empresa" };

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 detecta mudanças de rota
  const [user, setUser] = useState<User | null>(null);

  // Recarrega o estado do usuário quando a rota muda
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]); // 👈 agora o useEffect roda toda vez que a URL mudar

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  
}

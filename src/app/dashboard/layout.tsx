// src/app/dashboard/layout.tsx
import React from "react";

export const metadata = {
  title: "Dashboard — Reinventa+",
  description: "Painel personalizado para mentores e aprendizes no Reinventa+",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

// src/app/layout.tsx
import "./globals.css";
import Header from "../components/Header";
import FloatingButton from "@/components/FloatingButton";

export const metadata = {
  title: "Reinventa+",
  description: "Conectando talentos ao futuro do trabalho.",
  icons: {
  icon: "/favicon.ico",
},

};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header />
        {children}
        <FloatingButton />
      </body>
    </html>
  );
}

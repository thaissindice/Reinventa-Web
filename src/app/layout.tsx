// src/app/layout.tsx
import "./globals.css";
import Header from "../components/Header";
import FloatingButton from "@/components/FloatingButton";
export const metadata = {
  title: "Reinventa+",
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

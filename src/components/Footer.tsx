import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Reinventa+</h3>
            <p className="text-sm text-muted-foreground">
              Conectando taletos com oportunidades
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              Sobre nós
            </Link>
            <Link href="/contact" className="hover:underline">
              Contato
            </Link>
            <Link href="/terms" className="hover:underline">
              Termos
            </Link>
            <Link href="/privacy" className="hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Reinventa+, Inc. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

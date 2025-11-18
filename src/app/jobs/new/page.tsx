import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import NewJobForm from "./NewJobForm";
import ClientNewJobPage from "./ClientNewJobPage";



export const metadata: Metadata = {
  title: "Post a new job",
};

export default function Page() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está logado
    const raw = localStorage.getItem("user");

    if (!raw) {
      // Se não estiver logado, manda pro login
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    // Enquanto verifica o login, mostra mensagem rápida
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Redirecionando para login...
      </div>
    );
  }

  // Se logado, mostra o formulário normalmente
  return <NewJobForm />;
}

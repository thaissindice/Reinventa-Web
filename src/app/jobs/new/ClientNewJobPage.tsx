"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewJobForm from "./NewJobForm";

export default function ClientNewJobPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) router.push("/login");
    else setReady(true);
  }, [router]);

  if (!ready) return <div className="p-6">Redirecionando…</div>;
  return <NewJobForm />;
}

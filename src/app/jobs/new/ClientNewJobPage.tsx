"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewJobForm from "./NewJobForm";

export default function ClientNewJobPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (!raw) {
      router.push("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Redirecionando para login...
      </div>
    );
  }

  return <NewJobForm />;
}

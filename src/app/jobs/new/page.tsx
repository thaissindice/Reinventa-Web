// src/app/jobs/new/page.tsx
import { Metadata } from "next";
import ClientNewJobPage from "./ClientNewJobPage";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function Page() {
  return (
    <main>
      <ClientNewJobPage />
    </main>
  );
}

import ClientNewJobPage from "./ClientNewJobPage";
import { Metadata } from "next";

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

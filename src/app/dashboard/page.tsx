import { Metadata } from "next";
import ClientDashboard from "./ClientDashboard";


export const metadata: Metadata = {
  title: "Dashboard — Reinventa+",
};

export default function Page() {
  return <ClientDashboard />;
}


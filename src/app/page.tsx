// src/app/page.tsx  (server component — sem "use client")
import JobsClient from "../components/JobsClient";

export const metadata = {
  title: "Reinventa+ — Vagas",
};

const jobsData = [
  {
    id: 1,
    title: "Instrutor de Robótica para Iniciantes",
    company: "Tech Recomeço",
    location: "Híbrido — São Paulo",
    salary: "R$4.500,00",
    type: "CLT",
    remote: false,
    description:
      "Ideal para ex-mecânicos e técnicos com experiência em sistemas. Ensine fundamentos de robótica e automação para jovens aprendizes.",
  },
  {
    id: 2,
    title: "Mentor de Construção Sustentável",
    company: "VerdeVivo Engenharia",
    location: "Remoto — Brasil",
    salary: "R$3.800,00",
    type: "PJ",
    remote: true,
    description:
      "Transforme sua experiência na construção civil em aulas e mentorias sobre técnicas ecológicas e acessíveis para novos profissionais.",
  },
  {
    id: 3,
    title: "Consultor de Energia Solar Residencial",
    company: "SolAgora",
    location: "Presencial — Rio de Janeiro",
    salary: "R$5.000,00",
    type: "CLT",
    remote: false,
    description:
      "Ex-eletricistas e técnicos em manutenção são bem-vindos! Ajude famílias a adotar soluções sustentáveis e reduzir custos com energia limpa.",
  },
  {
    id: 4,
    title: "Instrutor de Jardinagem Urbana",
    company: "Florescer Cidades",
    location: "Remoto — Brasil",
    salary: "R$2.800,00",
    type: "PJ",
    remote: true,
    description:
      "Para quem vem da agricultura ou jardinagem tradicional e quer compartilhar saberes sobre cultivo urbano e hortas comunitárias.",
  },
  {
    id: 5,
    title: "Criador de Conteúdo Culinário",
    company: "Sabores da Vida",
    location: "Remoto — Brasil",
    salary: "R$3.500,00",
    type: "PJ",
    remote: true,
    description:
      "Aposentados e profissionais de cozinha podem transformar seu talento em vídeos, cursos ou consultorias sobre alimentação acessível.",
  },
  {
    id: 6,
    title: "Instrutor de Manutenção de Drones",
    company: "SkyWorks Academy",
    location: "Híbrido — Curitiba",
    salary: "R$4.200,00",
    type: "CLT",
    remote: false,
    description:
      "Ex-mecânicos e técnicos: ensine manutenção de drones e dispositivos autônomos. Treinamento completo incluso!",
  },
  {
    id: 7,
    title: "Consultor de Moda Sustentável",
    company: "ReCostura",
    location: "Remoto — Brasil",
    salary: "R$3.000,00",
    type: "PJ",
    remote: true,
    description:
      "Para costureiras e modelistas com experiência: ajude novas marcas a criarem peças com reaproveitamento e responsabilidade ambiental.",
  },
  {
    id: 8,
    title: "Mentor de Segurança no Trabalho",
    company: "Proteger+",
    location: "Presencial — Belo Horizonte",
    salary: "R$4.000,00",
    type: "CLT",
    remote: false,
    description:
      "Se você já atuou em obras, oficinas ou fábricas, use sua vivência para treinar equipes em boas práticas de segurança e prevenção.",
  },
];


export default function Page() {
  return (
    <main className="min-h-screen bg-muted/20 text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <JobsClient initialJobs={jobsData} />
      </div>
    </main>
  );
}

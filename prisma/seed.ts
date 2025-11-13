import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inserindo vagas de teste...");

  await Promise.all([
  prisma.job.create({
    data: {
      slug: "designer-grafico-remoto",
      title: "Designer Gráfico",
      type: "PJ",
      locationType: "Remoto",
      location: "São Paulo",
      description: "Criação de peças digitais para redes sociais e identidade visual.",
      salary: 4000,
      companyName: "Criativa Studio",
      approved: true,
    },
  }),
  prisma.job.create({
    data: {
      slug: "dev-frontend-react",
      title: "Desenvolvedor Front-end React",
      type: "CLT",
      locationType: "Híbrido",
      location: "Rio de Janeiro",
      description: "Desenvolvimento de interfaces web modernas com React e Tailwind.",
      salary: 7500,
      companyName: "Tech Vision",
      approved: true,
    },
  }),
  prisma.job.create({
    data: {
      slug: "analista-marketing-digital",
      title: "Analista de Marketing Digital",
      type: "PJ",
      locationType: "Remoto",
      description: "Planejamento e execução de campanhas em mídias digitais.",
      salary: 5000,
      companyName: "MarketPro",
      approved: true,
    },
  }),
  prisma.job.create({
    data: {
      slug: "assistente-administrativo-presencial",
      title: "Assistente Administrativo",
      type: "CLT",
      locationType: "Presencial",
      location: "Curitiba",
      description: "Auxílio nas rotinas administrativas e controle de planilhas.",
      salary: 3000,
      companyName: "Grupo Alfa",
      approved: true,
    },
  }),
  prisma.job.create({
    data: {
      slug: "ux-designer-junior",
      title: "UX Designer Júnior",
      type: "Estágio",
      locationType: "Remoto",
      description: "Pesquisa de usabilidade e prototipagem de telas.",
      salary: 2000,
      companyName: "DesignUp",
      approved: true,
    },
  }),
]);


  console.log("✅ Vagas de exemplo inseridas!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

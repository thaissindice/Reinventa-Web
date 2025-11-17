// scripts/seed-user.js
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const password = "senha123";
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: "aprendiz@reinventa.com" },
    update: { passwordHash: hash, role: "candidate" },
    create: { email: "aprendiz@reinventa.com", passwordHash: hash, role: "candidate" },
  });

  console.log("Seeded user:", user.email);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});

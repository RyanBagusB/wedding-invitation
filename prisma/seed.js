const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

function generateBarcode(prefix = "GUEST") {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

async function main() {
  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash("12345678", saltRounds);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: defaultPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { username: "scanner" },
    update: {},
    create: {
      username: "scanner",
      password: defaultPassword,
      role: "SCANNER",
    },
  });

  const guestNames = ["Eisen", "Stark", "Fern", "Flamme", "Grundel"];

  for (const name of guestNames) {
    const barcode = generateBarcode(name);
    await prisma.invitation.upsert({
      where: { barcode },
      update: {},
      create: {
        guestName: name,
        inviterId: admin.id,
        barcode,
      },
    });
    console.log(`Tamu ${name} dengan barcode ${barcode} berhasil dibuat`);
  }

  console.log("Seeder selesai: admin, scanner, dan tamu telah dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

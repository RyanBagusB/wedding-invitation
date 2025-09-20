const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10

  const defaultPassword = await bcrypt.hash("12345678", saltRounds)

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: defaultPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { username: "scanner" },
    update: {},
    create: {
      username: "scanner",
      password: defaultPassword,
      role: "SCANNER",
    },
  })

  console.log("Default admin and scanner seeded with password: 12345678")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

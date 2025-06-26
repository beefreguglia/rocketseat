import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function seed() {
  const passwordHash = await hash('123456',6)

  await prisma.user.createMany({
    data: [
      { 
        name: "Mayk Brito", 
        email: "mayk@email.com",
        passwordHash,
      },
      { 
        name: "Diego Fernandes", 
        email: "diego@email.com",
        passwordHash,
      }
    ]
  })
}

seed().then(() => {
  prisma.$disconnect()
})
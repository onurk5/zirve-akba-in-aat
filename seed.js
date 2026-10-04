const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findFirst();
  if (existingUser) {
    console.log("Admin exists.");
    return;
  }
  const hashedPassword = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: {
      email: "admin@yapimodern.com.tr",
      name: "Sistem Yöneticisi",
      password: hashedPassword,
    },
  });
  console.log("Admin created: admin@yapimodern.com.tr / 123456");
}

main().catch(console.error).finally(() => prisma.$disconnect());

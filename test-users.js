const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users in DB:", users.map(u => ({ id: u.id, name: u.name, email: u.email })));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
main();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const buckets = await prisma.$queryRawUnsafe(`SELECT * FROM storage.buckets;`);
    console.log("Buckets:", buckets);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Creating Supabase Storage INSERT policy...");
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Enable insert for anonymous users"
      ON storage.objects FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'images');
    `);
    console.log("Policy created successfully!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

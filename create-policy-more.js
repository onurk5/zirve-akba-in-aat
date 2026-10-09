const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Creating Supabase Storage UPDATE and DELETE policies...");
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Enable update for anonymous users"
      ON storage.objects FOR UPDATE
      TO public
      USING (bucket_id = 'images')
      WITH CHECK (bucket_id = 'images');
    `);
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "Enable delete for anonymous users"
      ON storage.objects FOR DELETE
      TO public
      USING (bucket_id = 'images');
    `);
    console.log("Policies created successfully!");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

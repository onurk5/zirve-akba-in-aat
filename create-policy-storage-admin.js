const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Setting up RLS policies (without ALTER TABLE)...");
    
    // Create policy for Select
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Public Access'
        ) THEN
            CREATE POLICY "Public Access"
            ON storage.objects FOR SELECT
            TO public
            USING ( bucket_id = 'images' );
        END IF;
      END
      $$;
    `);

    // Create policy for Insert
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anon Insert'
        ) THEN
            CREATE POLICY "Anon Insert"
            ON storage.objects FOR INSERT
            TO public
            WITH CHECK ( bucket_id = 'images' );
        END IF;
      END
      $$;
    `);

    // Create policy for Update
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anon Update'
        ) THEN
            CREATE POLICY "Anon Update"
            ON storage.objects FOR UPDATE
            TO public
            USING ( bucket_id = 'images' );
        END IF;
      END
      $$;
    `);

    // Create policy for Delete
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Anon Delete'
        ) THEN
            CREATE POLICY "Anon Delete"
            ON storage.objects FOR DELETE
            TO public
            USING ( bucket_id = 'images' );
        END IF;
      END
      $$;
    `);
    
    console.log("RLS policies configured successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Creating 'images' bucket via SQL...");
    
    // Create the bucket if it doesn't exist
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('images', 'images', true)
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
    console.log("Bucket 'images' created or verified successfully.");

    console.log("Setting up RLS policies to allow anonymous uploads and reads...");
    
    // Enable RLS on objects
    await prisma.$executeRawUnsafe(`
      ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
    `);

    // Create a policy to allow public reads
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
    
    // Create a policy to allow anonymous inserts
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

    // Create a policy to allow anonymous updates
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
    
    // Create a policy to allow anonymous deletes
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

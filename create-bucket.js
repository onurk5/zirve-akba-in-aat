const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  console.log("Checking buckets...");
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error("Error listing buckets:", listError);
    return;
  }
  
  const imagesBucket = buckets.find(b => b.name === 'images');
  
  if (imagesBucket) {
    console.log("Bucket 'images' already exists!");
    
    // Ensure it's public
    if (!imagesBucket.public) {
      console.log("Updating bucket to be public...");
      await supabase.storage.updateBucket('images', { public: true });
    }
  } else {
    console.log("Creating 'images' bucket...");
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
      fileSizeLimit: 10485760 // 10MB
    });
    
    if (error) {
      console.error("Failed to create bucket:", error);
    } else {
      console.log("Bucket created successfully:", data);
    }
  }
  
  console.log("Done.");
}

main();

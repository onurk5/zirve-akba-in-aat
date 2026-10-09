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
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  try {
    console.log("Testing upload to 'images' bucket...");
    const { data, error } = await supabase.storage.from('images').upload('test.txt', 'Hello, world!', {
      contentType: 'text/plain',
      upsert: true
    });
    
    if (error) {
      console.error("Upload failed:", error);
    } else {
      console.log("Upload successful!", data);
    }
  } catch (err) {
    console.error("Exception:", err);
  }
}

main();

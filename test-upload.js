const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key && val) acc[key.trim()] = val.trim();
  return acc;
}, {});
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
  console.log("Testing upload to 'images' bucket...");
  const dummyFile = Buffer.from("Hello World!");
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload('test-file.txt', dummyFile, {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error("Upload failed!", error.message);
  } else {
    console.log("Upload successful!", data);
  }
}

testUpload();

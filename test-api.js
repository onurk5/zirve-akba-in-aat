const fs = require('fs');

async function test() {
  const res = await fetch('https://turkiyeapi.dev/api/v1/provinces');
  const data = await res.json();
  
  const mapped = data.data.map(p => ({
    name: p.name,
    districts: p.districts.map(d => d.name)
  }));
  
  // Sort alphabetically
  mapped.sort((a, b) => a.name.localeCompare(b.name, 'tr-TR'));
  
  fs.writeFileSync('src/lib/cities.json', JSON.stringify(mapped));
  console.log("Saved cities.json");
}
test();

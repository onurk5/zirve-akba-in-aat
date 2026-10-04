const { PrismaClient: SQLiteClient } = require('./prisma-sqlite');
const { PrismaClient: PGClient } = require('@prisma/client');

const sqlite = new SQLiteClient();
const pg = new PGClient();

async function main() {
  console.log('Fetching old projects from local SQLite...');
  const projects = await sqlite.project.findMany();
  
  if (projects.length === 0) {
    console.log('No old projects found.');
  } else {
    console.log(`Found ${projects.length} projects. Migrating to Supabase PostgreSQL...`);
    for (const p of projects) {
      await pg.project.upsert({
        where: { slug: p.slug }, // Slug is unique
        update: {},
        create: p,
      });
      console.log(`- Migrated project: ${p.title}`);
    }
  }

  console.log('Fetching old services from local SQLite...');
  const services = await sqlite.service.findMany();
  for (const s of services) {
    await pg.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    console.log(`- Migrated service: ${s.title}`);
  }

  console.log('Fetching old posts from local SQLite...');
  const posts = await sqlite.post.findMany();
  for (const p of posts) {
    await pg.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    console.log(`- Migrated post: ${p.title}`);
  }

  console.log('Data migration completed successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await sqlite.$disconnect();
    await pg.$disconnect();
  });

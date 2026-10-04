import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  
  for (const project of projects) {
    if (!project.beforeImage) {
      await prisma.project.update({
        where: { id: project.id },
        data: {
          beforeImage: '/feature-2.jpg', // Using an existing image as placeholder for "before"
        },
      });
      console.log(`Updated project ${project.title} with beforeImage.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

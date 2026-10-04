import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = "hakan";
  const password = "hakan05";
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.upsert({
    where: { email: username },
    update: { password: hashedPassword },
    create: {
      email: username,
      name: "Hakan (Admin)",
      password: hashedPassword
    }
  });

  console.log("Admin user 'hakan' created/updated successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import seedAssets from './seed.assets';
import seedUsers from './seed.users';

const prisma = new PrismaClient();

async function main() {
  await seedAssets();
  await seedUsers();
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

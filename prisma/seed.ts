import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.userAsset.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.asset.deleteMany({});

  await prisma.user.create({ data: {
    firstName: 'Juliano',
    lastName: 'Silva',
    email: 'julianosilva@hey.com',
    password: await bcrypt.hash('12345678', 5),
    assets: {
      create: [
        {
          quantity: 200,
          asset: {
            create: {
              ticker: 'PRIO3',
              name: 'Petrorio',
            },
          },
        },
        {
          quantity: 100,
          asset: {
            create: {
              ticker: 'AMBP3',
              name: 'Ambipar',
            },
          },
        },
      ],
    },
  } });

  await prisma.user.create({
    data: {
      firstName: 'Maria',
      lastName: 'Souza',
      email: 'mariasouza@hey.com',
      password: await bcrypt.hash('12345678', 5),
      assets: {
        create: [
          {
            quantity: 100,
            asset: {
              create: {
                ticker: 'RENT3',
                name: 'Localiza',
              },
            },
          },
          {
            quantity: 300,
            asset: {
              create: {
                ticker: 'CASH3',
                name: 'Méliuz',
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

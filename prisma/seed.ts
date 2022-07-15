import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.asset.deleteMany({});

  await prisma.user.create({ data: {
    firstName: 'Juliano',
    lastName: 'Silva',
    email: 'julianosilva@hey.com',
    password: '12345678',
    assets: {
      create: [
        {
          asset: {
            create: {
              ticker: 'PRIO3',
              name: 'Petrorio',
            },
          },
        },
        {
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
      password: '12345678',
      assets: {
        create: [
          {
            asset: {
              create: {
                ticker: 'RENT3',
                name: 'Localiza',
              },
            },
          },
          {
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

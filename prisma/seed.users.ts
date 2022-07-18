import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.create({ data: {
    firstName: 'Felipe',
    lastName: 'Silva',
    email: 'felipe.silva@email.com',
    password: await bcrypt.hash('12345678', 5),
    assets: {
      create: [
        {
          quantity: 200,
          asset: {
            connect: {
              ticker: 'PRIO3',
            },
          },
        },
        {
          quantity: 100,
          asset: {
            connect: {
              ticker: 'AMBP3',
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
      email: 'maria.souza@email.com',
      password: await bcrypt.hash('12345678', 5),
      assets: {
        create: [
          {
            quantity: 100,
            asset: {
              connect: {
                ticker: 'RENT3',
              },
            },
          },
          {
            quantity: 300,
            asset: {
              connect: {
                ticker: 'CASH3',
              },
            },
          },
        ],
      },
    },
  });
}

export default seedUsers;

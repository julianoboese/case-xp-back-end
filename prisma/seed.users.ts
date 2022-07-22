import bcrypt from 'bcrypt';
import { PrismaClient, Type } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.create({ data: {
    firstName: 'Fulano',
    lastName: 'Silva',
    email: 'fulano.silva@email.com',
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
    operations: {
      create: [
        {
          type: Type.BUY,
          quantity: 200,
          amount: -4000,
          asset: {
            connect: {
              ticker: 'PRIO3',
            },
          },
        },
        {
          type: Type.BUY,
          quantity: 100,
          amount: -2300,
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
      firstName: 'Ciclano',
      lastName: 'Souza',
      email: 'ciclano.souza@email.com',
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
      operations: {
        create: [
          {
            type: Type.BUY,
            quantity: 100,
            amount: -5000,
            asset: {
              connect: {
                ticker: 'RENT3',
              },
            },
          },
          {
            type: Type.BUY,
            quantity: 300,
            amount: -600,
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

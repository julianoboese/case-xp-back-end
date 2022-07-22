import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The POST /order/buy route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).post('/order/buy').send({
      assetId: 328,
      quantity: 100,
      price: 23.52,
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', 'q1w2e3r4t5')
      .send({
        assetId: 328,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(401);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('validates that "assetId" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" is required');
  });

  it('validates that "assetId" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 'trezentos e vinte e oito',
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a number');
  });

  it('validates that "assetId" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328.5,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be an integer');
  });

  it('validates that "assetId" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: -328,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a positive number');
  });

  it('validates that "quantity" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" is required');
  });

  it('validates that "quantity" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 'cem',
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be a number');
  });

  it('validates that "quantity" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100.5,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be an integer');
  });

  it('validates that "quantity" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: -100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be a positive number');
  });

  it('validates that "price" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" is required');
  });

  it('validates that "price" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: 'vinte e três e cinquenta e dois',
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a number');
  });

  it('validates that "price" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: -23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a positive number');
  });

  it('returns an error if asset is unavailable at the broker', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 1000,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(404);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Ativo indisponível na corretora.');
  });

  it('returns an error if quantity is higher than available at the broker', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 10000000000,
        price: 23.52,
      });

    expect(result.statusCode).toBe(422);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Quantidade indisponível na corretora.');
  });

  it('returns an error if user doesn\'t have enough funds', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100000,
        price: 23.52,
      });

    expect(result.statusCode).toBe(422);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Saldo insuficiente.');
  });

  it('returns the user new position and changes balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const previousBalance = await request(server)
      .post('/account/deposit')
      .set('Authorization', loginResult.body.token)
      .send({ amount: 5000 });

    const previousPosition = await request(server)
      .get('/assets/328')
      .set('Authorization', loginResult.body.token);

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: 23.52,
      });

    const balanceResult = await request(server)
      .get('/account')
      .set('Authorization', loginResult.body.token);

    const newPosition = previousPosition.body.quantity + 100;
    const newBalance = previousBalance.body.balance - 100 * 23.52;

    expect(result.statusCode).toBe(200);
    expect(result.body.quantity).toBeDefined();
    expect(result.body.quantity).toBe(newPosition);
    expect(balanceResult.body.balance).toBe(newBalance);
  });
});

describe('The POST /order/sell route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).post('/order/sell').send({
      assetId: 328,
      quantity: 100,
      price: 23.52,
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', 'q1w2e3r4t5')
      .send({
        assetId: 328,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(401);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('validates that "assetId" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" is required');
  });

  it('validates that "assetId" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 'trezentos e vinte e oito',
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a number');
  });

  it('validates that "assetId" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328.5,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be an integer');
  });

  it('validates that "assetId" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: -328,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a positive number');
  });

  it('validates that "quantity" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" is required');
  });

  it('validates that "quantity" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 'cem',
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be a number');
  });

  it('validates that "quantity" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100.5,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be an integer');
  });

  it('validates that "quantity" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: -100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"quantity" must be a positive number');
  });

  it('validates that "price" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" is required');
  });

  it('validates that "price" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: 'vinte e três e cinquenta e dois',
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a number');
  });

  it('validates that "price" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: -23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a positive number');
  });

  it('returns an error if user doesn\'t have the asset', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 1,
        quantity: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(404);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Ativo não consta na carteira.');
  });

  it('returns an error if amount is higher than user has', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 1000,
        price: 23.52,
      });

    expect(result.statusCode).toBe(422);
    expect(result.body.quantity).toBeUndefined();
    expect(result.body.message).toBe('Quantidade insuficiente na carteira.');
  });

  it('returns the user new position and changes balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'ciclano.souza@email.com',
      password: '12345678',
    });

    const previousBalance = await request(server)
      .get('/account')
      .set('Authorization', loginResult.body.token);

    const previousPosition = await request(server)
      .get('/assets/328')
      .set('Authorization', loginResult.body.token);

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        quantity: 100,
        price: 23.52,
      });

    const balanceResult = await request(server)
      .get('/account')
      .set('Authorization', loginResult.body.token);

    const newPosition = previousPosition.body.quantity - 100;
    const newBalance = previousBalance.body.balance + 100 * 23.52;

    expect(result.statusCode).toBe(200);
    expect(result.body.quantity).toBeDefined();
    expect(result.body.quantity).toBe(newPosition);
    expect(balanceResult.body.balance).toBe(newBalance);
  });
});

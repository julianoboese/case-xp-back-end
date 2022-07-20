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
      amount: 100,
      price: 23.52,
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', 'q1w2e3r4t5')
      .send({
        assetId: 328,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('validates that "assetId" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" is required');
  });

  it('validates that "assetId" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 'trezentos e vinte e oito',
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a number');
  });

  it('validates that "assetId" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328.5,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be an integer');
  });

  it('validates that "assetId" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: -328,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a positive number');
  });

  it('validates that "amount" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
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
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" is required');
  });

  it('validates that "amount" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 'cem',
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a number');
  });

  it('validates that "amount" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100.5,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be an integer');
  });

  it('validates that "amount" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: -100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a positive number');
  });

  it('validates that "price" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" is required');
  });

  it('validates that "price" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
        price: 'vinte e três e cinquenta e dois',
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a number');
  });

  it('validates that "price" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/buy')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
        price: -23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a positive number');
  });

  it('returns the user new position and changes balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
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
        amount: 100,
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
      amount: 100,
      price: 23.52,
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', 'q1w2e3r4t5')
      .send({
        assetId: 328,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('validates that "assetId" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" is required');
  });

  it('validates that "assetId" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 'trezentos e vinte e oito',
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a number');
  });

  it('validates that "assetId" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328.5,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be an integer');
  });

  it('validates that "assetId" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: -328,
        amount: 100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"assetId" must be a positive number');
  });

  it('validates that "amount" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
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
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" is required');
  });

  it('validates that "amount" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 'cem',
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a number');
  });

  it('validates that "amount" must be an integer', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100.5,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be an integer');
  });

  it('validates that "amount" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: -100,
        price: 23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a positive number');
  });

  it('validates that "price" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" is required');
  });

  it('validates that "price" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
        price: 'vinte e três e cinquenta e dois',
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a number');
  });

  it('validates that "price" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .post('/order/sell')
      .set('Authorization', loginResult.body.token)
      .send({
        assetId: 328,
        amount: 100,
        price: -23.52,
      });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"price" must be a positive number');
  });

  it('returns the user new position and changes balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'maria.souza@email.com',
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
        amount: 100,
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

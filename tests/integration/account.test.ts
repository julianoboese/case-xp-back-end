import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The GET /account route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).get('/account')

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('checks if the token is valid', async () => {
    const result = await request(server).get('/account')
      .set('Authorization', 'q1w2e3r4t5');

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('returns the user balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const result = await request(server).get('/account')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body.balance).toBeDefined();
  });
});

describe('The POST /account/deposit route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).post('/account/deposit')
      .send({amount: 1000});

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('checks if the token is valid', async () => {
    const result = await request(server).post('/account/deposit')
      .set('Authorization', 'q1w2e3r4t5')
      .send({amount: 1000});

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('validates that "amount" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });
    
    const result = await request(server).post('/account/deposit')
      .set('Authorization', loginResult.body.token)
      .send({});
  
    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" is required')
  })
  
  it('validates that "amount" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });
    
    const result = await request(server).post('/account/deposit')
      .set('Authorization', loginResult.body.token)
      .send({ amount: 'mil' });
  
  
    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a number')
  })
  
  it('validates that "amount" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const result = await request(server).post('/account/deposit')
      .set('Authorization', loginResult.body.token)
      .send({ amount: -1000 });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a positive number')
  });

  it('returns the user new balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const previousBalance = await request(server).get('/account')
      .set('Authorization', loginResult.body.token);

    const result = await request(server).post('/account/deposit')
      .set('Authorization', loginResult.body.token)
      .send({amount: 1000});

    const newBalance = previousBalance.body.balance + 1000;

    expect(result.statusCode).toBe(200);
    expect(result.body.balance).toBeDefined();
    expect(result.body.balance).toBe(newBalance);
  });
});

describe('The POST /account/withdraw route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).post('/account/withdraw')
      .send({amount: 100})

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('checks if the token is valid', async () => {
    const result = await request(server).post('/account/withdraw')
      .set('Authorization', 'q1w2e3r4t5')
      .send({amount: 100});

    expect(result.statusCode).toBe(401);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  })

  it('validates that "amount" is required', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });
    
    const result = await request(server).post('/account/withdraw')
      .set('Authorization', loginResult.body.token)
      .send({});
  
    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" is required')
  })
  
  it('validates that "amount" must be a number', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });
    
    const result = await request(server).post('/account/withdraw')
      .set('Authorization', loginResult.body.token)
      .send({ amount: 'cem' });
  
  
    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a number')
  })
  
  it('validates that "amount" must be positive', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const result = await request(server).post('/account/withdraw')
      .set('Authorization', loginResult.body.token)
      .send({ amount: -100 });

    expect(result.statusCode).toBe(400);
    expect(result.body.balance).toBeUndefined();
    expect(result.body.message).toBe('"amount" must be a positive number')
  });

  it('returns the user new balance if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const previousBalance = await request(server).get('/account')
      .set('Authorization', loginResult.body.token);

    const result = await request(server).post('/account/withdraw')
      .set('Authorization', loginResult.body.token)
      .send({amount: 100});

    const newBalance = previousBalance.body.balance - 100;

    expect(result.statusCode).toBe(200);
    expect(result.body.balance).toBeDefined();
    expect(result.body.balance).toBe(newBalance);
  });
});

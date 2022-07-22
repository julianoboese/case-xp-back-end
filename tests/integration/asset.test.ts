import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The GET /assets/all route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).get('/assets/all');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .get('/assets/all')
      .set('Authorization', 'q1w2e3r4t5');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('returns all assets if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/assets/all')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ticker: 'CASH3',
          name: 'Meliuz',
        }),
      ]),
    );
  });
});

describe('The GET /assets route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).get('/assets');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .get('/assets')
      .set('Authorization', 'q1w2e3r4t5');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('returns all user assets if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/assets')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ticker: 'CASH3',
        }),
      ]),
    );
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ticker: 'PRIO3',
          price: expect.any(Number),
          change: expect.any(Number),
        }),
      ]),
    );
  });
});

describe('The GET /assets/{assetId} route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).get('/assets/407');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .get('/assets/407')
      .set('Authorization', 'q1w2e3r4t5');

    expect(result.statusCode).toBe(401);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('returns a specific asset if the user has it', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/assets/407')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        ticker: 'PRIO3',
        price: expect.any(Number),
        change: expect.any(Number),
      }),
    );
  });

  it('returns an error if the asset is unavailable at the broker', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/assets/1000')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(404);
    expect(result.body.ticker).toBeUndefined();
    expect(result.body.message).toBe('Ativo indisponível na corretora.');
  });

  it("returns a specific asset from the broker if the user doesn't have it", async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/assets/348')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        ticker: 'CASH3',
        quantity: 0,
        price: expect.any(Number),
        change: expect.any(Number),
      }),
    );
  });
});

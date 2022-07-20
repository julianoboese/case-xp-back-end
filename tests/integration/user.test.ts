import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The GET /user route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('requires authentication', async () => {
    const result = await request(server).get('/user');

    expect(result.statusCode).toBe(401);
    expect(result.body.firstName).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('checks if the token is valid', async () => {
    const result = await request(server)
      .get('/user')
      .set('Authorization', 'q1w2e3r4t5');

    expect(result.statusCode).toBe(401);
    expect(result.body.firstName).toBeUndefined();
    expect(result.body.message).toBe('Acesso não autorizado.');
  });

  it('returns the user data if the request is successful', async () => {
    const loginResult = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    const result = await request(server)
      .get('/user')
      .set('Authorization', loginResult.body.token);

    expect(result.statusCode).toBe(200);
    expect(result.body.firstName).toBeDefined();
    expect(result.body.lastName).toBe('Silva');
  });
});

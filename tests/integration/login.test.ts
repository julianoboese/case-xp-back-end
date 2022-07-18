import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The POST /login route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('validates that "email" is required', async () => {
    const result = await request(server).post('/login').send({
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" is required')
  })

  it('validates that "email" must be valid', async () => {
    const result = await request(server).post('/login').send({
      email: 'jon.doe@com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" must be a valid email')
  })

  it('validates that "password" is required', async () => {
    const result = await request(server).post('/login').send({
      email: 'jon.doe@hey.com',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" is required')
  })

  it('validates that "password" must be a string', async () => {
    const result = await request(server).post('/login').send({
      email: 'jon.doe@hey.com',
      password: 12345678,
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" must be a string')
  })

  it('validates that "password" must have at least 8 characters', async () => {
    const result = await request(server).post('/login').send({
      email: 'jon.doe@hey.com',
      password: '1234567',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" length must be at least 8 characters long')
  })

  it('returns a token if user data is correct', async () => {
    const result = await request(server).post('/login').send({
      email: 'felipe.silva@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(200);
    expect(result.body.token).toBeDefined();
  });
});

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
    expect(result.body.message).toBe('"email" is required');
  });

  it('validates that "email" must be a string', async () => {
    const result = await request(server).post('/login').send({
      email: 123456,
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" must be a string');
  });

  it('validates that "email" must be valid', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" must be a valid email');
  });

  it('validates that "password" is required', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@hey.com',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" is required');
  });

  it('validates that "password" must be a string', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@hey.com',
      password: 12345678,
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" must be a string');
  });

  it('validates that "password" must have at least 8 characters', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@hey.com',
      password: '1234567',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe(
      '"password" length must be at least 8 characters long',
    );
  });

  it('returns an error if user is not registered', async () => {
    const result = await request(server).post('/login').send({
      email: 'felipe.souza@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(404);
    expect(result.body.token).not.toBeDefined();
    expect(result.body.message).toBe('Usuário não cadastrado.');
  });

  it('returns an error if password is wrong', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345679',
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.token).not.toBeDefined();
    expect(result.body.message).toBe('Senha incorreta.');
  });

  it('returns a token if user data is correct', async () => {
    const result = await request(server).post('/login').send({
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(200);
    expect(result.body.token).toBeDefined();
  });
});

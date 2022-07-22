import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../src/app';

describe('The POST /register route', () => {
  const prisma = new PrismaClient();
  const { server } = app;

  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('validates that "firstName" is required', async () => {
    const result = await request(server).post('/register').send({
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"firstName" is required');
  });

  it('validates that "firstName" must be a string', async () => {
    const result = await request(server).post('/register').send({
      firstName: 123456,
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"firstName" must be a string');
  });

  it('validates that "firstName" must have at least 2 characters', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'R',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe(
      '"firstName" length must be at least 2 characters long',
    );
  });

  it('validates that "lastName" is required', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"lastName" is required');
  });

  it('validates that "lastName" must be a string', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 123456,
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"lastName" must be a string');
  });

  it('validates that "lastName" must have at least 2 characters', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'C',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe(
      '"lastName" length must be at least 2 characters long',
    );
  });

  it('validates that "email" is required', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" is required');
  });

  it('validates that "email" must be a string', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 123456,
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" must be a string');
  });

  it('validates that "email" must be valid', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"email" must be a valid email');
  });

  it('validates that "password" is required', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" is required');
  });

  it('validates that "password" must be a string', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: 12345678,
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('"password" must be a string');
  });

  it('validates that "password" must have at least 8 characters', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: '1234567',
    });

    expect(result.statusCode).toBe(400);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe(
      '"password" length must be at least 8 characters long',
    );
  });

  it('returns an error if user is already registered', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Fulano',
      lastName: 'Silva',
      email: 'fulano.silva@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(409);
    expect(result.body.token).toBeUndefined();
    expect(result.body.message).toBe('Pessoa usuária já possui conta.');
  });

  it('returns a token if user data is correct', async () => {
    const result = await request(server).post('/register').send({
      firstName: 'Beltrano',
      lastName: 'Carvalho',
      email: 'beltrano.carvalho@email.com',
      password: '12345678',
    });

    expect(result.statusCode).toBe(201);
    expect(result.body.token).toBeDefined();
  });
});

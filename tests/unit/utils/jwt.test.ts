import jwt from 'jsonwebtoken';
import Jwt from '../../../src/utils/jwt';

describe('The Jwt "generateToken" function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return the token signed', async () => {
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'q1w2e3r4t5');

    const token = Jwt.generateToken({ id: 1, email: 'fulano.silva@email.com' });

    expect(token).toBe('q1w2e3r4t5');
  });
});

describe('The Jwt "authenticateToken" function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if token is not provided', async () => {
    await expect(Jwt.authenticateToken()).rejects.toThrow(
      'Acesso não autorizado.',
    );
  });

  it('should return user data if token is verified', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error();
    });

    await expect(Jwt.authenticateToken('t5r4e3w2q1')).rejects.toThrow(
      'Acesso não autorizado.',
    );
  });

  it('should return user data if token is verified', async () => {
    jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() => ({ id: 1, email: 'fulano.silva@email.com' }));

    const user = await Jwt.authenticateToken('q1w2e3r4t5');

    expect(user).toEqual({ id: 1, email: 'fulano.silva@email.com' });
  });
});

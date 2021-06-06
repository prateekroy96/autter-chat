import { VerifyUserMiddleware } from './verify-user.middleware';

describe('VerifyUserMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyUserMiddleware()).toBeDefined();
  });
});

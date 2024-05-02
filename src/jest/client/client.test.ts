import {
  describe,
  expect,
  test as it
} from '@jest/globals';

describe('client', () => {
  it('should run', () => {
    import('/assets/helloWorld').then(({ helloWorld }) => {
      expect(helloWorld).toBeDefined();
      expect(helloWorld).not.toThrow();
    });
  });
});

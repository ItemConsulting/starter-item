import {
  describe,
  expect,
  test as it
} from '@jest/globals';

describe('server', () => {
  it('should run', () => {
    import('/lib/myproject/helloWorld').then(({ helloWorld }) => {
      expect(helloWorld).toBeDefined();
      expect(helloWorld).not.toThrow();
    });
  });
});

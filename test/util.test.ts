import U from '../src/utils';

describe('isUndefined', () => {
  test('should return true for undefined', () => {
    expect(U.u(undefined)).toBe(true);
  });

  test('should return false for null', () => {
    expect(U.u(null)).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(U.u('')).toBe(false);
  });

  test('should return false for number 0', () => {
    expect(U.u(0)).toBe(false);
  });

  test('should return false for false', () => {
    expect(U.u(false)).toBe(false);
  });

  test('should return false for an object', () => {
    expect(U.u({})).toBe(false);
  });

  test('should return false for an array', () => {
    expect(U.u([])).toBe(false);
  });
});

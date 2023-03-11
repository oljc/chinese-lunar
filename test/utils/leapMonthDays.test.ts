import U from '../../src/utils';

describe('getLeapMonthDays 函数', () => {
  it('无润月', () => {
    expect(U.getLeapMonthDays(1991)).toBe(0);
    expect(U.getLeapMonthDays(2049)).toBe(0);
  });
  it('润小月', () => {
    expect(U.getLeapMonthDays(2023)).toBe(29);
    expect(U.getLeapMonthDays(2042)).toBe(29);
  });
  it('润大月', () => {
    expect(U.getLeapMonthDays(1979)).toBe(30);
    expect(U.getLeapMonthDays(2017)).toBe(30);
  });
});

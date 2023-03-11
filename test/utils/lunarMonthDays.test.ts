import U from '../../src/utils';

describe('getLunarMonthDays 函数', () => {
  it('2023年4月', () => {
    expect(U.getLunarMonthDays(2023, 4)).toBe(30);
    expect(U.getLunarMonthDays(2023, 13)).toBe(-1);
  });
});

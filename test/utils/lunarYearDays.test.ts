import U from '../../src/utils';

describe('getLunarYearDays 函数', () => {
  it('getLunarYearDays', () => {
    expect(U.getLunarYearDays(2023)).toBe(384);
  });
});

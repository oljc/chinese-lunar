import U from '../../src/utils';

describe('getChineseMonth', () => {
  test('1月应该返回"正月"', () => {
    expect(U.getChineseMonth(1)).toBe('正月');
  });

  test('2月应该返回"二月"', () => {
    expect(U.getChineseMonth(2)).toBe('二月');
  });

  test('特殊表示月', () => {
    expect(U.getChineseMonth(11)).toBe('冬月');
    expect(U.getChineseMonth(12)).toBe('腊月');
  });

  test('0月应该返回-1', () => {
    expect(U.getChineseMonth(0)).toBe(-1);
  });

  test('13月应该返回-1', () => {
    expect(U.getChineseMonth(13)).toBe(-1);
  });
});

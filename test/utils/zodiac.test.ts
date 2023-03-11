import U from '../../src/utils';

describe('getZodiac 函数', () => {
  it('生肖测试', () => {
    const testCases: [number, string][] = [
      [2032, '鼠'],
      [2033, '牛'],
      [2022, '虎'],
      [2023, '兔'],
      [2024, '龙'],
      [2025, '蛇'],
      [2026, '马'],
      [2027, '羊'],
      [2028, '猴'],
      [2029, '鸡'],
      [2030, '狗'],
      [2031, '猪'],
    ];

    testCases.forEach(([year, expectedZodiac]) => {
      expect(U.getZodiac(year)).toBe(expectedZodiac);
    });
  });
});

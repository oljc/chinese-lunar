import U from '../../src/utils';

describe('twoHourIndex 函数测试', () => {
  it('算小时数对应的下标', () => {
    expect(U.t(1)).toBe(1);
    expect(U.t(2)).toBe(1);
    expect(U.t(3)).toBe(2);
    expect(U.t(6)).toBe(3);
    expect(U.t(11)).toBe(6);
    expect(U.t(14)).toBe(7);
    expect(U.t(19)).toBe(10);
    expect(U.t(21)).toBe(11);
    expect(U.t(23)).toBe(0);
    expect(U.t(24)).toBe(0);
  });
});

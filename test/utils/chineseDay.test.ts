import U from '../../src/utils';

describe('getChineseDay', () => {
  it('当输入的数字为10、20、30时，返回对应的汉字字符串', () => {
    expect(U.getChineseDay(10)).toBe('初十');
    expect(U.getChineseDay(20)).toBe('二十');
    expect(U.getChineseDay(30)).toBe('三十');
  });

  it('当输入的数字不是10、20、30时，返回对应的汉字字符串', () => {
    expect(U.getChineseDay(1)).toBe('初一');
    expect(U.getChineseDay(11)).toBe('十一');
    expect(U.getChineseDay(21)).toBe('廿一');
    expect(U.getChineseDay(28)).toBe('廿八');
  });
});

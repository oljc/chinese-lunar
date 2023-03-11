import U from '../src/utils';

describe('solar2lunar', () => {
  it('Date时间转农历信息', () => {
    const date = new Date(2023, 2, 9, 21, 4, 45);
    const expected = {
      y: 2023,
      M: 2,
      D: 18,
      cD: '十八',
      cM: '二月',
      cY: '二〇二三',
      gzY: '癸卯',
      gzM: '乙卯',
      gzD: '丙寅',
      isLeap: false,
      zodiac: '兔',
      cW: '星期四',
      term: '',
    };
    expect(U.solar2lunar(date)).toStrictEqual(expected);
  });
  it('Date时间转农历信息', () => {
    const date = new Date(2023, 2, 22, 21, 31, 3);
    const expected = {
      y: 2023,
      M: 2,
      D: 1,
      cD: '初一',
      cM: '闰二月',
      cY: '二〇二三',
      gzY: '癸卯',
      gzM: '乙卯',
      gzD: '己卯',
      isLeap: true,
      zodiac: '兔',
      cW: '星期三',
      term: '',
    };
    expect(U.solar2lunar(date)).toStrictEqual(expected);
  });
  it('Date时间转农历信息', () => {
    const date = new Date(2023, 2, 22, 21, 31, 3);
    const expected = {
      y: 2023,
      M: 2,
      D: 1,
      cD: '初一',
      cM: '闰二月',
      cY: '二〇二三',
      gzY: '癸卯',
      gzM: '乙卯',
      gzD: '己卯',
      isLeap: true,
      zodiac: '兔',
      cW: '星期三',
      term: '',
    };
    expect(U.solar2lunar(date)).toStrictEqual(expected);
  });
});

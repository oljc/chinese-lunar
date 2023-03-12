import U from '../src/utils';

describe('solar2lunar', () => {
  it('Date时间转农历信息', () => {
    const date = new Date(2023, 2, 9, 21, 4, 45);
    const expected = {
      ly: 2023,
      lm: 2,
      ld: 18,
      cd: '十八',
      cm: '二月',
      cy: '二〇二三',
      gzy: '癸卯',
      gzm: '乙卯',
      gzd: '丙寅',
      isl: false,
      zod: '兔',
      cw: '星期四',
      st: '',
    };
    expect(U.solar2lunar(date)).toStrictEqual(expected);
  });
  it('Date时间转农历信息', () => {
    const date = new Date(2023, 2, 22, 21, 31, 3);
    const expected = {
      ly: 2023,
      lm: 2,
      ld: 1,
      cd: '初一',
      cm: '闰二月',
      cy: '二〇二三',
      gzy: '癸卯',
      gzm: '乙卯',
      gzd: '己卯',
      isl: true,
      zod: '兔',
      cw: '星期三',
      st: '',
    };
    expect(U.solar2lunar(date)).toStrictEqual(expected);
  });
});

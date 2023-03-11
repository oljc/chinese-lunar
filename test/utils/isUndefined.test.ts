import U from '../../src/utils';

describe('isUndefined函数', () => {
  it('当传入undefined时应该返回true', () => {
    expect(U.u(undefined)).toBeTruthy();
  });

  it('当传入null时应该返回false', () => {
    expect(U.u(null)).toBeFalsy();
  });

  it('当传入非空字符串时应该返回false', () => {
    expect(U.u('test')).toBeFalsy();
  });

  it('当传入数字0时应该返回false', () => {
    expect(U.u(0)).toBeFalsy();
  });

  it('当传入一个空对象时应该返回false', () => {
    expect(U.u({})).toBeFalsy();
  });
});

/**
 * 1900-01-31 春节 正月初一
 * 1900-02-04 立春 正月初五
 */

import * as C from './constant';

const isUndefined = (s: any): s is undefined => s === undefined;

const twoHourIndex = (h: number) => Math.floor((h + 1) / 2) % 12;

const minYear = 1900; // 最小年限
const maxYear = 2100; // 最大年限

/**
 * 获取农历Y年的总天数
 * @param 公历年份
 * @returns 农历Y年的总天数
 */
const getLunarYearDays = (y: number): number => {
  const d = C.DATD[y - minYear];
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += d & i ? 1 : 0;
  }
  return sum + getLeapMonthDays(y);
};

/**
 * 获取指定年份的农历闰月天数
 * @param y 公历年份
 * @returns 农历闰月天数（没有闰月则返回 0 ）
 */
const getLeapMonthDays = (y: number) => {
  if (getLunarLeapMonth(y)) {
    return C.DATD[y - minYear] & 0x10000 ? 30 : 29;
  }
  return 0;
};

/**
 * 获取指定年份的农历闰月月份
 * @param y 公历年份
 * @returns 润几月
 */
const getLunarLeapMonth = (y: number) => {
  return C.DATD[y - minYear] & 0xf;
};

/**
 * 获取指定 年月 的农历天数
 * @param y 公历年份
 * @param m 月份
 * @returns 农历天数
 */
const getLunarMonthDays = (y: number, m: number): number => {
  if (m > 12 || m < 1) {
    return -1; // 月份参数从1至12，参数错误返回-1
  }
  return C.DATD[y - minYear] & (0x10000 >> m) ? 30 : 29;
};

/**
 * 获取指定年份生肖
 * @param y 年份
 * @returns 生肖
 */
const getZodiac = (y: number): string => {
  return C.ZODIAC[(y - 4) % 12];
};

/**
 * 将数字日期（1-31）转换为对应的中文表达
 * @param n 数字（1-31）
 * @returns 中文表达
 */
const getChineseDay = (n: number): string => {
  const CNDAY_MAP: { [key: number]: string } = {
    10: '\u521d',
    20: '\u4e8c',
    30: '\u4e09',
  };

  if (n in CNDAY_MAP) {
    return `${CNDAY_MAP[n]}\u5341`;
  }

  return C.UNITS[Math.floor(n / 10)] + C.CN_DAY[n % 10];
};

/**
 * 转换中文年份
 * @param y 年份 ==> 2023
 * @returns 大写中文年 ==> 二〇二三
 */
const getChineseYear = (y: number): string => {
  return y
    .toString()
    .split('')
    .map((e) => (e === '0' ? '〇' : C.CN_DAY[Number(e)]))
    .join('');
};

const getCNMonth = (m: number) => {
  if (m > 12 || m < 1) {
    return -1;
  }
  if (m === 1) return '\u6b63\u6708';
  return `${C.CN_DAY[m]}\u6708`;
};

const getGanZhi = (offset: number) => {
  return C.GAN[offset % 10] + C.ZHI[offset % 12];
};

const getGanZhiYear = (year: number) => {
  let g = (year - 3) % 10;
  let z = (year - 3) % 12;
  if (g === 0) g = 10; // 如果余数为0则为最后一个天干
  if (z === 0) z = 12; // 如果余数为0则为最后一个地支
  return C.GAN[g - 1] + C.ZHI[z - 1];
};

/**
 * 二十四节气
 * @param y 年
 * @param m 月
 * @param d 日
 * @returns 节日
 */
const sTermInfo = (y: number, m: number, d: number): string => {
  const add = Date.UTC(1900, 0, 6, 2, 5);
  let sotmp1 = new Date(
    31556925974.7 * (y - 1900) + C.TERM_INFO[m * 2 + 1] * 60000 + add
  );
  if (sotmp1.getUTCDate() === d) {
    return C.SOLAR_TERM[m * 2 + 1];
  }
  sotmp1 = new Date(
    31556925974.7 * (y - 1900) + C.TERM_INFO[m * 2] * 60000 + add
  );
  if (sotmp1.getUTCDate() === d) {
    return C.SOLAR_TERM[m * 2];
  }
  return '';
};

/**
 * 月第一个出现的节气日期
 * @param year 年
 * @param month 月
 * @returns 日期  ===> 4
 */
const findFirstTerm = (year: number, month: number): number => {
  for (let i = 1; i <= 15; i++) {
    const solarTerm = sTermInfo(year, month, i);
    if (solarTerm !== '') {
      return i;
    }
  }
  return 1;
};

/**
 * 公历转农历
 * @param date 日期
 * @returns obj 农历信息对象
 */
const solar2lunar = (date: Date) => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let i = minYear;
  let temp = 0;
  let offset = (Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000;
  for (i; i < 2101 && offset > 0; i++) {
    temp = getLunarYearDays(i);
    offset -= temp;
  }
  if (offset < 0) {
    offset += temp;
    i--;
  }
  const year = i; // 确定年

  const leap = getLunarLeapMonth(i) || 0; // 润几月
  let isLeap = false;
  let j = 1;
  // 如果还剩偏移天数开始循环
  for (j; j < 13 && offset > 0; j++) {
    if (leap > 0 && j === leap + 1 && isLeap === false) {
      --j;
      isLeap = true;
      temp = getLeapMonthDays(year);
    } else {
      temp = getLunarMonthDays(year, j);
    }
    if (isLeap === true && j === leap + 1) {
      isLeap = false;
    }
    offset -= temp;
  }
  if (offset === 0 && leap > 0 && j === leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true;
      --j;
    }
  }
  if (offset < 0) {
    offset += temp;
    --j;
  }
  const month = j;
  const day = offset + 1;
  const firstNode = findFirstTerm(y, m); // 返回当月「节」为几日开始
  let gzM = getGanZhi((y - 1900) * 12 + m + 11);
  if (d >= firstNode) {
    gzM = getGanZhi((y - 1900) * 12 + m + 12);
  }

  // 日柱当月一日与 1900/1/1 相差天数
  const gzD = getGanZhi(
    Date.UTC(y, m - 1, 1, 0, 0, 0, 0) / 86400000 + 25577 + d - 1
  );
  return {
    y: year,
    M: month,
    D: day,
    cD: getChineseDay(day),
    cM: (isLeap ? '\u95f0' : '') + getCNMonth(month),
    cY: getChineseYear(year),
    gzY: getGanZhiYear(year),
    gzM,
    gzD,
    isLeap,
    zodiac: getZodiac(year),
    cW: `星期${C.CN_DAY[date.getDay()]}`,
    term: sTermInfo(y, m - 1, d),
  };
};

export default {
  u: isUndefined,
  solar2lunar,
  twoHourIndex,
  sTermInfo,
};

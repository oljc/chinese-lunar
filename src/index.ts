import { REGEX_P } from './constant';
import U from './utils';
import * as C from './constant';

type DateType = string | number | Date | null | undefined;

interface ConfigType {
  date?: DateType;
  utc?: boolean;
  args?: IArguments;
  format?: string;
}

// eslint-disable-next-line func-names
const lunar = function (date?: DateType, c?: ConfigType): Lunar {
  const cfg: ConfigType = typeof c === 'object' ? c : {};
  cfg.date = date;
  // eslint-disable-next-line prefer-rest-params
  cfg.args = arguments;
  return new Lunar(cfg);
};

const parseDate = (date: DateType, utc?: boolean): Date => {
  if (date === null) return new Date(NaN);
  if (U.u(date)) return new Date();
  if (date instanceof Date) return new Date(date);
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const e = date.match(REGEX_P);
    if (e) {
      const y = Number(e[1]);
      const M = Number(e[2]) - 1 || 0;
      const d = Number(e[3]) || 1;
      const h = Number(e[4]) || 0;
      const m = Number(e[5]) || 0;
      const s = Number(e[6]) || 0;
      const ms = Number((e[7] || '0').substring(0, 3));
      if (utc) {
        return new Date(Date.UTC(y, m, M, h, m, s, ms));
      }
      return new Date(y, M, d, h, m, s, ms);
    }
  }
  return new Date(date);
};

class Lunar {
  private $d: any;

  private $y: any;

  private $M: any;

  private $D: any;

  private $zodiac: any;

  private $cDay: any;

  private $cMonth: any;

  private $cYear: any;

  private $gzY: any;

  private $gzM: any;

  private $gzD: any;

  private $isLeap: any;

  private $w: any;

  private $cW: any;

  private $term: any;

  constructor(cfg: ConfigType) {
    this.parse(cfg);
  }

  parse(cfg: ConfigType) {
    this.$d = parseDate(cfg.date);
    this.$w = this.$d.getDay();
    this.init();
  }

  init() {
    const { y, M, D, cY, cM, cD, cW, gzY, gzM, gzD, zodiac, isLeap, term } =
      U.solar2lunar(this.$d);
    this.$y = y;
    this.$M = M;
    this.$D = D;
    this.$cYear = cY;
    this.$cMonth = cM;
    this.$cDay = cD;
    this.$cW = cW;
    this.$gzY = gzY;
    this.$gzM = gzM;
    this.$gzD = gzD;
    this.$zodiac = zodiac;
    this.$isLeap = isLeap;
    this.$term = term;
  }

  year(): number {
    return this.$y;
  }

  month(): string {
    return this.$M;
  }

  day(): string {
    return this.$D;
  }

  format(): string {
    return this.$y + this.$cMonth + this.$cDay;
  }

  time(h?: number, u?: string): string {
    const i = h || this.$d.getHours();
    return C.ZHI[U.twoHourIndex(i)] + (u || '时');
  }

  timeShengXiao(h?: number): string {
    const i = h || this.$d.getHours();
    return C.ZODIAC[U.twoHourIndex(i)];
  }

  sTerm(date?: DateType): string {
    const d = parseDate(date) || this.$d;
    return U.sTermInfo(d.getFullYear(), d.getMonth(), d.getDate());
  }
}
export default lunar;

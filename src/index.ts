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

const isLunar = (d: unknown): d is Lunar => d instanceof Lunar;
// eslint-disable-next-line func-names
const lunar = function (date?: DateType, c?: ConfigType): Lunar {
  if (isLunar(date)) {
    return date.clone();
  }
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

const wrapper = (date: DateType) => lunar(date);

class Lunar {
  [key: string]: any;

  constructor(cfg: ConfigType) {
    this.parse(cfg);
  }

  parse(cfg: ConfigType) {
    this.$d = parseDate(cfg.date);
    this.init();
  }

  init() {
    const { ly, lm, ld, cy, cm, cd, cw, gzy, gzm, gzd, zod, isl, st } =
      U.solar2lunar(this.$d);
    this.$ly = ly;
    this.$lm = lm;
    this.$ld = ld;
    this.$cy = cy;
    this.$cm = cm;
    this.$cd = cd;
    this.$cw = cw;
    this.$gzy = gzy;
    this.$gzm = gzm;
    this.$gzd = gzd;
    this.$zod = zod;
    this.$isl = isl;
    this.$st = st;
  }

  format(): string {
    return this.$ly + this.$cm + this.$cd;
  }

  clone() {
    return wrapper(this.$d);
  }

  get(unit: string) {
    return this[U.p(unit)]();
  }

  lunarTime(h?: number, u?: string): string {
    const i = h || this.$d.getHours();
    return C.ZHI[U.t(i)] + (u || '时');
  }

  timeShengXiao(h?: number): string {
    const i = h || this.$d.getHours();
    return C.ZODIAC[U.t(i)];
  }

  sTerm(date?: DateType): string {
    const d = parseDate(date) || this.$d;
    return U.sTermInfo(d.getFullYear(), d.getMonth(), d.getDate());
  }
}

const proto = Lunar.prototype;
lunar.prototype = proto;
[
  ['$ly', C.LY],
  ['$lm', C.LM],
  ['$ld', C.LD],
  ['$cy', C.CY],
  ['$cm', C.CM],
  ['$cd', C.CD],
  ['$cw', C.CW],
  ['$gzy', C.GZY],
  ['$gzm', C.GZM],
  ['$gzd', C.GZD],
  ['$zod', C.ZOD],
  ['$isl', C.ISL],
].forEach(([prop, name]) => {
  // eslint-disable-next-line func-names
  proto[name] = function () {
    return this[prop];
  };
});

lunar.extend = (plugin: any, option: any) => {
  if (!plugin.$i) {
    plugin(option, Lunar, lunar);
    plugin.$i = true;
  }
  return lunar;
};

export default lunar;

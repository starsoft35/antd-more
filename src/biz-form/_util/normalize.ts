// 标准化输入

import { formatBankCard } from 'util-helpers';

type Options = {
  symbol?: string;
  [x: string]: any;
};
type ValueType = string | undefined;
type NormalizeFn<T> = (val: T) => T;
type NormalizeSecurityFn<T> = (val: T, options?: Options) => T;

// 标准化输入非空白符
const normalizeWhiteSpace: NormalizeFn<ValueType> = (val) => {
  if (typeof val === 'string') {
    return val.replace(/\s+/g, '');
  }
  return val;
};

// 标准化输入银行卡号
const normalizeBankCard: NormalizeSecurityFn<ValueType> = (
  val,
  { symbol = '', char = ' ', length = 4 },
) => {
  let ret = val;
  if (typeof val === 'string') {
    const reg = symbol ? new RegExp(`[^\\d\\${symbol}]`, 'g') : /[^\d]/g;
    ret = val.replace(reg, '');
  }
  if (char) {
    ret = formatBankCard(ret, { char, length });
  }
  return ret;
};

// 标准化输入身份证号
const normalizeIdCard: NormalizeSecurityFn<ValueType> = (val, { symbol = '' }) => {
  if (typeof val === 'string') {
    const reg = symbol ? new RegExp(`[^\\d|x|\\${symbol}]`, 'ig') : /[^\d|x]/gi;
    return val.replace(reg, '').toUpperCase();
  }
  return val;
};

// 标准化输入手机号码
const normalizeMobile: NormalizeSecurityFn<ValueType> = (val, { symbol = '' }) => {
  if (typeof val === 'string') {
    const reg = symbol ? new RegExp(`[^\\d\\${symbol}]`, 'g') : /[^\d]/g;
    return val.replace(reg, '');
  }
  return val;
};

export { normalizeWhiteSpace, normalizeBankCard, normalizeIdCard, normalizeMobile };

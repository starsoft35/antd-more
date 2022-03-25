// 标准化输入

import { normalizeString, formatBankCard, formatMobile } from 'util-helpers';

// 标准化输入非空白符
export const normalizeWhiteSpace = (value: string) => {
  return normalizeString(value).replace(/\s/g, '');
};

// 标准化输入银行卡号
export const normalizeBankCard = (value: string, symbol = '') => {
  const valueStr = normalizeString(value);
  const reg = symbol ? new RegExp(`[^\\d\\${symbol}]`, 'g') : /[^\d]/g;
  return formatBankCard(valueStr.replace(reg, ''));
};

// 标准化输入身份证号
export const normalizeIdCard = (value, symbol = '') => {
  const valueStr = normalizeString(value);
  const reg = symbol ? new RegExp(`[^\\dx\\${symbol}]`, 'gi') : /[^\dx]/gi;
  return valueStr.replace(reg, '').substring(0, 18).toUpperCase();
};

// 标准化输入手机号码
export const normalizeMobile = (value, symbol = '') => {
  const valueStr = normalizeString(value);
  const reg = symbol ? new RegExp(`[^\\d\\${symbol}]`, 'g') : /[^\d]/g;
  return formatMobile(valueStr.replace(reg, ''));
};

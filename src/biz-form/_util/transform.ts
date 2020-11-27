// 转换

import moment from 'moment';

// 转换银行卡号
function transformBankCard(val: string, char = '') {
  if (typeof val !== 'string') {
    return val;
  }

  let ret = val.replace(/\s/g, '');

  if (char) {
    const reg = new RegExp(`\\${char}`, 'g');
    ret = val.replace(reg, '');
  }
  return ret;
}

// 转换日期
function transformDate(date, format) {
  if (moment.isMoment(date)) {
    return date.format(format);
  }
  if (Array.isArray(date) && date.length > 0) {
    return date.map((item) => transformDate(item, format));
  }
  if (date && typeof date === 'string') {
    return moment(date).format(format);
  }
  return date;
}

// 转换表单值
function transformFormValues(values: any, transforms: any) {
  if (
    (Array.isArray(values) && values.length <= 0) ||
    (Array.isArray(transforms) && transforms.length <= 0) ||
    !transforms
  ) {
    return values;
  }

  let ret;

  if (Array.isArray(values) && Array.isArray(transforms)) {
    ret = values.map((item, index) => {
      if (typeof item === 'object' || Array.isArray(item)) {
        return transformFormValues(item, transforms[index]);
      }
      if (typeof transforms[index] === 'function') {
        return transforms[index](item);
      }
      return item;
    });
  } else if (typeof values === 'object' && typeof transforms === 'object') {
    ret = {};
    // eslint-disable-next-line
    for (const key in values) {
      if (typeof values[key] === 'object' || Array.isArray(values[key])) {
        ret[key] = transformFormValues(values[key], transforms[key]);
      } else if (typeof transforms[key] === 'function') {
        ret[key] = transforms[key](values[key]);
      } else {
        ret[key] = values[key];
      }
    }
  } else if (typeof transforms === 'function') {
    ret = transforms(values);
  } else {
    ret = values;
  }

  return ret;
}

export { transformBankCard, transformDate, transformFormValues };

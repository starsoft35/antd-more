import moment, { Moment } from 'moment';

// DatePicker picker值
type Picker = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

// moment 度量值
export enum MomentScale {
  time = 'hours',
  date = 'days',
  week = 'weeks',
  month = 'months',
  quarter = 'months',
  year = 'years',
}

// 中文单位
export enum DateUnit {
  time = '小时',
  date = '天',
  week = '周',
  month = '月',
  quarter = '季',
  year = '年',
}

type CreateDisabledDateOptions = {
  disabledDateBefore?: number;
  disabledDateAfter?: number;
};

// 创建不可选日期方法
export function createDisabledDate(picker: Picker = 'date', opts?: CreateDisabledDateOptions) {
  const { disabledDateBefore, disabledDateAfter } = opts;

  if (typeof disabledDateBefore !== 'number' && typeof disabledDateAfter !== 'number') {
    return () => false;
  }

  const scale = MomentScale[picker];

  if (!scale) {
    return () => false;
  }

  return (current: Moment) => {
    if (!current) {
      return false;
    }

    const hasBefore = typeof disabledDateBefore === 'number';
    const hasAfter = typeof disabledDateAfter === 'number';

    let before = disabledDateBefore;
    let after = disabledDateAfter;

    // 处理季度
    if (picker === 'quarter') {
      if (hasBefore) {
        before *= 3;
      }
      if (hasAfter) {
        after *= 3;
      }
    }

    if (hasBefore && hasAfter) {
      return (
        current <= moment().add(before, scale).endOf('day') ||
        current >= moment().add(after, scale).startOf('day')
      );
    } else if (hasBefore) {
      return current <= moment().add(before, scale).endOf('day');
    } else if (hasAfter) {
      return current >= moment().add(after, scale).startOf('day');
    }
    return false;
  };
}

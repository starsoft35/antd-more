import React from 'react';
import { formatMoney } from 'util-helpers';
import { FieldProps } from './interface';
import FieldProgress from './components/Progress';
import FieldIndex from './components/Index';
import Dictionary from '../dictionary';
import Color from '../color';
import '../color/style';
import Percent from './components/Percent';
import { getDateStr } from './_util/dateUtil';

const dateType = [
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTime',
  'dateTimeRange',
  'time',
  'fromNow',
];
const indexType = ['index', 'indexBorder'];
const enumType = ['enum', 'enumTag', 'enumBadge'];

const Field: React.FC<FieldProps> = ({
  value,
  valueType = 'default',
  valueEnum = [],
  ...restProps
}) => {
  let view = value;
  let type: string;
  let props = {
    ...restProps,
  };

  if (typeof valueType === 'string') {
    type = valueType;
  } else {
    let params: any;
    if (typeof valueType === 'function') {
      params = valueType();
    } else if (typeof valueType === 'object') {
      params = valueType;
    }
    if (typeof params === 'object') {
      const { type: customType, ...restParams } = params;
      type = customType;
      props = {
        ...restProps,
        ...restParams,
      };
    }
  }

  if (type === 'text') {
    // 文本
    view = <span {...props}>{value || '-'}</span>;
  } else if (type === 'money') {
    // 金额
    view = <span {...props}>{formatMoney(value)}</span>;
  } else if (dateType.includes(type)) {
    // 日期类型
    view = <span {...props}>{getDateStr(value, type)}</span>;
  } else if (indexType.includes(type)) {
    // 序号
    view = <FieldIndex value={value + 1} type={type} {...props} />;
  } else if (type === 'progress') {
    // 进度条
    view = <FieldProgress value={value} {...props} />;
  } else if (type === 'percent') {
    // 百分比
    view = <Percent value={value} {...props} />;
  } else if (enumType.includes(type)) {
    // 枚举值
    const typeObj = {
      enum: 'text',
      enumBadge: 'badge',
      enumTag: 'tag',
    };
    const enumProps = {
      value,
      type: typeObj[type],
      data: valueEnum,
    };
    view = Array.isArray(value) ? (
      <Dictionary.List {...enumProps} {...props} />
    ) : (
      <Dictionary {...enumProps} {...props} />
    );
  } else if (type === 'color') {
    // 颜色
    view = <Color value={value} {...props} />;
  }

  return view;
};

export default Field;

import React from 'react';
import { formatMoney } from 'util-helpers';
import { BizFieldProps } from './interface';
import FieldProgress from './components/Progress';
import FieldIndex from './components/Index';
import FieldImage from './components/Image';
import Dictionary from '../dictionary';
import Color from '../color';
import Percent from './components/Percent';
import { getDateStr } from './_util/dateUtil';
import parseValueType from './_util/parseValueType';

const DateType = [
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTime',
  'dateTimeRange',
  'time',
  'timeRange',
  'fromNow',
];
const IndexType = ['index', 'indexBorder'];
const EnumType = ['enum', 'enumTag', 'enumBadge'];

const BizField: React.FC<BizFieldProps> = ({ value, valueType, valueEnum = [], ...restProps }) => {
  const { type, ...restParams } = parseValueType(valueType);
  const props = {
    ...restProps,
    ...restParams,
  };

  if (type === 'text') {
    // 文本
    return <span {...props}>{value || '-'}</span>;
  } else if (type === 'image') {
    // 图片
    return <FieldImage value={value} {...props} />;
  } else if (type === 'money') {
    // 金额
    return <span {...props}>{formatMoney(value)}</span>;
  } else if (DateType.includes(type)) {
    // 日期类型
    const { format, ...rest } = props;
    return <span {...rest}>{getDateStr(value, type, format)}</span>;
  } else if (IndexType.includes(type)) {
    // 序号
    return <FieldIndex value={value + 1} type={type} {...props} />;
  } else if (type === 'progress') {
    // 进度条
    return <FieldProgress value={value} {...props} />;
  } else if (type === 'percent') {
    // 百分比
    return <Percent value={value} {...props} />;
  } else if (EnumType.includes(type)) {
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
    return Array.isArray(value) ? (
      <Dictionary.List {...enumProps} {...props} />
    ) : (
      <Dictionary {...enumProps} {...props} />
    );
  } else if (type === 'color') {
    // 颜色
    return <Color value={value} {...props} />;
  }

  return value;
};

export default BizField;

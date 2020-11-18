import React from 'react';
import { Tag, Badge, Avatar, Image, Rate } from 'antd';
import moment from 'moment';
import { formatMoney } from 'util-helpers';
import { FieldProps } from './common';
import FieldProgress from './FieldProgress';
import FieldDate from './FieldDate';
import FieldIndex from './FieldIndex';

// 1. 默认不设置
// 2. text，为空 或 undefined 或 null 时，显示 "-"

// 日期（moment处理）
// 3. date，日期，YYYY-MM-DD
// 4. dateWeek，周，YYYY-wo
// 5. dateMonth，月，YYYY-MM
// 6. dateQuarter，季，YYYY-\QQ
// 7. dateYear，年，YYYY
// 8. dateRange，日期范围，YYYY-MM-DD
// 9. dateTime，日期时间，YYYY-MM-DD HH:mm:ss
// 10. dateTimeRange，日期时间范围，YYYY-MM-DD HH:mm:ss
// 11. time，时间，HH:mm:ss
// 12. fromNow，相对现在的时间，moment.fromNow()

// 数字
// 13. money，自动对值进行金额格式化处理
// 14. index，序号，默认+1
// 15. indexBorder，带边框的序号，默认+1
// 16. progress，进度
// 17. percent，百分比，后面补%
// 18. rate，评分

// 其他
// 19. enum，枚举，多个使用数组。需配合 valueEnum，enumType 使用（支持配置tag、text、badge）
// 20. avatar，头像，圆角边框
// 21. image，图片
// 22. tag，标签
// 23. badge，徽章

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

const Field: React.FC<FieldProps> = ({
  value,
  type = 'default',
  enumType = 'text',
  valueEnum = [],
  fieldProps = {},
}) => {
  // 文本
  if (type === 'text') {
    return <span {...fieldProps}>{value || '-'}</span>;
  }

  // 金额
  if (type === 'money') {
    return <span {...fieldProps}>{formatMoney(value)}</span>;
  }

  // 日期类型
  if (dateType.includes(type)) {
    return <FieldDate value={value} type={type} fieldProps={fieldProps} />;
  }

  // 序号
  if (indexType.includes(type)) {
    return <FieldIndex value={value} type={type} fieldProps={fieldProps} />;
  }

  // 进度条
  if (type === 'progress') {
    return <FieldProgress value={value} fieldProps={fieldProps} />;
  }

  // 'percent' | 'rate' | 'enum' | 'avatar' | 'image' | 'tag' | 'badge';

  return value;
};

export default Field;

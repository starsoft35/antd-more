import React from 'react';
import { Badge, Tag } from 'antd';
import type { DictionaryProps } from './interface';

const Dictionary: React.FC<DictionaryProps> = ({
  data = [],
  value = '',
  defaultName,
  defaultLabel = '-',
  type = 'text',
  optionName = '',
  ...restProps
}) => {
  const ret = data.find((item) => item.value === value);

  if (!ret) {
    return defaultName || defaultLabel;
  }

  const options = (optionName ? ret[optionName] : ret[type]) || {};
  const { alias, ...restOptions } = options;
  const props = {
    ...restOptions,
    ...restProps,
    style: { ...restOptions?.style, ...restProps?.style }
  };
  const name = alias || ret.name || ret.label;

  if (type === 'tag') {
    return <Tag {...props}>{name}</Tag>;
  }

  if (type === 'badge') {
    return <Badge text={name} {...props} />;
  }

  return <span {...props}>{name}</span>;
};

export default Dictionary;

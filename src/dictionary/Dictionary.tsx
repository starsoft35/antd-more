import React, { useMemo } from 'react';
import { Badge, Tag } from 'antd';
import type { DictionaryProps } from './interface';

const Dictionary: React.FC<DictionaryProps> = ({
  data = [],
  value = '',
  defaultName,
  defaultLabel = '-',
  type = 'text',
  optionName = '',
  fieldNames: outFieldNames,
  ...restProps
}) => {
  const { label: labelKey, value: valueKey } = useMemo(
    () => ({
      label: 'label',
      value: 'value',
      ...outFieldNames
    }),
    [outFieldNames]
  );
  const ret = data.find((item) => item[valueKey] === value);

  if (!ret) {
    return <>{defaultName || defaultLabel}</>;
  }

  const options = (optionName ? ret[optionName] : ret[type]) || {};
  const { alias, ...restOptions } = options;
  const props = {
    ...restOptions,
    ...restProps,
    style: { ...restOptions?.style, ...restProps?.style }
  };
  const name = alias || ret[labelKey] || ret.name;

  if (type === 'tag') {
    return <Tag {...props}>{name}</Tag>;
  }

  if (type === 'badge') {
    return <Badge text={name} {...props} />;
  }

  return <span {...props}>{name}</span>;
};

export default Dictionary;

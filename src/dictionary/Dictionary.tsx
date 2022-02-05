import React, { useCallback, useMemo } from 'react';
import { Badge, Tag, Space } from 'antd';
import classnames from 'classnames';
import type { DictionaryProps } from './interface';
import './index.less';

const prefixCls = 'antd-more-dictionary';

function Dictionary<ValueType = any>({
  valueEnum = [],
  value,
  defaultLabel = '-',
  type = 'text',
  optionName = '',
  fieldNames: outFieldNames,
  match,
  className,
  ...restProps
}: DictionaryProps<ValueType>) {
  const { label: labelKey, value: valueKey } = useMemo(
    () => ({
      label: 'label',
      value: 'value',
      ...outFieldNames
    }),
    [outFieldNames]
  );
  const values = Array.isArray(value) ? value : [value];
  const realOptionName = optionName || type;
  const matchMethod = useCallback(
    (itemValue, currentValue) => {
      return typeof match === 'function'
        ? match(itemValue, currentValue)
        : itemValue === currentValue;
    },
    [match]
  );

  const ret = valueEnum.filter((item) => values.find((curr) => matchMethod(item[valueKey], curr)));
  let view: JSX.Element;

  if (!Array.isArray(ret) || ret.length <= 0) {
    view = <span>{defaultLabel}</span>;
  } else {
    view = (
      <>
        {ret.map((item) => {
          const options = item[realOptionName] || {};
          const { alias, ...restOptions } = options;
          const label = alias || item[labelKey];
          const itemProps = {
            key: item[valueKey],
            ...restOptions
          };

          if (type === 'tag') {
            return <Tag {...itemProps}>{label}</Tag>;
          }

          if (type === 'badge') {
            return <Badge text={label} {...itemProps} />;
          }

          // eslint-disable-next-line react/jsx-key
          return <span {...itemProps}>{label}</span>;
        })}
      </>
    );
  }

  return (
    <Space className={classnames(prefixCls, className)} {...restProps}>
      {view}
    </Space>
  );
}

export default Dictionary;

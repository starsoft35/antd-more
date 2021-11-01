import React, { useMemo } from 'react';
import { Space } from 'antd';
import type { SpaceProps } from 'antd';
import Dictionary from './Dictionary';
import type { DictionaryProps } from './interface';

// tag 类型默认样式
const tagDefaultStyle = {
  margin: 0,
};

export interface DictionaryListProps extends DictionaryProps, SpaceProps {
  value?: any[];
}

const DictionaryList: React.FC<DictionaryListProps> = ({
  value = [],
  type = 'text',
  style = {},
  defaultName,
  defaultLabel = '-',
  align = 'start',
  direction = 'horizontal',
  size = 'small',
  ...restProps
}) => {
  const styles = useMemo(
    () => (type === 'tag' ? { ...tagDefaultStyle, ...style } : { ...style }),
    [type, style],
  );

  if (!Array.isArray(value) || value.length <= 0) {
    return defaultName || defaultLabel;
  }

  const dom = value.map((itemVal, index) => (
    <Dictionary
      key={itemVal + index.toString()}
      defaultName={defaultName || defaultLabel}
      value={itemVal}
      style={styles}
      type={type}
      {...restProps}
    />
  ));

  if (value.length === 1) {
    return dom;
  }

  return (
    <Space align={align} size={size} direction={direction}>
      {dom}
    </Space>
  );
};

export default DictionaryList;

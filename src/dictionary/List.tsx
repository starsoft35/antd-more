import React, { useMemo } from 'react';
import { Space } from 'antd';
import Dictionary, { DictionaryProps } from './Dictionary';

// tag 类型默认样式
const tagDefaultStyle = {
  margin: 0,
};

export interface DictionaryListProps extends DictionaryProps {
  value?: any[];
}

const DictionaryList: React.FC<DictionaryListProps> = ({
  value = [],
  type = 'text',
  style = {},
  defaultName = '-',
  ...restProps
}) => {
  const styles = useMemo(() => (type === 'tag' ? { ...tagDefaultStyle, ...style } : { ...style }), [
    type,
    style,
  ]);

  if (!Array.isArray(value) || value.length <= 0) {
    return defaultName;
  }

  const dom = value.map((itemVal) => (
    <Dictionary
      key={itemVal}
      defaultName=""
      value={itemVal}
      style={styles}
      type={type}
      {...restProps}
    />
  ));

  if (value.length === 1) {
    return dom;
  }

  return <Space>{dom}</Space>;
};

export default DictionaryList;

import React from 'react';
import { Badge, Tag } from 'antd';
import { EnumData } from './common';

export interface DictionaryProps {
  data: EnumData[];
  value?: any;
  defaultName?: any;
  type?: 'text' | 'tag' | 'badge';
  optionName?: string;
  [key: string]: any;
}

class Dictionary extends React.Component<DictionaryProps> {
  static defaultProps = {
    data: [],
    value: '',
    defaultName: '-',
    type: 'text',
    optionName: '',
  };

  render() {
    const { data = [], value, defaultName, type, optionName, ...restProps } = this.props;

    const ret = data.find((item) => item.value === value);

    if (!ret) {
      return defaultName;
    }

    const options = (optionName ? ret[optionName] : ret[type]) || {};
    const { alias, ...restOptions } = options;
    const props = { ...restOptions, ...restProps };
    const name = alias || ret.name;

    if (type === 'tag') {
      return <Tag {...props}>{name}</Tag>;
    }

    if (type === 'badge') {
      return <Badge text={name} {...props} />;
    }

    return <span {...props}>{name}</span>;
  }
}

export default Dictionary;

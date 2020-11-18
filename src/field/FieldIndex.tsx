import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from './common';

const prefixCls = 'antd-more-field-index';

const FieldIndex: React.FC<FieldProps> = ({ value, type = 'index', fieldProps = {} }) => {
  return (
    <span
      className={classnames(prefixCls, {
        [`${prefixCls}-border`]: type === 'indexBorder',
        'top-three': (value as number) > 3,
      })}
      {...fieldProps}
    >
      {value}
    </span>
  );
};

export default FieldIndex;

import * as React from 'react';
import classnames from 'classnames';
import { FieldProps } from '../interface';

const prefixCls = 'antd-more-field-index';

const FieldIndex: React.FC<FieldProps> = ({ value, type = 'index', className, ...restProps }) => {
  return (
    <span
      className={classnames(prefixCls, className, {
        [`${prefixCls}-border`]: type === 'indexBorder',
        'top-three': (value as number) > 3,
      })}
      {...restProps}
    >
      {value}
    </span>
  );
};

export default FieldIndex;

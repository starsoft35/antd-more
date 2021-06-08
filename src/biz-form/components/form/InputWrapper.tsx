import * as React from 'react';
import { Input } from 'antd';
import type { InputProps } from '../antd.interface';

import './index.less';

const prefixCls = 'antd-more-form-input';

export interface InputWrapperProps extends InputProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  initialTransform?: false | ((value, prevValue?, allValues?) => any);
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  after,
  before,
  initialTransform,
  value,
  onChange,
  ...restProps
}) => {
  React.useEffect(() => {
    // 对第一次加载的数据格式化
    if (initialTransform && value) {
      onChange(initialTransform(value));
    }
  }, []);

  return (
    <div className={prefixCls}>
      {before && <div style={{ marginRight: 8 }}>{before}</div>}
      <Input value={value} onChange={onChange} {...restProps} />
      {after && <div style={{ marginLeft: 8 }}>{after}</div>}
    </div>
  );
};

export default InputWrapper;

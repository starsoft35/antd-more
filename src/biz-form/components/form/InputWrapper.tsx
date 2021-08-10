import * as React from 'react';
import { Input } from 'antd';
import type { InputProps } from '../antd.interface';

export interface InputWrapperProps extends InputProps {
  initialTransform?: false | ((value, prevValue?, allValues?) => any);
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  initialTransform,
  value,
  onChange,
  ...restProps
}) => {
  React.useEffect(() => {
    // 对第一次加载的数据格式化
    if (initialTransform && value) {
      onChange?.(initialTransform(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Input value={value} onChange={onChange} {...restProps} />;
};

export default InputWrapper;

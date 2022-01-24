import * as React from 'react';
import { Input } from 'antd';
import type { InputProps } from '../antd.interface';

export interface InputWrapperProps extends InputProps {
  normalize?: (value) => any;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  normalize,
  value,
  onChange,
  ...restProps
}) => {
  React.useEffect(() => {
    // fix: 异步初始值没有规整化问题
    if (value && normalize) {
      if (normalize(value) !== value) {
        onChange?.(normalize(value));
      }
    }
  }, [normalize, onChange, value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 数据格式化
      if (normalize) {
        onChange?.(normalize(e.target.value));
      } else {
        onChange?.(e);
      }
    },
    [normalize, onChange]
  );

  return <Input value={value} onChange={handleChange} {...restProps} />;
};

export default InputWrapper;

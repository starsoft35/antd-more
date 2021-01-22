import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';

const prefixCls = 'antd-more-input';

export interface InputWrapperProps extends InputProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  initialTransform?: (val) => any;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  after,
  before,
  initialTransform,
  value,
  onChange,
  ...restProps
}) => {
  const countRef = React.useRef(0);

  React.useEffect(() => {
    if (countRef.current === 0 && initialTransform && value) {
      countRef.current += 1;
      onChange(initialTransform(value));
    }
  }, [value]);

  return (
    <div className={prefixCls}>
      {before && <div style={{ marginRight: 8 }}>{before}</div>}
      <Input value={value} onChange={onChange} {...restProps} />
      {after && <div style={{ marginLeft: 8 }}>{after}</div>}
    </div>
  );
};

export default InputWrapper;

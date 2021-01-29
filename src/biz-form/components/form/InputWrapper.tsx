import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';

const prefixCls = 'antd-more-input';

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
  const countRef = React.useRef(0);

  const handleChange = React.useCallback(
    (e) => {
      if (countRef.current === 0) {
        countRef.current += 1;
      }
      onChange(e);
    },
    [onChange],
  );

  React.useEffect(() => {
    // 对第一次加载的数据格式化
    if (countRef.current === 0 && initialTransform && value) {
      handleChange(initialTransform(value));
    }
  }, [value, handleChange, initialTransform]);

  return (
    <div className={prefixCls}>
      {before && <div style={{ marginRight: 8 }}>{before}</div>}
      <Input value={value} onChange={handleChange} {...restProps} />
      {after && <div style={{ marginLeft: 8 }}>{after}</div>}
    </div>
  );
};

export default InputWrapper;

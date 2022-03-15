import * as React from 'react';
import { Input } from 'antd';
import { calculateCursorPosition } from 'util-helpers';
import type { InputProps } from '../antd.interface';

export interface InputWrapperProps extends InputProps {
  normalize?: (value) => any;
  adjustCursorPosition?: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  normalize,
  value,
  onChange,
  adjustCursorPosition = false,
  ...restProps
}) => {
  const effectExecRef = React.useRef(false);

  React.useEffect(() => {
    // fix: 异步初始值没有规整化问题
    if (!effectExecRef.current) {
      if (value && normalize) {
        effectExecRef.current = true;
        const newValue = normalize(value);
        if (newValue !== value) {
          onChange?.(newValue);
        }
      }
    }
  }, [normalize, onChange, value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 数据格式化
      if (normalize) {
        const el = e.target;
        const prevPos = el.selectionEnd;
        const rawValue = el.value;
        const ctrlValue = normalize(rawValue);
        const cursorPos = calculateCursorPosition(prevPos, value as string, rawValue, ctrlValue);
        onChange?.(ctrlValue);
        if (adjustCursorPosition) {
          if (rawValue !== ctrlValue) {
            setTimeout(() => {
              el.selectionStart = el.selectionEnd = cursorPos;
            });
          } else {
            el.selectionStart = el.selectionEnd = cursorPos;
          }
        }
      } else {
        onChange?.(e);
      }
    },
    [adjustCursorPosition, normalize, onChange, value]
  );

  return <Input value={value} onChange={handleChange} {...restProps} />;
};

export default InputWrapper;

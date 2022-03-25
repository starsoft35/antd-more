import * as React from 'react';
import { Input } from 'antd';
import { calculateCursorPosition } from 'util-helpers';
import {
  normalizeBankCard,
  normalizeIdCard,
  normalizeMobile,
  normalizeWhiteSpace
} from '../../_util/normalize';
import type { InputProps } from '../antd.interface';

type InputType = InputProps['type'] | 'bankCard' | 'email' | 'idCard' | 'mobile' | 'userName';

export interface InputWrapperProps extends InputProps {
  type?: InputType;
  disabledWhiteSpace?: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  value,
  onChange,
  type,
  disabledWhiteSpace,
  ...restProps
}) => {
  const realType = React.useMemo(() => {
    if (
      type === 'bankCard' ||
      type === 'mobile' ||
      type === 'idCard' ||
      type === 'email' ||
      type === 'userName'
    ) {
      return 'text';
    }
    return type;
  }, [type]);
  const hasNormalize = React.useMemo(
    () => !!type || disabledWhiteSpace,
    [type, disabledWhiteSpace]
  );

  const normalize = React.useCallback(
    (val: string) => {
      if (!hasNormalize) {
        return val;
      }
      let newVal = val;
      if (type === 'bankCard') {
        newVal = normalizeBankCard(val);
      } else if (type === 'mobile') {
        newVal = normalizeMobile(val);
      } else if (type === 'idCard') {
        newVal = normalizeIdCard(val);
      } else if (type === 'email' || type === 'userName' || disabledWhiteSpace) {
        newVal = normalizeWhiteSpace(val);
      }
      return newVal;
    },
    [disabledWhiteSpace, hasNormalize, type]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 数据格式化
      if (hasNormalize) {
        const el = e.target;
        const prevPos = el.selectionEnd;
        const rawValue = el.value;
        const ctrlValue = normalize(rawValue);

        const calcPosOpts: any = {};
        if (type === 'bankCard') {
          calcPosOpts.type = 'bankCard';
        } else if (type === 'mobile') {
          calcPosOpts.type = 'mobile';
        } else if (type === 'idCard') {
          calcPosOpts.maskReg = /[^\dx]/gi;
          calcPosOpts.placeholderChars = [];
        } else if (type === 'email' || type === 'userName' || disabledWhiteSpace) {
          calcPosOpts.maskReg = /\s/g;
          calcPosOpts.placeholderChars = [];
        }

        const cursorPos = calculateCursorPosition(
          prevPos,
          value as string,
          rawValue,
          ctrlValue,
          calcPosOpts
        );
        onChange?.(ctrlValue as any);

        if (rawValue !== ctrlValue) {
          setTimeout(() => {
            el.selectionStart = el.selectionEnd = cursorPos;
          });
        } else {
          el.selectionStart = el.selectionEnd = cursorPos;
        }
      } else {
        onChange?.(e);
      }
    },
    [disabledWhiteSpace, hasNormalize, normalize, onChange, type, value]
  );

  React.useEffect(() => {
    if (value && hasNormalize) {
      const newValue = normalize(value as string);
      if (newValue !== value) {
        onChange?.(newValue as any);
      }
    }
  }, [hasNormalize, normalize, onChange, value]);

  return <Input value={value} onChange={handleChange} type={realType} {...restProps} />;
};

export default InputWrapper;

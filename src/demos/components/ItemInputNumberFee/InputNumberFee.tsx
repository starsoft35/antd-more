import React, { useEffect, useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { isValidNumber, plus, minus } from 'util-helpers';
import styles from './index.module.less';

export interface InputNumberFeeProps extends InputNumberProps {
  beforeValue: string | number;
}

const InputNumberFee: React.FC<InputNumberFeeProps> = ({
  beforeValue,
  value,
  onChange,
  precision = 4,
  step = 0.1,
  onBlur,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState<string | number | null>();
  const commonProps = {
    precision,
    step,
  };
  const handleChange = (val: string | number | null) => {
    const realVal = val ? val : 0;
    onChange?.(plus(beforeValue, realVal));
  };

  const handleBlur = (e: any) => {
    onBlur?.(e);
    if (inputValue === '' || inputValue === void 0) {
      onChange?.(beforeValue);
    }
  }

  useEffect(() => {
    if (
      isValidNumber(value, true) &&
      isValidNumber(beforeValue, true)
    ) {
      setInputValue(minus(value!, beforeValue));
    }
  }, [value, beforeValue]);

  return (
    <div className={styles.inputNumberFee}>
      <InputNumber disabled value={beforeValue} {...commonProps} />
      <span className={styles.symbol}>+</span>
      <InputNumber
        onChange={handleChange}
        value={inputValue}
        min={0}
        onBlur={handleBlur}
        {...commonProps}
        {...restProps}
      />
      <span className={styles.symbol}>=</span>
      <InputNumber disabled value={value || beforeValue} {...commonProps} />
      <span className={styles.symbol}>%</span>
    </div>
  );
};

export default InputNumberFee;

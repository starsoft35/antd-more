import React, { useEffect, useState } from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { isValidNumber } from 'util-helpers';
import { plus } from 'util-helpers';
import styles from './index.module.less';

export interface InputNumberFeeProps extends InputNumberProps {
  beforeValue: string | number;
  forceRenderInitialValue?: boolean;
}

const InputNumberFee: React.FC<InputNumberFeeProps> = ({
  beforeValue,
  value,
  onChange,
  precision = 4,
  step = 0.1,
  forceRenderInitialValue = false,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState<string | number | null>();
  const commonProps = {
    precision,
    step,
  };
  const handleChange = (val: string | number | null) => {
    // console.log(val);
    setInputValue(val);
    const realVal = val ? val : 0;
    onChange?.(plus(beforeValue, realVal));
  };

  useEffect(() => {
    if (
      forceRenderInitialValue &&
      !inputValue &&
      isValidNumber(value, true) &&
      isValidNumber(beforeValue, true)
    ) {
      setInputValue(Number(value) - Number(beforeValue));
    }
  }, [inputValue, value, forceRenderInitialValue, beforeValue]);

  return (
    <div className={styles.inputNumberFee}>
      <InputNumber disabled value={beforeValue} {...commonProps} />
      <span className={styles.symbol}>+</span>
      <InputNumber
        onChange={handleChange}
        value={inputValue}
        min={0}
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

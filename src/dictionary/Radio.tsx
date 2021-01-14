import React from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/es/radio/interface';
import { EnumData } from './interface';

export interface DictionaryRadioProps extends RadioGroupProps {
  data: EnumData;
  value?: any;
  type?: 'default' | 'button';
}

const DictionaryRadio: React.FC<DictionaryRadioProps> = ({
  data,
  type = 'default',
  ...restProps
}) => {
  const RadioComp = type === 'button' ? Radio.Button : Radio;

  return (
    <Radio.Group {...restProps}>
      {data.map(({ value, name, disabled, key }, index) => (
        <RadioComp value={value} key={key || index.toString()} disabled={disabled}>
          {name}
        </RadioComp>
      ))}
    </Radio.Group>
  );
};

export default DictionaryRadio;

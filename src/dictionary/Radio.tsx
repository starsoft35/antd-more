import React, { useMemo } from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd/lib/radio/interface';
import type { EnumData } from './interface';

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
  const opts = useMemo(() => data.map((item) => ({ label: item.name, ...item })), [data]);
  return <Radio.Group options={opts} optionType={type} {...restProps} />;
};

export default DictionaryRadio;

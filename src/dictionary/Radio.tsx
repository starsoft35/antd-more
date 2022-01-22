import React, { useMemo } from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd/lib/radio/interface';
import type { DictionaryFieldNames, EnumData } from './interface';
import transformFieldNames from '../utils/transformFieldNames';

export interface DictionaryRadioProps extends RadioGroupProps {
  data: EnumData;
  value?: any;
  type?: 'default' | 'button';
  fieldNames?: DictionaryFieldNames;
}

const DictionaryRadio: React.FC<DictionaryRadioProps> = ({
  data,
  type = 'default',
  fieldNames,
  ...restProps
}) => {
  const opts = useMemo(
    () => transformFieldNames(data, fieldNames).map((item) => ({ label: item.name, ...item })),
    [data, fieldNames]
  );
  return <Radio.Group options={opts} optionType={type} {...restProps} />;
};

export default DictionaryRadio;

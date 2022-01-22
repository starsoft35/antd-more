import React, { useMemo } from 'react';
import { Select } from 'antd';
import type { SelectProps, SelectValue } from 'antd/lib/select';
import type { EnumData } from './interface';

export interface DictionarySelectProps extends SelectProps<SelectValue> {
  data: EnumData;
  value?: any;
  excludeValues?: any[];
  all?: boolean;
  allValue?: any;
  /**
   * @deprecated Please use 'allLabel'
   */
  allName?: React.ReactNode;
  allLabel?: React.ReactNode;
}

const DictionarySelect: React.FC<DictionarySelectProps> = ({
  data = [],
  excludeValues = [],
  all = true,
  allValue = '',
  allName,
  allLabel = '全部',
  fieldNames,
  ...restProps
}) => {
  const { label: labelKey, value: valueKey } = useMemo(
    () => ({
      label: 'label',
      value: 'value',
      children: 'children',
      ...fieldNames
    }),
    [fieldNames]
  );
  const opts = useMemo(() => {
    const ret = [];
    if (all) {
      ret.push({ [valueKey]: allValue, [labelKey]: allName || allLabel });
    }
    data.forEach((item) => {
      if (!excludeValues.includes(item[valueKey])) {
        ret.push({
          label: item.name,
          ...item
        });
      }
    });
    return ret;
  }, [all, allLabel, allName, allValue, data, excludeValues, labelKey, valueKey]);

  return <Select placeholder="请选择" options={opts} fieldNames={fieldNames} {...restProps} />;
};

export default DictionarySelect;

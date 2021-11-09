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
  allName?: string;
  allLabel?: string;
}

const DictionarySelect: React.FC<DictionarySelectProps> = ({
  data = [],
  excludeValues = [],
  all = true,
  allValue = '',
  allName,
  allLabel = '全部',
  ...restProps
}) => {
  const opts = useMemo(() => {
    const ret = [];
    if (all) {
      ret.push({ value: allValue, label: allName || allLabel });
    }
    data.forEach((item) => {
      if (!excludeValues.includes(item?.value)) {
        ret.push({
          label: item.name,
          ...item
        });
      }
    });
    return ret;
  }, [all, allLabel, allName, allValue, data, excludeValues]);

  return <Select placeholder="请选择" options={opts} {...restProps} />;
};

export default DictionarySelect;

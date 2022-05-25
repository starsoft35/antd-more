import * as React from 'react';
import type { SelectProps } from '../components/antd.interface';

type Params<T = any[]> = {
  options: T;
  excludeValues?: any[];
  all?: boolean;
  allValue?: any;
  allName?: React.ReactNode;
  fieldNames?: SelectProps['fieldNames'];
};

function useFilterOptions<T extends Record<string, any>[] = any[]>({
  options,
  excludeValues = [],
  all,
  allValue,
  allName,
  fieldNames
}: Params<T>) {
  const { value: valueKey, label: labelKey } = {
    value: 'value',
    label: 'label',
    ...fieldNames
  };

  const result = React.useMemo(() => {
    const ret = [] as T;
    if (all) {
      ret.push({ [valueKey]: allValue, [labelKey]: allName });
    }
    if (Array.isArray(options) && options.length > 0) {
      options.forEach((item) => {
        if (!excludeValues.includes(item?.[valueKey])) {
          ret.push({
            [labelKey]: item?.name,
            ...item
          });
        }
      });
    }
    return ret;
  }, [all, options, valueKey, allValue, labelKey, allName, excludeValues]);
  return result;
}

export default useFilterOptions;

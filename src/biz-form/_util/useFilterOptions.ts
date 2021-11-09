import * as React from 'react';

type Params<T = any[]> = {
  options: T;
  excludeValues?: any[];
  all?: boolean;
  allValue?: any;
  allName?: string;
};

function useFilterOptions<T extends Record<string, any>[] = any[]>({
  options,
  excludeValues = [],
  all,
  allValue,
  allName
}: Params<T>) {
  const result = React.useMemo(() => {
    const ret = [] as T;
    if (all) {
      ret.push({ value: allValue, label: allName });
    }
    if (Array.isArray(options) && options.length > 0) {
      options.forEach((item) => {
        if (!excludeValues.includes(item?.value)) {
          ret.push({
            label: item?.name,
            ...item
          });
        }
      });
    }
    return ret;
  }, [options, excludeValues, all, allValue, allName]);
  return result;
}

export default useFilterOptions;

import * as React from 'react';

function useFilterOptions({ options, excludeValues, all, allValue, allName }) {
  const result = React.useMemo(() => {
    const ret = [...options];
    if (all) {
      ret.unshift({ value: allValue, name: allName });
    }
    if (excludeValues && excludeValues.length > 0) {
      return ret.filter((item) => {
        const { options: itemOpts, ...restOpts } = item;
        if (itemOpts) {
          const subOpts = itemOpts.filter((subItem) => excludeValues.indexOf(subItem.value) === -1);
          // eslint-disable-next-line no-param-reassign
          item.options = subOpts;
          return subOpts.length > 0;
        } else {
          // eslint-disabled-next-line
          const { value } = restOpts;
          return excludeValues.indexOf(value) === -1;
        }
      });
    }
    return ret;
  }, [options, excludeValues, all, allValue, allName]);
  return result;
}

export default useFilterOptions;

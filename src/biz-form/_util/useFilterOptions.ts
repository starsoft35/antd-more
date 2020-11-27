import * as React from 'react';

type Params = {
  options: any;
  excludeValues?: any[];
  all?: boolean;
  allValue?: any;
  allName?: string;
};

function useFilterOptions({ options, excludeValues, all, allValue, allName }: Params) {
  const result = React.useMemo(() => {
    const ret = [];

    if (Array.isArray(options)) {
      options.forEach(({ name, label, title, options: itemOtps, ...rest }) => {
        if (itemOtps) {
          const subOpts = itemOtps.map((item) => {
            return {
              ...item,
              name: item.name || item.label || item.title,
            };
          });
          ret.push({
            ...rest,
            options: subOpts,
          });
        } else {
          ret.push({
            name: name || label || title,
            ...rest,
          });
        }
      });
    } else if (typeof options === 'object') {
      // eslint-disable-next-line
      for (const key in options) {
        if (Object.prototype.hasOwnProperty.call(options, key)) {
          ret.push({
            name: options[key],
            value: key,
          });
        }
      }
    }

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

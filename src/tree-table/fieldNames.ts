import omit from '../utils/omit';
import type { TreeTableDataItem, TreeTableFieldNames } from './type';

function fieldNames(data: any[], options: TreeTableFieldNames = {}) {
  const labelKey = options.label || 'label';
  const valueKey = options.value || 'value';
  const childrenKey = options.children || 'children';

  function recursion(list: any[]) {
    return list.map((item) => {
      const newItem: TreeTableDataItem = {
        ...omit(item, [labelKey, valueKey, childrenKey]),
        label: item[labelKey],
        value: item[valueKey]
      };

      if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
        newItem.children = recursion(item[childrenKey]);
      }
      return newItem;
    });
  }

  return recursion(data);
}

export default fieldNames;

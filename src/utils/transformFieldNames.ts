import omit from './omit';

export type FieldNames = {
  label?: string;
  value?: string;
  [key: string]: any;
};

export type FieldNamesWithChildren = FieldNames & {
  children?: string;
};

function transformFieldNames(data: any[], fieldNames?: FieldNames): Required<FieldNames>[];
function transformFieldNames(
  data: any[],
  fieldNames?: FieldNamesWithChildren
): Required<FieldNamesWithChildren>[];
function transformFieldNames(data: any[], fieldNames: FieldNamesWithChildren = {}) {
  const {
    label: labelKey,
    value: valueKey,
    children: childrenKey
  } = {
    label: 'label',
    value: 'value',
    children: 'children',
    ...fieldNames
  };

  function recursion(list: any[]) {
    return list.map((item) => {
      const newItem = {
        ...omit(item, [labelKey, valueKey, childrenKey]),
        label: item[labelKey],
        value: item[valueKey]
      };

      if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
        // @ts-ignore
        newItem.children = recursion(item[childrenKey]);
      }
      return newItem;
    });
  }

  return recursion(data);
}

export default transformFieldNames;

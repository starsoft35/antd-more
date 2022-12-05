import * as React from 'react';
import type { TableProps } from 'antd';
import { Checkbox, Table } from 'antd';
import { useControllableValue, useUpdate } from 'rc-hooks';
import omit from '../utils/omit';
import uniqueArray from '../utils/uniqueArray';
import type { ValueType, TreeTableDataItem, TreeTableData, TreeTableFieldNames } from './type';

// 兼容 antd v4
import 'antd/es/checkbox/style';
import 'antd/es/table/style';

export type { TreeTableDataItem, TreeTableData, TreeTableFieldNames };

function hasLength(childs: any[]) {
  return Array.isArray(childs) && childs.length > 0;
}

// 计算树型数据层级
const flatTree = (data: TreeTableData, childrenKey = 'children') => {
  const ret = [];

  function recursion(childs: TreeTableData, prevArray: TreeTableData = []) {
    childs.forEach((item) => {
      const newValue = [...prevArray, omit(item, [childrenKey]) as any];
      if (hasLength(item[childrenKey])) {
        recursion(item[childrenKey], newValue);
      } else {
        ret.push(newValue);
      }
    });
  }

  recursion(data);
  return ret;
};

const compactTree = (data: TreeTableData, fieldNames: TreeTableFieldNames) => {
  const { value: valueKey, children: childrenKey } = fieldNames;
  const ret: (Omit<TreeTableDataItem, 'children'> & {
    children?: Omit<TreeTableDataItem, 'children'>[];
    parent: ValueType;
  })[] = [];

  function recursion(list: TreeTableData, parent: TreeTableDataItem = null) {
    list.forEach((item) => {
      ret.push({
        ...item,
        parent: parent?.[valueKey] || null,
        [childrenKey]:
          item?.[childrenKey]?.map(
            (item) => omit(item, [childrenKey]) as Omit<TreeTableDataItem, 'children'>
          ) || null
      });

      if (hasLength(item[childrenKey])) {
        recursion(item[childrenKey], omit(item, [childrenKey]));
      }
    });
  }

  recursion(data);

  return ret;
};

// 处理合并行数
function processRowSpan(data: object) {
  const cloneData = JSON.parse(JSON.stringify(data));
  const childNodes = [];

  // 记录已加过的值
  const recordAddChildNodes = new Set();

  for (const prop in cloneData) {
    cloneData[prop].name = prop;
    if (!cloneData[prop].hasChildren) {
      childNodes.push(cloneData[prop]);
    }
  }

  function recursion(dataItem: any) {
    if (dataItem.parent && cloneData[dataItem.parent]) {
      cloneData[dataItem.parent].len +=
        dataItem.len - (recordAddChildNodes.has(dataItem.name) ? cloneData[dataItem.name].len : 1);

      recordAddChildNodes.add(dataItem.name);

      if (cloneData[dataItem.parent].parent) {
        recursion(cloneData[dataItem.parent]);
      }
    }
  }

  childNodes.forEach((item) => {
    recursion(item);
  });

  return cloneData;
}

function transformTreeToList(
  data: TreeTableData,
  lastColumnMerged = false,
  fieldNames: TreeTableFieldNames
) {
  const { value: valueKey, children: childrenKey } = fieldNames;

  // 先处理一次扁平数据得到最大层级
  const flatData = flatTree(data, childrenKey);

  const lastColumnIndex = Math.max(...flatData.map((item) => item.length - 1));

  const list = [];

  // 合并行数缓存
  let rowSpanCache = {};

  function recursion(childs: TreeTableData, prevData = {}, parentValue = null, index = 0) {
    childs.forEach((item) => {
      const newValue: any = {
        ...prevData,
        [`col${index}`]: {
          [valueKey]: item[valueKey],
          parent: parentValue,
          data: [omit(item, [childrenKey])]
        }
      };

      if (!rowSpanCache[item[valueKey]]) {
        rowSpanCache[item[valueKey]] = {
          len: item[childrenKey]?.length || 1,
          parent: parentValue
        };
      }

      if (!hasLength(item[childrenKey])) {
        list.push({
          ...newValue,
          key: `row_${parentValue}_${item[valueKey]}`
        });
        rowSpanCache[item[valueKey]].hasChildren = false;
      } else if (lastColumnMerged && lastColumnIndex - 1 === index) {
        rowSpanCache[item[valueKey]].len = 1;
        rowSpanCache[item[valueKey]].hasChildren = false;

        list.push({
          ...newValue,
          key: `row_${parentValue}_${item[valueKey]}`,
          [`col${index + 1}`]: {
            [valueKey]: item[valueKey],
            parent: parentValue,
            data: item[childrenKey]
          }
        });
      } else {
        rowSpanCache[item[valueKey]].hasChildren = true;
        recursion(item[childrenKey], newValue, item[valueKey], index + 1);
      }
    });
  }

  recursion(data);

  rowSpanCache = processRowSpan(rowSpanCache);

  // console.log(rowSpanCache);

  // 记录第一行需要合并的行数
  const recordRowSpanValues = [];

  // 列数据
  const columns = [];

  // 防止不同层级数据错误
  for (let i = 0; i <= lastColumnIndex; i++) {
    columns.push({
      dataIndex: `col${i}`
    });

    for (let j = 0; j < list.length; j++) {
      if (!list[j][`col${i}`]) {
        list[j][`col${i}`] = {
          [valueKey]: null,
          data: [],
          rowSpan: 1
        };
      } else {
        const currValue = list[j][`col${i}`][valueKey];
        let currRowSpan = 1;

        if (!recordRowSpanValues.includes(currValue)) {
          recordRowSpanValues.push(currValue);
          currRowSpan = rowSpanCache[currValue].len;
        } else if (rowSpanCache[currValue].len > 1) {
          currRowSpan = 0;
        }
        list[j][`col${i}`] = {
          ...list[j][`col${i}`],
          rowSpan: currRowSpan
        };
      }
    }
  }

  return { columns, list };
}

// 查找当前项的子项
function findChildrenByValue(
  data: TreeTableData,
  value: ValueType,
  fieldNames: TreeTableFieldNames
) {
  const { value: valueKey, children: childrenKey } = fieldNames;
  let child: TreeTableData;

  function recursion(list: TreeTableData) {
    list.some((item) => {
      if (child) {
        return true;
      }

      if (item[valueKey] === value) {
        child = item[childrenKey] || [];
      } else if (hasLength(item[childrenKey])) {
        recursion(item[childrenKey]);
      }

      return !!child;
    });
  }
  recursion(data);
  return child;
}

// 查找子项的value
function getChildrenValue(
  data: TreeTableData,
  value: ValueType,
  deep = false,
  fieldNames: TreeTableFieldNames
) {
  const { children: childrenKey } = fieldNames;
  const ret: Omit<TreeTableDataItem, 'children'>[] = [];
  const currChild = findChildrenByValue(data, value, fieldNames);

  function recursion(list: TreeTableData) {
    list.forEach((item) => {
      ret.push(omit(item, [childrenKey]) as Omit<TreeTableDataItem, 'children'>);
      if (hasLength(item[childrenKey])) {
        recursion(item[childrenKey]);
      }
    });
  }

  if (deep) {
    recursion(currChild);
  } else {
    currChild.forEach((item) => {
      ret.push(omit(item, [childrenKey]) as Omit<TreeTableDataItem, 'children'>);
    });
  }

  return ret;
}

export interface TreeTableProps<RecordType = any>
  extends Omit<
    TableProps<RecordType>,
    'columns' | 'dataSource' | 'pagination' | 'rowKey' | 'onChange'
  > {
  columnTitles: React.ReactNode[];
  lastColumnMerged?: boolean;
  halfToChecked?: boolean;
  treeData: TreeTableData;
  value?: ValueType[];
  onChange?: (values: ValueType[]) => void;
  labelRender?: (nodeData: TreeTableDataItem) => React.ReactNode;
  fieldNames?: TreeTableFieldNames;
}

const TreeTable: React.FC<TreeTableProps> = (props) => {
  const {
    columnTitles = [],
    treeData = [],
    lastColumnMerged = false,
    halfToChecked = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: outValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    labelRender,
    fieldNames: outFieldNames,
    ...restProps
  } = props;
  const [checkList, setCheckList] = useControllableValue<ValueType[]>({
    defaultValue: [],
    ...props
  });
  const fieldNames = React.useMemo(
    () => ({
      label: 'label',
      value: 'value',
      children: 'children',
      ...outFieldNames
    }),
    [outFieldNames]
  );

  const { value: valueKey, label: labelKey, children: childrenKey } = fieldNames;

  const extraCheckListRef = React.useRef<ValueType[]>([]);
  const indeterminateListRef = React.useRef<ValueType[]>([]);
  const update = useUpdate();
  const { columns, list } = React.useMemo(
    () => transformTreeToList(treeData, lastColumnMerged, fieldNames),
    [lastColumnMerged, treeData, fieldNames]
  );

  const compactData = React.useMemo(
    () => compactTree(treeData, fieldNames),
    [treeData, fieldNames]
  );

  const processParentChecked = React.useCallback(
    (value?: ValueType, checks?: ValueType[], indeterminates?: ValueType[]) => {
      const newChecks = new Set(checks || []);
      const newIndetermanites = new Set(indeterminates || []);

      // 递归处理父级勾选/半勾选
      function recursion(val: ValueType) {
        const currItem = compactData.find((item) => item[valueKey] === val);
        if (currItem) {
          let childHasChecked = false;
          let childHasIndetermanite = false;
          let childAllChecked = true;

          currItem[childrenKey]?.forEach((item) => {
            if (!item.disabled) {
              if (newChecks.has(item[valueKey])) {
                childHasChecked = true;
              } else {
                childAllChecked = false;
                if (newIndetermanites.has(item[valueKey])) {
                  childHasIndetermanite = true;
                }
              }
            }
          });

          if (childAllChecked) {
            newChecks.add(val);
            newIndetermanites.delete(val);
          } else {
            newChecks.delete(val);
            if (childHasChecked || childHasIndetermanite) {
              (halfToChecked ? newChecks : newIndetermanites).add(val);
              (!halfToChecked ? newChecks : newIndetermanites).delete(val);
            } else {
              (halfToChecked ? newChecks : newIndetermanites).delete(val);
            }
          }

          if (currItem.parent) {
            recursion(currItem.parent);
          }
        }
      }

      const currItem = compactData.find((item) => item[valueKey] === value);
      if (currItem?.parent) {
        recursion(currItem.parent);
      }

      return {
        checks: Array.from(newChecks),
        indeterminates: Array.from(newIndetermanites)
      };
    },
    [childrenKey, compactData, halfToChecked, valueKey]
  );

  // TODO: 是否可通过模型处理
  const handleChange = React.useCallback(
    (dataItem) => {
      const newIndetermaniteList = new Set(indeterminateListRef.current);
      const newCheckList = new Set(checkList);

      const childValues = getChildrenValue(treeData, dataItem[valueKey], true, fieldNames);

      // 已选中
      if (checkList.includes(dataItem[valueKey])) {
        checkList.forEach((item) => {
          if (
            item === dataItem[valueKey] ||
            childValues.find((childItem) => childItem[valueKey] === item)
          ) {
            newCheckList.delete(item);
          }
        });
      } else {
        newCheckList.add(dataItem[valueKey]);
        newIndetermaniteList.delete(dataItem[valueKey]);
        childValues.forEach((item) => {
          if (!item.disabled) {
            newCheckList.add(item[valueKey]);
            newIndetermaniteList.delete(item[valueKey]);
          }
        });
      }

      // 处理父级勾选/半勾选
      const { checks, indeterminates } = processParentChecked(
        dataItem[valueKey],
        Array.from(newCheckList),
        Array.from(newIndetermaniteList)
      );

      // console.log(checks);
      indeterminateListRef.current = indeterminates;
      setCheckList(checks);
    },
    [checkList, fieldNames, processParentChecked, setCheckList, treeData, valueKey]
  );

  // TODO: 优化计算，通过建模每一层级只关注自身变化
  React.useEffect(() => {
    let cacheChecks = [];
    let cacheIndeterminates = [];

    checkList.map((item) => {
      const { checks, indeterminates } = processParentChecked(
        item,
        [...checkList, ...extraCheckListRef.current],
        indeterminateListRef.current
      );
      cacheChecks.push(...checks);
      cacheIndeterminates.push(...indeterminates);
    }, []);

    cacheChecks = uniqueArray(cacheChecks);
    cacheIndeterminates = uniqueArray(cacheIndeterminates);

    if (halfToChecked) {
      extraCheckListRef.current = cacheChecks.filter((item) => !checkList.includes(item));
      indeterminateListRef.current = cacheIndeterminates.filter(
        (item) => !checkList.includes(item) && !extraCheckListRef.current.includes(item)
      );
    } else {
      indeterminateListRef.current = cacheIndeterminates.filter(
        (item) => !checkList.includes(item)
      );
      extraCheckListRef.current = cacheChecks.filter(
        (item) => !checkList.includes(item) && !indeterminateListRef.current.includes(item)
      );
    }

    update();
  }, [checkList, processParentChecked, update, halfToChecked]);

  const realColumns = React.useMemo(() => {
    return columns.map((item, i) => ({
      ...item,
      title: columnTitles[i] || '-',
      // ref: https://github.com/ant-design/ant-design/issues/33093
      onCell: (record) => {
        const col = record[item.dataIndex];
        return {
          rowSpan: col.rowSpan
        };
      },
      render: (_, record) => {
        const col = record[item.dataIndex];

        return col[valueKey]
          ? col.data.map((subItem) => (
            <Checkbox
              checked={
                checkList.includes(subItem[valueKey]) ||
                extraCheckListRef.current.includes(subItem[valueKey])
              }
              indeterminate={indeterminateListRef.current.includes(subItem[valueKey])}
              onChange={() => {
                handleChange(subItem);
              }}
              disabled={subItem.disabled}
              key={subItem[valueKey]}
            >
              {labelRender ? labelRender(subItem) : subItem[labelKey] || subItem[valueKey]}
            </Checkbox>
          ))
          : '-';
      }
    }));
  }, [checkList, columnTitles, columns, handleChange, labelKey, labelRender, valueKey]);

  return (
    <Table columns={realColumns} dataSource={list} pagination={false} bordered {...restProps} />
  );
};

export default TreeTable;

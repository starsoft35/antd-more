import * as React from 'react';
import { Checkbox, Table, TableProps } from 'antd';
import { useControllableValue, useUpdate } from 'rc-hooks';
import omit from '../utils/omit';
import uniqueArray from '../utils/uniqueArray';

type ValueType = string | number;

export type TreeTableDataItem = {
  title?: React.ReactNode;
  label?: React.ReactNode;
  value: ValueType;
  disabled?: boolean;
  children?: TreeTableDataItem[];
};

export type TreeTableData = TreeTableDataItem[];

// 计算树型数据层级
const flatTree = (data: TreeTableData, fieldName = 'children') => {
  const ret = [];

  // 递归处理
  function recursion(childs: TreeTableData, prevArray: TreeTableData = []) {
    childs.forEach((item) => {
      const newValue = [...prevArray, omit(item, [fieldName]) as any];
      if (!Array.isArray(item.children) || item.children.length <= 0) {
        ret.push(newValue);
      } else {
        recursion(item.children, newValue);
      }
    });
  }

  recursion(data);
  return ret;
};

const compactTree = (data: TreeTableData) => {
  const ret: (Omit<TreeTableDataItem, 'children'> & {
    children: Omit<TreeTableDataItem, 'children'>[];
    parent: ValueType;
  })[] = [];

  function recursion(list: TreeTableData, parent: TreeTableDataItem = null) {
    list.forEach(({ children, ...rest }) => {
      ret.push({
        ...rest,
        parent: parent?.value || null,
        children:
          children?.map(
            (item) => omit(item, ['children']) as Omit<TreeTableDataItem, 'children'>
          ) || null
      });

      if (Array.isArray(children) && children.length > 0) {
        recursion(children, rest);
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

function transformTreeToList(data: TreeTableData, lastColumnMerged = false) {
  // 先处理一次扁平数据得到最大层级
  const flatData = flatTree(data);

  const lastColumnIndex = Math.max(...flatData.map((item) => item.length - 1));

  const list = [];

  // 合并行数缓存
  let rowSpanCache = {};

  function recursion(childs: TreeTableData, prevData = {}, parentValue = null, index = 0) {
    childs.forEach((item) => {
      const newValue: any = {
        ...prevData,
        [`col${index}`]: {
          value: item.value,
          parent: parentValue,
          data: [omit(item, ['children'])]
        }
      };

      if (!rowSpanCache[item.value]) {
        rowSpanCache[item.value] = {
          len: item.children?.length || 1,
          parent: parentValue
        };
      }

      if (!Array.isArray(item.children) || item.children.length <= 0) {
        list.push({
          ...newValue,
          key: `row_${parentValue}_${item.value}`
        });
        rowSpanCache[item.value].hasChildren = false;
      } else if (lastColumnMerged && lastColumnIndex - 1 === index) {
        rowSpanCache[item.value].len = 1;
        rowSpanCache[item.value].hasChildren = false;

        list.push({
          ...newValue,
          key: `row_${parentValue}_${item.value}`,
          [`col${index + 1}`]: {
            value: item.value,
            parent: parentValue,
            data: item.children
          }
        });
      } else {
        rowSpanCache[item.value].hasChildren = true;
        recursion(item.children, newValue, item.value, index + 1);
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
          value: null,
          data: [],
          rowSpan: 1
        };
      } else {
        const currValue = list[j][`col${i}`].value;
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
function findChildrenByValue(data: TreeTableData, value: ValueType) {
  let child: TreeTableData;

  function recursion(list: TreeTableData) {
    list.some((item) => {
      if (child) {
        return true;
      }

      if (item.value === value) {
        child = item.children || [];
      } else if (Array.isArray(item.children) && item.children.length > 0) {
        recursion(item.children);
      }

      return !!child;
    });
  }
  recursion(data);
  return child;
}

// 查找子项的value
function getChildrenValue(data: TreeTableData, value: ValueType, deep = false) {
  const ret: Omit<TreeTableDataItem, 'children'>[] = [];
  const currChild = findChildrenByValue(data, value);

  function recursion(list: TreeTableData) {
    list.forEach((item) => {
      ret.push(omit(item, ['children']) as Omit<TreeTableDataItem, 'children'>);
      if (Array.isArray(item.children) && item.children.length > 0) {
        recursion(item.children);
      }
    });
  }

  if (deep) {
    recursion(currChild);
  } else {
    currChild.forEach((item) => {
      ret.push(omit(item, ['children']) as Omit<TreeTableDataItem, 'children'>);
    });
  }

  return ret;
}

interface TreeTableProps<RecordType = any>
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
}

const TreeTable: React.FunctionComponent<TreeTableProps> = (props) => {
  const {
    columnTitles = [],
    treeData = [],
    lastColumnMerged = false,
    halfToChecked = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: outValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    ...restProps
  } = props;
  const [checkList, setCheckList] = useControllableValue<ValueType[]>({
    defaultValue: [],
    ...props
  });
  const extraCheckListRef = React.useRef<ValueType[]>([]);
  const indeterminateListRef = React.useRef<ValueType[]>([]);
  const update = useUpdate();
  const { columns, list } = React.useMemo(
    () => transformTreeToList(treeData, lastColumnMerged),
    [lastColumnMerged, treeData]
  );

  const compactData = React.useMemo(() => compactTree(treeData), [treeData]);

  const processParentChecked = React.useCallback(
    (value?: ValueType, checks?: ValueType[], indeterminates?: ValueType[]) => {
      const newChecks = new Set(checks || []);
      const newIndetermanites = new Set(indeterminates || []);

      // 递归处理父级勾选/半勾选
      function recursion(val: ValueType) {
        const currItem = compactData.find((item) => item.value === val);
        if (currItem) {
          let childHasChecked = false;
          let childHasIndetermanite = false;
          let childAllChecked = true;

          currItem.children?.forEach((item) => {
            if (!item.disabled) {
              if (newChecks.has(item.value)) {
                childHasChecked = true;
              } else {
                childAllChecked = false;
                if (newIndetermanites.has(item.value)) {
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

      const currItem = compactData.find((item) => item.value === value);
      if (currItem.parent) {
        recursion(currItem.parent);
      }

      return {
        checks: Array.from(newChecks),
        indeterminates: Array.from(newIndetermanites)
      };
    },
    [compactData, halfToChecked]
  );

  const handleChange = React.useCallback(
    (dataItem) => {
      const newIndetermaniteList = new Set(indeterminateListRef.current);
      const newCheckList = new Set(checkList);

      const childValues = getChildrenValue(treeData, dataItem.value, true);

      // 已选中
      if (checkList.includes(dataItem.value)) {
        checkList.forEach((item) => {
          if (
            item === dataItem.value ||
            childValues.find((childItem) => childItem.value === item)
          ) {
            newCheckList.delete(item);
          }
        });
      } else {
        newCheckList.add(dataItem.value);
        newIndetermaniteList.delete(dataItem.value);
        childValues.forEach((item) => {
          if (!item.disabled) {
            newCheckList.add(item.value);
            newIndetermaniteList.delete(item.value);
          }
        });
      }

      // 处理父级勾选/半勾选
      const { checks, indeterminates } = processParentChecked(
        dataItem.value,
        Array.from(newCheckList),
        Array.from(newIndetermaniteList)
      );

      // console.log(checks);
      indeterminateListRef.current = indeterminates;
      setCheckList(checks);
    },
    [checkList, processParentChecked, setCheckList, treeData]
  );

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
      render: (_, record) => {
        const col = record[item.dataIndex];

        const obj = {
          children: col.value
            ? col.data.map((subItem) => (
                <Checkbox
                  checked={
                    checkList.includes(subItem.value) ||
                    extraCheckListRef.current.includes(subItem.value)
                  }
                  indeterminate={indeterminateListRef.current.includes(subItem.value)}
                  onChange={() => {
                    handleChange(subItem);
                  }}
                  disabled={subItem.disabled}
                  key={subItem.value}
                >
                  {subItem.title || subItem.label}
                </Checkbox>
              ))
            : '-',
          props: {
            rowSpan: col.rowSpan
          }
        };
        return obj;
      }
    }));
  }, [checkList, columnTitles, columns, handleChange]);

  return (
    <Table columns={realColumns} dataSource={list} pagination={false} bordered {...restProps} />
  );
};

export default TreeTable;

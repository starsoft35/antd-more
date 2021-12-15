/**
 * title: 自定义节点 fieldNames
 * desc: 通过 `fieldNames` 将 label、value、children 分别标识为 name、code、childs 。也支持单独设置某个字段。
 */
import * as React from 'react';
import { TreeTable } from 'antd-more';
import jsonData from './data-fieldNames';

const Demo = () => {
  const [checks, setChecks] = React.useState([]);

  const onChange = (value) => {
    console.log(value);
    setChecks(value);
  };

  return (
    <TreeTable
      treeData={jsonData}
      columnTitles={['一级菜单', '二级菜单']}
      value={checks}
      onChange={onChange}
      fieldNames={{
        label: 'name',
        value: 'code',
        children: 'childs'
      }}
    />
  );
};

export default Demo;

import * as React from 'react';
import { Switch, Space } from 'antd';
import { TreeTable } from 'antd-more';
import jsonData from './data1';

const Demo = () => {
  const [lastColumnMerged, setLastColumnMerged] = React.useState(true);
  const [halfToChecked, setHalfToChecked] = React.useState(false);

  const [checks, setChecks] = React.useState([
    'HOME',
    'MERCHANT_LIST',
    'MERCHANT_QUERY',
    'MERCHANT_DETAIL',
    'MERCHANT_ADD',
    'MERCHANT'
  ]);

  const onChange = (value) => {
    console.log(value);
    setChecks(value);
  };

  return (
    <>
      <Space>
        <div>
          lastColumnMerged: <Switch checked={lastColumnMerged} onChange={setLastColumnMerged} />
        </div>
        <div>
          halfToChecked: <Switch checked={halfToChecked} onChange={setHalfToChecked} />
        </div>
      </Space>
      <br />
      <br />
      <TreeTable
        treeData={jsonData}
        columnTitles={['一级菜单', '二级菜单', '操作']}
        value={checks}
        onChange={onChange}
        lastColumnMerged={lastColumnMerged}
        halfToChecked={halfToChecked}
      />
    </>
  );
};

export default Demo;

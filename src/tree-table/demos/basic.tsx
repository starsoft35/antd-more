import * as React from 'react';
import { Switch, Space, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
          lastColumnMerged{' '}
          <Tooltip title="最后一列合并展示">
            <ExclamationCircleOutlined />
          </Tooltip>{' '}
          : <Switch checked={lastColumnMerged} onChange={setLastColumnMerged} />
        </div>
        <div>
          halfToChecked{' '}
          <Tooltip title="半勾选转换为勾选，会影响onChange参数值">
            <ExclamationCircleOutlined />
          </Tooltip>{' '}
          : <Switch checked={halfToChecked} onChange={setHalfToChecked} />
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

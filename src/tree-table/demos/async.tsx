import * as React from 'react';
import { TreeTable } from 'antd-more';
import jsonData from './data1';

function waitTime(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const Demo = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [checks, setChecks] = React.useState(['MERCHANT_ADD', 'MERCHANT_DETAIL']);

  const onChange = (value) => {
    console.log(value);
    setChecks(value);
  };

  React.useEffect(() => {
    const getData = async () => {
      await waitTime();
      setData(jsonData);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <TreeTable
      treeData={data}
      columnTitles={['一级菜单', '二级菜单', '操作']}
      lastColumnMerged
      value={checks}
      onChange={onChange}
      loading={loading}
    />
  );
};

export default Demo;

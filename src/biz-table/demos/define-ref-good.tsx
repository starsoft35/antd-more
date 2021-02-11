import * as React from 'react';
import { BizTable } from 'antd-more';
import { ActionType, BizTableProps, BizTableRequest } from 'antd-more/es/biz-table';

const mockData = [
  { name: '' },
  { name: '张三' },
  { name: '李四' },
];

const request: BizTableRequest = (params) => {
  // const { current, pageSize, ...restParams } = params;
  return new Promise(resolve => {
    // console.log(restParams);
    setTimeout(() => resolve({ data: mockData }), 2000);
  })
}

// 部分场景下外部封装BizTable中使用操作，推荐
const DefineTable: React.FC<BizTableProps> = ({ actionRef, ...restProps }) => {
  const innerActionRef = React.useRef<ActionType | undefined>();

  React.useImperativeHandle(actionRef, () => innerActionRef.current);

  const columns = React.useMemo(() => ([
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      title: '名字',
      dataIndex: 'name',
      valueType: 'text'
    },
    {
      title: '操作',
      render: () => (
        <a onClick={innerActionRef.current.reload}>刷新</a>
      )
    }
  ]), []);

  return (
    <BizTable
      columns={columns}
      request={request}
      pagination={false}
      rowKey="name"
      actionRef={innerActionRef}
      {...restProps}
    />
  );
};

// 页面
const Demo: React.FC = () => {
  const actionRef = React.useRef<ActionType | undefined>();

  // 正常使用 actionRef
  // React.useEffect(() => {
  //   actionRef.current.reload();
  // }, []);

  return (
    <DefineTable
      actionRef={actionRef}
    />
  );
}

export default Demo;
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

// 外部封装的BizTable 含 ref ，不推荐
export interface DefineTableProps extends BizTableProps {
  ref?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);
}

const DefineTable: React.FC<DefineTableProps> = React.forwardRef((props, ref) => {
  const innerActionRef = React.useRef<ActionType | undefined>();

  React.useImperativeHandle(ref, () => innerActionRef.current);

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
      {...props}
    />
  );
});

// 页面
const Demo: React.FC = () => {
  const actionRef = React.useRef<ActionType | undefined>();

  // 额外的ref使用，不推荐
  // React.useEffect(() => {
  //   actionRef.current.reload();
  // }, []);

  return (
    <DefineTable
      ref={actionRef}
    />
  );
}

export default Demo;
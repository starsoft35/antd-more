import * as React from 'react';
import { Table } from 'antd';

type DataType = {
  name: string;
};

const mockData = [
  { name: '' },
  { name: '张三' },
  { name: '李四' },
];

const request = (params) => {
  // const { current, pageSize, ...restParams } = params;
  return new Promise(resolve => {
    // console.log(restParams);
    setTimeout(() => resolve({ data: mockData }), 2000);
  })
}

const Demo: React.FC = () => {
  return (
    <Table<DataType>
      dataSource={mockData}
      columns={[
        {
          title: "序号",
          render: (_, r, i) => i.toString(),
          filters: [
            {
              text: "1",
              value: "1"
            }
          ]
        },
        {
          dataIndex: "name",
          title: "名字",
          sorter: true
        }
      ]}
      rowKey="name"
      onChange={(page, filters, sorter, extra) => {
        console.log(page, filters, sorter, extra);
        if (!Array.isArray(sorter)) {
          console.log(sorter.order);
        }
      }}
    />
  );
}

export default Demo;
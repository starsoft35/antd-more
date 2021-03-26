import * as React from 'react';
import { Button } from 'antd';
import { BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType, ActionType } from 'antd-more/es/biz-table';

import Mock from 'mockjs';
import UpdateModal from './components/UpdateModal';

type DataItem = {
  id: number;
  name: string;
  resume: string;
}

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const getDataApi = async ({ pageSize, pageNum }) => {
  await waitTime();

  return {
    data: Mock.mock({
      // [`list|${pageSize}`]: [{
      'list|2': [{
        'id|+1': pageSize * (pageNum - 1),
        name: '@cname',
        resume: '@cparagraph'
      }]
    }).list,
    total: 100
  }
};

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [editableRecord, setEditablRecord] = React.useState<DataItem>();

  const actionRef = React.useRef<ActionType>();
  const columns: BizColumnType<DataItem> = React.useMemo(() => ([
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100
    },
    {
      title: '简介',
      dataIndex: 'resume'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <a
          onClick={() => {
            setEditablRecord(record);
            setVisible(true);
          }}
        >
          修改
        </a>
      )
    },
  ]), []);
  const request: BizTableRequest<DataItem> = ({ pageSize, current }) => {
    return getDataApi({
      pageSize,
      pageNum: current
    });
  }

  return (
    <>
      <BizTable<DataItem>
        request={request}
        columns={columns}
        rowKey="id"
        actionRef={actionRef}
        scroll={{
          x: 400
        }}
        toolbar={
          <Button
            type="primary"
            onClick={() => {
              setEditablRecord(undefined);
              setVisible(true)
            }}
          >
            新增
          </Button>
        }
        nowrap={false}
      />
      <UpdateModal
        visible={visible}
        onVisibleChange={setVisible}
        data={editableRecord}
        onChange={() => {
          // 数据变动后，重新加载数据
          actionRef.current?.reload();
        }}
      />
    </>
  );
}

export default Demo;
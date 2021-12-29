import * as React from 'react';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import { BizTable } from 'antd-more';
import { getApplyList } from './service';

type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
};

const columns: BizTableColumnType<DataItem> = [
  {
    dataIndex: 'applyCode',
    title: '申请编号'
  },
  {
    dataIndex: 'createTime',
    title: '提交时间'
  },
  {
    dataIndex: 'applicantName',
    title: '经办员'
  },
  {
    dataIndex: 'approveTime',
    title: '审核时间',
    sorter: true
  },
  {
    dataIndex: 'approverName',
    title: '审核员'
  }
];

const Demo = () => {
  const handleRequest: BizTableRequest<DataItem> = React.useCallback(
    (params, filters, sorter, extra): Promise<{ data: any[]; total: number }> => {
      const { pageSize, current, ...restParams } = params;
      console.log(params, filters, sorter, extra);

      return getApplyList({
        page: {
          pageSize,
          pageNum: current
        },
        data: restParams
      }).then((res: any) => {
        return {
          total: res.pageInfo.total,
          ...res
        };
      });
    },
    []
  );

  return (
    <BizTable<DataItem>
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
      pagination={{
        pageSize: 5
      }}
    />
  );
};

export default Demo;

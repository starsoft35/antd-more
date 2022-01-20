import * as React from 'react';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import { BizForm, BizTable } from 'antd-more';
import { getApplyList } from './service';
import type { DataItem } from './service';

const columns: BizTableColumnType<DataItem> = [
  {
    dataIndex: 'applyCode',
    title: '申请编号',
    tooltip: '提示文字'
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
    tooltip: '提示文字',
    sorter: true
  },
  {
    dataIndex: 'approverName',
    title: '审核员'
  }
];

const Demo = () => {
  const formItems = [
    <BizForm.ItemInput key="applyCode" name="applyCode" label="申请编号" />,
    <BizForm.ItemDate key="createTime" name="createTime" label="提交时间" />,
    <BizForm.ItemInput key="approveName" name="approverName" label="审核员" />,
    <BizForm.ItemDateRange
      key="approveTime"
      name="approveTime"
      names={['startTime', 'endTime']}
      showTime
      label="审核时间"
      colProps={{ lg: 12, md: 24 }}
    />
  ];

  const handleRequest: BizTableRequest<DataItem> = (params, filters, sorter, extra) => {
    const { pageSize, current, ...restParams } = params;
    console.log(params, filters, sorter, extra);

    return getApplyList({
      page: {
        pageSize,
        pageNum: current
      },
      data: restParams
    }).then((res) => {
      return {
        total: res.pageInfo.total,
        data: res.data
      };
    });
  };

  return (
    <BizTable<DataItem>
      formItems={formItems}
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
    />
  );
};

export default Demo;

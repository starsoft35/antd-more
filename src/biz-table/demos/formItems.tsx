import * as React from 'react';
import { BizForm, BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType } from 'antd-more/lib/biz-table';
import { getApplyList } from './service';

const columns: BizColumnType = [
  {
    dataIndex: "applyCode",
    title: "申请编号",
    tooltip: "提示文字"
  },
  {
    dataIndex: "createTime",
    title: "提交时间"
  },
  {
    dataIndex: "applicantName",
    title: "经办员"
  },
  {
    dataIndex: "approveTime",
    title: "审核时间",
    tooltip: "提示文字",
    sorter: true
  },
  {
    dataIndex: "approverName",
    title: "审核员"
  }
];

const Demo: React.FC = () => {
  const formItems = [
    <BizForm.ItemInput name="applyCode" label="申请编号" />,
    <BizForm.ItemDate name="createTime" label="提交时间" />,
    <BizForm.ItemInput name="approverName" label="审核员" />,
    <BizForm.ItemDateRange name="approveTime" names={["startTime", "endTime"]} showTime label="审核时间" colProps={{ lg: 12, md: 24 }} />
  ];

  const handleRequest: BizTableRequest = React.useCallback((params, filters, sorter, extra) => {
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
      }
    });
  }, []);

  return (
    <BizTable
      formItems={formItems}
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
    />
  );
}

export default Demo;
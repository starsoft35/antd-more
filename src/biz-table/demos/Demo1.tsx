import * as React from 'react';
import { BizForm, BizTable } from 'antd-more';
import { Request, BizColumnType } from 'antd-more/es/biz-table';
import moment from 'moment';
import Mock from 'mockjs';

const applyList = ({ page: { pageNum, pageSize }, data = {} }) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      "applyCode|+1": (pageNum - 1) * pageSize + 1,
      applicantName: '@cname',
      approverName: '@cname',
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      approveTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      "approveResult|1-3": 1
    }],
    pageInfo: {
      total: 50,
      pages: 10
    },
  })
);
function getApplyList(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(applyList(params));
    }, 1000);
  })
}
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
    <BizForm.ItemDateRange name="approveTime" names={["startTime", "endTime"]} label="审核时间" />
  ];

  const handleRequest: Request = React.useCallback((params, filters, sorter, extra) => {
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
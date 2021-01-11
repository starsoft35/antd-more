import * as React from 'react';
import { BizTable } from 'antd-more';
import { BizColumnType } from 'antd-more/es/biz-table';
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
const columns:BizColumnType = [
  {
    dataIndex: "applyCode",
    title: "申请编号"
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
    sorter: true
  },
  {
    dataIndex: "approverName",
    title: "审核员"
  }
];

const Demo: React.FC<{}> = () => {
  const handleRequest = React.useCallback((params, filters, sorter, extra): Promise<{ data: any[]; total: number; }> => {
    const { pageSize, current, ...restParams } = params;
    console.log(params, filters, sorter, extra);
    return getApplyList({
      page: {
        pageSize: pageSize,
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
      columns={columns}
      rowKey='applyCode'
      request={handleRequest}
    />
  );
}

export default Demo;
import * as React from 'react';
import { BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType } from 'antd-more/es/biz-table';
import { getApplyList } from './service';

type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
  approveResult: 1 | 2 | 3;
}

const columns: BizColumnType<DataItem> = [
  {
    valueType: "indexBorder"
  },
  {
    dataIndex: "applyCode",
    title: "申请编号",
    tooltip: "提示文字",
    search: true
  },
  {
    dataIndex: "createTime",
    title: "提交时间",
    valueType: "dateTime",
    search: {
      valueType: "date"
    },
    order: 2
  },
  {
    dataIndex: "applicantName",
    title: "经办员"
  },
  {
    dataIndex: "approveTime",
    title: "审核时间",
    tooltip: "提示文字",
    sorter: true,
    search: {
      valueType: "dateTimeRange",
      names: ["startTime", "endTime"],
      colProps: { lg: 12, md: 24 }
    },
    order: 10
  },
  {
    dataIndex: "approverName",
    title: "审核员",
    search: true
  }
];

const Demo: React.FC = () => {
  const handleRequest: BizTableRequest<DataItem> = React.useCallback((params, filters, sorter, extra) => {
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
    <BizTable<DataItem>
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
    />
  );
}

export default Demo;
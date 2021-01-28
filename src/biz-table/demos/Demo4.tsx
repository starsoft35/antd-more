import * as React from 'react';
import { BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType } from 'antd-more/es/biz-table';
import { getApplyList } from './service';
import { ApproveStatus } from './constants';

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
    dataIndex: "applyCode",
    title: "申请编号",
    tooltip: "提示文字",
    search: true // 无 valueType，默认为 ItemInput
  },
  {
    dataIndex: "createTime",
    title: "提交时间",
    search: {
      itemType: "date" // 日期
    }
  },
  {
    dataIndex: "applicantName",
    title: "经办员"
  },
  {
    dataIndex: "dateTimeRange",
    title: "日期时间区间",
    tooltip: "提示文字",
    sorter: true,
    search: {
      valueType: "dateTimeRange", // 日期范围，当valueType不满足时，使用 itemType 指定 formItem 类型
      names: ["startTime", "endTime"],
      initialValue: ["2020-10-10 00:00:00", "2020-11-11 11:11:11"],
      colProps: { lg: 12, md: 24 }
    },
    table: false,
    order: 2
  },
  {
    dataIndex: "approverName",
    title: "审核员",
    search: true,
    table: false
  },
  {
    dataIndex: "money",
    valueType: "money", // progress percent 一样
    title: "数字",
    search: true,
    table: false
  },
  {
    dataIndex: "color",
    valueType: "color",
    title: "颜色",
    search: true,
    table: false
  },
  {
    dataIndex: "select",
    valueType: "enum", // enumTag enumBadge 一样
    valueEnum: ApproveStatus,
    title: "选择器",
    search: {
      all: true,
      initialValue: ""
    },
    table: false
  },
  {
    dataIndex: "radio",
    valueType: "enum",
    valueEnum: ApproveStatus,
    title: "单选框",
    search: {
      itemType: "radio",
      all: true,
      initialValue: "",
      colProps: { lg: 16, md: 24 }
    },
    table: false
  },
  {
    dataIndex: "checkbox",
    valueType: "enum",
    valueEnum: ApproveStatus,
    title: "多选框",
    search: {
      itemType: "checkbox",
      all: true,
      colProps: { lg: 16, md: 24 }
    },
    table: false
  },
  {
    dataIndex: "dateWeek",
    valueType: "dateWeek",
    title: "周",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "dateMonth",
    valueType: "dateMonth",
    title: "月",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "dateQuarter",
    valueType: "dateQuarter",
    title: "季",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "dateYear",
    valueType: "dateYear",
    title: "年",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "dateTime",
    valueType: "dateTime",
    title: "日期时间",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "time",
    valueType: "time",
    title: "时间",
    search: true,
    table: false,
    order: 1
  },
  {
    dataIndex: "dateRange",
    valueType: "dateRange",
    title: "日期区间",
    search: {
      colProps: { lg: 12, md: 24 }
    },
    table: false,
    order: 1
  },
  {
    dataIndex: "timeRange",
    valueType: "timeRange",
    title: "时间区间",
    search: {
      colProps: { lg: 12, md: 24 }
    },
    table: false,
    order: 1
  },
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
      form={{
        labelWidth: 112
      }}
      pagination={{
        pageSize: 5
      }}
    />
  );
}

export default Demo;
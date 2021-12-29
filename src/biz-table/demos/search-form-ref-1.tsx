import * as React from 'react';
import { FormInstance } from 'antd';
import { BizTable, BizTableRequest, BizTableColumnType } from 'antd-more';
import { divide } from 'util-helpers';
import { getApplyList } from './service';
import { BizTableActionType } from '..';

type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
  money: number;
};

const columns: BizTableColumnType<DataItem> = [
  {
    valueType: 'indexBorder'
  },
  {
    dataIndex: 'applyCode',
    title: '申请编号',
    tooltip: '提示文字',
    search: true
  },
  {
    dataIndex: 'money',
    title: '金额',
    valueType: 'money',
    align: 'right',
    // 传递给 BizField的参数
    field: {
      formatValue: (value) => divide(value, 100), // 分转元
      prefix: '¥'
    },
    order: 2
  },
  {
    dataIndex: 'createTime',
    title: '提交时间',
    valueType: 'dateTime',
    search: {
      valueType: 'date'
    },
    order: 2
  },
  {
    dataIndex: 'applicantName',
    title: '经办员'
  },
  {
    dataIndex: 'approveTime',
    title: '审核时间',
    tooltip: '提示文字',
    sorter: true,
    valueType: 'dateTime',
    search: {
      valueType: 'dateTimeRange',
      names: ['startTime', 'endTime'],
      colProps: { lg: 12, md: 24 }
    },
    order: 10
  },
  {
    dataIndex: 'approverName',
    title: '审核员',
    search: true
  }
];

const Demo = () => {
  // 查询表单实例引用
  const formRef = React.useRef<FormInstance>();
  // 操作引用
  const actionRef = React.useRef<BizTableActionType>();

  const handleRequest: BizTableRequest<DataItem> = React.useCallback(
    (params, filters, sorter, extra) => {
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

  React.useEffect(() => {
    // 设置查询表单值
    formRef.current.setFieldsValue({
      approverName: '123',
      createTime: '2021-10-28',
      approveTime: ['2021-10-28 00:00:00', '2021-10-28 23:59:59']
    });

    // 手动发起请求
    actionRef.current.submit();
  }, []);

  return (
    <BizTable<DataItem>
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
      toolbarAction
      // 关闭自动请求
      autoRequest={false}
      formRef={formRef}
      actionRef={actionRef}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Demo;

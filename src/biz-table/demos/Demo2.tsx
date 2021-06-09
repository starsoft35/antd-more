import * as React from 'react';
import { Button, Card, Space } from 'antd';
import type { FormInstance } from 'antd';
import { BizTable } from 'antd-more';
import type { BizTableActionType, BizTableRequest, BizTableColumnType } from 'antd-more';
import { getApplyList } from './service';
import { ApproveStatusOptions } from './constants';
import type { ApproveStatus } from './constants';

type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
  approveResult: ApproveStatus;
}

const columns: BizTableColumnType<DataItem> = [
  {
    dataIndex: "applyCode",
    title: "申请编号",
    search: true,
    table: false
  },
  {
    dataIndex: "createTime",
    title: "提交时间",
    search: {
      valueType: "date"
    }
  },
  {
    dataIndex: "approveTime",
    title: "审核时间",
    sorter: true,
    valueType: "dateTime",
    search: {
      valueType: "dateTimeRange",
      names: ["startTime", "endTime"],
      colProps: { lg: 12, md: 24 }
    },
    order: 2
  },
  {
    dataIndex: "approverName",
    title: "审核员"
  },
  {
    dataIndex: "approveResult",
    title: "审核状态",
    filters: ApproveStatusOptions.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: ApproveStatusOptions,
    search: {
      name: "approveStatus",
      all: true,
      initialValue: ""
    }
  }
];

const Demo: React.FC = () => {
  const formRef = React.useRef<FormInstance | undefined>();
  const actionRef = React.useRef<BizTableActionType | undefined>();
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

  const currentColumns = React.useMemo(() => ([
    ...columns,
    {
      title: "操作",
      render: () => (
        <Space size="middle">
          <a onClick={() => { actionRef.current.reload() }}>reload</a>
          <a onClick={() => { actionRef.current.submit() }}>submit</a>
          <a onClick={() => { actionRef.current.reset() }}>reset</a>
        </Space>
      )
    }
  ]), []);

  return (
    <BizTable<DataItem>
      formRef={formRef}
      actionRef={actionRef}
      form={{
        submitter: {
          render: (submitterProps, dom) => {
            const { submitButtonProps, resetButtonProps } = submitterProps;
            return (
              <Space>
                <Button
                  key="search"
                  type="primary"
                  onClick={() => { actionRef.current.submit(); }}
                  {...submitButtonProps}
                >
                  查询
                </Button>
                <Button
                  key="reset"
                  onClick={() => { actionRef.current.reset(); }}
                  {...resetButtonProps}
                >
                  重置
                </Button>
                <Button
                  key="export"
                >
                  导出
                </Button>
              </Space>
            )
          }
        },
        defaultColsNumber: 1
      }}
      toolbar={(
        <Space>
          <Button type="primary">新增</Button>
          <Button onClick={() => { formRef.current.setFieldsValue({ applyCode: "12345" }) }}>赋值</Button>
        </Space>
      )}
      toolbarAction
      fullScreenBackgroundColor="#f5f5f5"
      extra={(
        <Card bordered={false}>
          Extra Block!
        </Card>
      )}
      columns={currentColumns}
      rowKey="applyCode"
      request={handleRequest}
      pagination={{
        pageSize: 5
      }}
    />
  );
}

export default Demo;
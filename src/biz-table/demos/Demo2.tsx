import * as React from 'react';
import { Button, Card, Space } from 'antd';
import { BizTable } from 'antd-more';
import { FormInstance } from 'antd/es/form';
import { ActionType, BizTableRequest, BizColumnType } from 'antd-more/es/biz-table';
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
    filters: ApproveStatus.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: ApproveStatus,
    search: {
      name: "approveStatus",
      all: true,
      initialValue: ""
    }
  }
];

const Demo: React.FC = () => {
  const formRef = React.useRef<FormInstance | undefined>();
  const actionRef = React.useRef<ActionType | undefined>();
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
            return (
              <Space>
                <Button
                  key="search"
                  type="primary"
                  onClick={() => { actionRef.current.submit(); }}
                  {...submitterProps.submitButtonProps}
                >
                  查询
                </Button>
                <Button
                  key="reset"
                  onClick={() => { actionRef.current.reset(); }}
                  {...submitterProps.resetButtonProps}
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
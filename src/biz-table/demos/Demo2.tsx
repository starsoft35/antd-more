import * as React from 'react';
import { Button, Card, Space } from 'antd';
import { BizForm, BizTable } from 'antd-more';
import moment from 'moment';
import Mock from 'mockjs';
import { FormInstance } from 'antd/lib/form';
import { ActionType } from 'antd-more/es/biz-table';

// 审核状态
const approveResult = [
  {
    name: "待审核",
    value: 1,
    badge: {
      status: "processing"
    }
  },
  {
    name: "审核通过",
    value: 2,
    badge: {
      status: "success"
    }
  },
  {
    name: "审核拒绝",
    value: 3,
    badge: {
      status: "error"
    }
  },
];
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
const columns = [
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
  },
  {
    dataIndex: "approveResult",
    title: "审核状态",
    filters: approveResult.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: approveResult
  },
  {
    title: "操作",
    render: (text, record) => (
      <Space size="middle">
        <a>查看</a>
        <a>审核</a>
      </Space>
    )
  }
];

const Demo: React.FC<{}> = () => {
  const formRef = React.useRef<FormInstance | undefined>();
  const actionRef = React.useRef<ActionType | undefined>();
  const formItems = [
    <BizForm.ItemInput name='applyCode' label='申请编号' />,
    <BizForm.ItemDate name='createTime' label='提交时间' />,
    <BizForm.ItemInput name='approverName' label='审核员' />,
    <BizForm.ItemDateRange name='approveTime' names={['startTime', 'endTime']} label='审核时间' />,
    <BizForm.ItemSelect name='approveResult' label='审核状态' options={approveResult} all />
  ];
  const handleRequest = React.useCallback((params, filters, sorter): Promise<{ data: any[]; total: number; }> => {
    const { pageSize, current, ...restParams } = params;
    console.log(params, filters, sorter);
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
      formItems={formItems}
      formRef={formRef}
      form={{
        // submitter: {
        //   render: (_, dom) => {
        //     return [
        //       <Button
        //         key="search"
        //         type="primary"
        //         onClick={() => { formRef.current.submit(); }}
        //       >
        //         查询
        //         </Button>,
        //       <Button
        //         key="reset"
        //         onClick={() => { formRef.current.resetFields(); formRef.current.submit(); }}
        //       >
        //         重置
        //         </Button>,
        //       <Button
        //         key="export"
        //       >
        //         导出
        //         </Button>
        //     ]
        //   }
        // },
        defaultColsNumber: 2,
        initialValues: {
          approveResult: ''
        }
      }}
      actionRef={actionRef}
      toolbar={(
        <>
          <Button type="primary">新增</Button>
          Toolbar!
        </>
      )}
      extra={(
        <Card>
          Extra Block!
        </Card>
      )}
      columns={columns}
      rowKey='applyCode'
      request={handleRequest}
    />
  );
}

export default Demo;
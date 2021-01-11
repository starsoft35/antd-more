/**
 * desc: |
 *      异步获取表单初始值再进行查询
 */
import * as React from 'react';
import { BizForm, BizTable } from 'antd-more';
import { Request, BizColumnType } from 'antd-more/es/biz-table';
import moment from 'moment';
import Mock from 'mockjs';

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

function getAsyncInitialValues(): Promise<{
  applyCode: string;
  createTime: string;
  approveResult: number;
}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        applyCode: '123456',
        createTime: '2020-10-10',
        approveResult: 1
      });
    }, 5000);
  });
}


const columns: BizColumnType = [
  {
    dataIndex: "applyCode",
    title: "申请编号"
  },
  {
    dataIndex: "createTime",
    title: "提交时间",
    sorter: true
  },
  {
    dataIndex: "approveResult",
    title: "审核状态",
    filters: approveResult.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: approveResult
  }
];

const Demo: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState<any>({ approveResult: '' })
  const formItems = [
    <BizForm.ItemInput name="applyCode" label="申请编号" />,
    <BizForm.ItemDate name="createTime" label="提交时间" />,
    <BizForm.ItemSelect name="approveResult" label="审核状态" options={approveResult} all />
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

  React.useEffect(() => {
    // 异步获取表单初始值
    getAsyncInitialValues().then(res => {
      setInitialValues(res);
      setReady(true);
    });
  }, []);

  return (
    <BizTable
      ready={ready}
      formItems={formItems}
      form={{ initialValues }}
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
    />
  );
}

export default Demo;
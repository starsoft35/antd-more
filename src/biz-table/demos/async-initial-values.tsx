/**
 * desc: |
 *      异步获取表单初始值再进行查询
 */
import * as React from 'react';
import { BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType } from 'antd-more/es/biz-table';
import { getApplyList } from './service';
import { ApproveStatus } from './constants';

function getAsyncInitialValues(): Promise<{
  applyCode: string;
  createTime: string;
  approveResult: string | number;
}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        applyCode: '123456',
        createTime: '2020-10-10',
        approveResult: ""
      });
    }, 5000);
  });
}

const columns: BizColumnType = [
  {
    dataIndex: "applyCode",
    title: "申请编号",
    search: true
  },
  {
    dataIndex: "createTime",
    title: "提交时间",
    sorter: true,
    search: {
      valueType: "date"
    }
  },
  {
    dataIndex: "approveResult",
    title: "审核状态",
    filters: ApproveStatus.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: ApproveStatus,
    search: {
      all: true
    }
  }
];

const Demo: React.FC = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState<any>();
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
      form={{
        initialValues
      }}
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
    />
  );
}

export default Demo;
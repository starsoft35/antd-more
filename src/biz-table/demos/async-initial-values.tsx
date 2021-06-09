/**
 * desc: |
 *      异步获取表单初始值再进行查询
 */
import * as React from 'react';
import { BizTable } from 'antd-more';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import { getApplyList } from './service';
import { ApproveStatusOptions } from './constants';
import type { ApproveStatus } from './constants';

function getAsyncInitialValues(): Promise<{
  applyCode: string;
  createTime: string;
  approveResult: ApproveStatus;
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

const columns: BizTableColumnType = [
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
    filters: ApproveStatusOptions.map(item => ({ text: item.name, ...item })),
    valueType: 'enumBadge',
    valueEnum: ApproveStatusOptions,
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
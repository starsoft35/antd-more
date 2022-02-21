/**
 * desc: |
 *      异步获取表单初始值再进行查询
 */
import * as React from 'react';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import { BizTable } from 'antd-more';
import { waitTime } from 'util-helpers';
import { getApplyList } from './service';
import type { ApproveStatus } from './constants';
import { ApproveStatusOptions } from './constants';

async function getAsyncInitialValues() {
  await waitTime(5000);
  return {
    applyCode: '123456',
    createTime: '2020-10-10',
    approveResult: 1 as ApproveStatus
  };
}

const columns: BizTableColumnType = [
  {
    dataIndex: 'applyCode',
    title: '申请编号',
    search: true
  },
  {
    dataIndex: 'createTime',
    title: '提交时间',
    sorter: true,
    search: {
      valueType: 'date'
    }
  },
  {
    dataIndex: 'approveResult',
    title: '审核状态',
    filters: ApproveStatusOptions.map((item) => ({ text: item.label, ...item })),
    valueType: 'enumBadge',
    valueEnum: ApproveStatusOptions,
    search: {
      all: true
    }
  }
];

const Demo = () => {
  const [ready, setReady] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState<any>();
  const handleRequest: BizTableRequest = (params, filters, sorter, extra) => {
    const { pageSize, current, ...restParams } = params;
    console.log(params, filters, sorter, extra);

    return getApplyList({
      page: {
        pageSize,
        pageNum: current
      },
      data: restParams
    }).then((res) => {
      return {
        total: res.pageInfo.total,
        data: res.data
      };
    });
  };

  React.useEffect(() => {
    // 异步获取表单初始值
    getAsyncInitialValues().then((res) => {
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
};

export default Demo;

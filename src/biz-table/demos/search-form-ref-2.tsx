// 基于 search-form-ref-1.tsx 进行调整，抽象一个初始化方法，自动获取 URL 的 search。适用于 `首次加载` 和 `keep-alive 激活时` 调用。

import * as React from 'react';
import { BizTable } from 'antd-more';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import qs from 'qs';
import { divide } from 'util-helpers';
import { getApplyList } from './service';
import { FormInstance } from 'antd';
import { BizTableActionType } from '..';

// 缓存上一次进入页面的search值
let prevSearch = '';

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

  const mountedRef = React.useRef(false);

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

  // 适用于 初次加载 和 keep-alive激活时 调用
  // 注意：如果查询表单是日期范围，URL上带的参数为 qs.stringify({dates: [startDate, endDate]})
  const init = () => {
    const search = window.location.search.substr(1);
    const queries = qs.parse(search);

    if (search) {
      // 重置表单值
      formRef.current?.resetFields();
      const prevFields = formRef.current?.getFieldsValue();
      // 将search值填入表单
      formRef.current?.setFieldsValue({
        ...prevFields,
        ...queries
      });
      actionRef.current?.submit();
    } else {
      // 之前有search值
      if (prevSearch) {
        actionRef.current?.reset();
      } else if (mountedRef.current) {
        actionRef.current?.reload();
      } else {
        actionRef.current?.submit();
      }
    }

    prevSearch = search;
  };

  React.useEffect(() => {
    init();
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 如果使用 umi-plugin-keep-alive ，在该组件激活时调用初始化即可。
  // useActivate(init);

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

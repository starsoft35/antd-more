import * as React from 'react';
import type { BizTableRequest, BizTableColumnType } from 'antd-more';
import { BizTable, BizField } from 'antd-more';
import { renderMoney, renderDateTime } from './utils/field';
import { getApplyList } from './service';
import type { DataItem } from './service';
import { ApproveStatus, ApproveStatusOptions } from './constants';
import { Typography } from 'antd';

const columns: BizTableColumnType<DataItem> = [
  {
    valueType: 'indexBorder'
  },
  {
    dataIndex: 'applyCode',
    title: '申请编号',
    tooltip: '提示文字'
  },
  {
    dataIndex: 'money',
    title: '金额',
    align: 'right',
    render: renderMoney
  },
  {
    dataIndex: 'createTime',
    title: '提交时间',
    valueType: 'dateTime',
    render: renderDateTime,
    search: {
      valueType: 'date'
    },
    order: 2
  },
  {
    dataIndex: 'applicantName',
    title: '经办员',
    search: true
  },
  {
    dataIndex: 'approveTime',
    title: '审核时间',
    tooltip: '提示文字',
    sorter: true,
    valueType: 'dateTime',
    render: renderDateTime
  },
  {
    dataIndex: 'approveResult',
    title: '审核状态',
    render: (text, record) => {
      return (
        <div>
          <BizField value={text} valueType="enumBadge" valueEnum={ApproveStatusOptions} />
          {text === ApproveStatus.Refused && record.remark && (
            <div>
              <Typography.Text
                style={{ width: 140, color: 'gray' }}
                ellipsis={{ tooltip: record.remark }}
              >
                {record.remark}
              </Typography.Text>
            </div>
          )}
        </div>
      );
    }
  }
];

const Demo = () => {
  const handleRequest: BizTableRequest<DataItem> = (params, filters, sorter, extra) => {
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

  return (
    <BizTable<DataItem>
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Demo;

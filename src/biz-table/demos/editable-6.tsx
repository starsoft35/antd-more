import * as React from 'react';
import { Space } from 'antd';
import { BizTable } from 'antd-more';
import { BizTableRequest, BizColumnType, EditableActionType } from 'antd-more/es/biz-table';
import { getApplyList } from './service';

type DataItem = {
  applyCode: string;
  applicantName: string;
  approverName: string;
  createTime: string;
  approveTime: string;
  approveResult: 1 | 2 | 3;
}

const { EditableBizTable } = BizTable;

const Demo: React.FC = () => {
  const [editableKeys, setEditableKeys] = React.useState([]);
  const editableActionRef = React.useRef<EditableActionType>();

  const handleRequest: BizTableRequest<DataItem> = (params, filters, sorter, extra) => {
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
  };

  const columns: BizColumnType<DataItem> = [
    {
      dataIndex: "applyCode",
      title: "申请编号",
      tooltip: "提示文字",
      search: true,
      editable: false
    },
    {
      dataIndex: "createTime",
      title: "提交时间",
      valueType: "dateTime",
      search: {
        valueType: "date"
      },
      order: 2
    },
    {
      dataIndex: "applicantName",
      title: "经办员"
    },
    {
      dataIndex: "approveTime",
      title: "审核时间",
      tooltip: "提示文字",
      sorter: true,
      valueType: "dateTime",
      search: {
        valueType: "dateTimeRange",
        names: ["startTime", "endTime"],
        colProps: { lg: 12, md: 24 }
      },
      order: 10
    },
    {
      dataIndex: "approverName",
      title: "审核员",
      search: true
    },
    {
      title: "操作",
      width: 120,
      fixed: "right" as "right",
      render: (_, record, index) => {
        return (
          <Space>
            {
              editableKeys.includes(record.applyCode) ? (
                <>
                  <a onClick={() => editableActionRef.current.save(record.applyCode)}>保存</a>
                  <a onClick={() => editableActionRef.current.cancel(record.applyCode)}>取消</a>
                </>
              ) : (
                  <>
                    <a onClick={() => editableActionRef.current.edit(record.applyCode)}>编辑</a>
                    <a onClick={() => editableActionRef.current.delete(record.applyCode)}>删除</a>
                  </>
                )
            }
          </Space>
        )
      }
    }
  ];

  return (
    <EditableBizTable<DataItem>
      columns={columns}
      rowKey="applyCode"
      request={handleRequest}
      pagination={{ pageSize: 5 }}
      autoRequest
      editable={{
        editableKeys,
        onChange: setEditableKeys,
        editableActionRef,
        onSave: async (rowKey, record, isNewRecord) => {
          console.log(`保存${isNewRecord ? "新增" : "已保存"}的数据`, rowKey, record);
          // return Promise.reject(); // 如果返回Project.reject即保存失败，自动保留当前的状态
        },
        onDelete: async (rowKey, record, isNewRecord) => {
          // 新增的数据如果没有保存过，取消时会触发删除
          console.log(`删除${isNewRecord ? "新增" : "已保存"}的数据`, rowKey, record);
          // return Promise.reject(); // 如果返回Project.reject即删除失败，自动保留当前的状态
        }
      }}
    />
  );
}

export default Demo;
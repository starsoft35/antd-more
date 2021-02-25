import * as React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { BizForm, BizTable, BizField } from 'antd-more';
import { formatBankCard } from 'util-helpers';
import { EditableActionType } from 'antd-more/es/biz-table';
import Mock from 'mockjs';
import { Bank, ApproveStatus } from './constants';

Mock.Random.extend({
  bank() {
    return this.pick(Bank.map(item => item.value))
  }
});

const defaultData = Mock.mock({
  'list|2-5': [{
    'id|+1': 1,
    'merchantName|2-5': '@cword',
    'bank': '@bank',
    'bankCardNo|100000000-10000000000000000': 1,
    'money|0-10000.2': null,
    'materials': null,
    'remark': null, // '@cparagraph'
    'status|1-3': null, // 1
  }]
}).list;

const { EditableBizTable } = BizTable;
const { Item } = BizForm;

const Demo: React.FC = () => {
  const [editableKeys, setEditableKeys] = React.useState(() => defaultData.map(item => item.id));
  const editableActionRef = React.useRef<EditableActionType>();

  const columns = [
    {
      render: (_, record) => (
        <Popconfirm
          title={`确认删除${record.merchantName}？`}
          onConfirm={() => editableActionRef.current.delete(record.id)}
        >
          <a style={{ fontSize: 20 }}>
            <DeleteOutlined />
          </a>
        </Popconfirm>
      )
    },
    {
      title: "收款方",
      render: (_, record) => {
        return (
          <>
            <div>
              {record.merchantName}
               -
              <BizField value={record.bank} valueType="enum" valueEnum={Bank} />
            </div>
            <div>{formatBankCard(`${record.bankCardNo}`)}</div>
          </>
        )
      }
    },
    {
      dataIndex: "status",
      title: "审核状态",
      valueType: "enumBadge",
      valueEnum: ApproveStatus,
      width: 120,
      editable: {
        required: true,
        selectProps: {
          allowClear: true
        }
      }
    },
    {
      dataIndex: "money",
      title: "金额",
      editable: {
        itemType: "number",
        gt: 0,
        required: true
      }
    },
    {
      dataIndex: "materials",
      title: "材料文件",
      width: 200,
      editable: {
        itemType: "upload",
        required: true,
        style: {
          width: 184
        }
      }
    },
    {
      dataIndex: "remark",
      title: "备注（选填）",
      valueType: "text",
      editable: {
        itemType: "textarea",
        inputProps: {
          autoSize: true,
          maxLength: 100
        }
      }
    }
  ];

  return (
    <BizForm
      name="editable-5"
      onFinish={values => {
        console.log("onFinish ", values);
      }}
      submitter={{
        noReset: true,
        render: (_, dom) => dom
      }}
    >
      <Item
        label="付款列表"
        name="list"
        initialValue={defaultData}
        trigger="onValuesChange"
        hideLabel
      >
        <EditableBizTable
          rowKey="id"
          columns={columns}
          editable={{
            editableKeys,
            onChange: setEditableKeys,
            editableActionRef
          }}
          size="middle"
        />
      </Item>
    </BizForm>
  );
}

export default Demo;
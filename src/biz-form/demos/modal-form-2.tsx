import * as React from 'react';
import { Button, Space } from 'antd';
import { BizForm } from 'antd-more';

const { ModalForm, DrawerForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const BillAccountName = [
  {
    name: "张三",
    value: 'a'
  },
  {
    name: "李四",
    value: 'b'
  },
];

const Demo: React.FC = () => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => setVisibleModal(true)}>Modal表单</Button>
        <Button type="primary" onClick={() => setVisibleDrawer(true)}>Drawer表单</Button>
      </Space>
      <ModalForm
        title="创建付款单"
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        labelWidth={112}
        visible={visibleModal}
        onVisibleChange={setVisibleModal}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountName} required />
        <ItemNumber label="付款金额" name="money" required after="¥" />
        <ItemUpload label="材料文件" name="files" required title="上传文件" transform={values => values.map(val => val.name)} />
        <ItemTextArea label="备注（选填）" name="remark" disabledWhiteSpace inputProps={{ showCount: true, maxLength: 140 }} />
      </ModalForm>
      <DrawerForm
        title="创建付款单"
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        labelWidth={112}
        visible={visibleDrawer}
        onVisibleChange={setVisibleDrawer}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountName} required />
        <ItemNumber label="付款金额" name="money" required after="¥" />
        <ItemUpload label="材料文件" name="files" required title="上传文件" transform={values => values.map(val => val.name)} />
        <ItemTextArea label="备注（选填）" name="remark" disabledWhiteSpace inputProps={{ showCount: true, maxLength: 140 }} />
      </DrawerForm>
    </>
  );
}

export default Demo;

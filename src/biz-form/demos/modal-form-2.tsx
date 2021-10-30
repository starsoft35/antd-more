import * as React from "react";
import { Button, Space, message } from "antd";
import { BizForm } from "antd-more";
import { BillAccountOptions } from './constants';
import waitTime from "./utils/waitTime";

const { ModalForm, DrawerForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

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
          message.success("提交成功");
        }}
        labelWidth={112}
        visible={visibleModal}
        onVisibleChange={setVisibleModal}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountOptions} required />
        <ItemNumber label="付款金额" name="money" required precision={2} contentAfter="¥" />
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
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountOptions} required />
        <ItemNumber label="付款金额" name="money" required precision={2} contentAfter="¥" />
        <ItemUpload label="材料文件" name="files" required title="上传文件" transform={values => values.map(val => val.name)} />
        <ItemTextArea label="备注（选填）" name="remark" disabledWhiteSpace inputProps={{ showCount: true, maxLength: 140 }} />
      </DrawerForm>
    </>
  );
}

export default Demo;

import * as React from 'react';
import { Button, Space } from 'antd';
import { BizForm } from 'antd-more';
import { BillAccountOptions } from './constants';
import waitTime from './utils/waitTime';

const { ModalForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

const Demo: React.FC = () => {
  const [form] = BizForm.useForm();

  return (
    <Space>
      <ModalForm
        title="test提交按钮"
        trigger={<Button type="primary">自定义test按钮</Button>}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        labelWidth={112}
        form={form}
        submitter={{
          render: (submitterProps, dom) => [
            ...dom,
            <Button {...submitterProps.submitButtonProps} onClick={() => form.submit()} key="test">
              test
            </Button>
          ]
        }}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountOptions} required />
        <ItemNumber label="付款金额" name="money" required precision={2} contentAfter="¥" />
        <ItemUpload
          label="材料文件"
          name="files"
          required
          title="上传文件"
          transform={(values) => values.map((val) => val.name)}
        />
        <ItemTextArea
          label="备注（选填）"
          name="remark"
          disabledWhiteSpace
          inputProps={{ showCount: true, maxLength: 140 }}
        />
      </ModalForm>
      <ModalForm
        title="创建付款单"
        trigger={<Button type="primary">自定义文字</Button>}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        labelWidth={112}
        form={form}
        submitter={{
          submitText: '提交',
          noReset: true
        }}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountOptions} required />
        <ItemNumber label="付款金额" name="money" required precision={2} contentAfter="¥" />
        <ItemUpload
          label="材料文件"
          name="files"
          required
          title="上传文件"
          transform={(values) => values.map((val) => val.name)}
        />
        <ItemTextArea
          label="备注（选填）"
          name="remark"
          disabledWhiteSpace
          inputProps={{ showCount: true, maxLength: 140 }}
        />
      </ModalForm>
    </Space>
  );
};

export default Demo;

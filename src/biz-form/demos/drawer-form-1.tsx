import * as React from 'react';
import { Button, message } from 'antd';
import { BizForm } from 'antd-more';
import { BillAccountOptions } from './constants';
import waitTime from './utils/waitTime';

const { DrawerForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

const Demo: React.FC = () => {
  return (
    <DrawerForm
      title="创建付款单"
      trigger={<Button type="primary">创建付款单</Button>}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
      labelWidth={112}
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
    </DrawerForm>
  );
};

export default Demo;

import * as React from 'react';
import { message } from 'antd';
import { BizForm } from 'antd-more';

const { StepsForm, ItemInput, ItemSelect, ItemNumber, ItemUpload, ItemTextArea } = BizForm;

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
  return (
    <StepsForm
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
    >
      <StepsForm.StepForm
        title="选择收款方"
        labelWidth={112}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
      >
        <ItemInput label="收款账号" name="ban" required />
        <ItemSelect label="收款账号名称" name="accountName" options={BillAccountName} required />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="填写付款信息"
        labelWidth={112}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
      >
        <ItemNumber label="付款金额" name="money" required after="¥" />
        <ItemUpload label="材料文件" name="files" required title="上传文件" transform={values => values.map(val => val.name)} />
        <ItemTextArea label="备注（选填）" name="remark" disabledWhiteSpace inputProps={{ showCount: true, maxLength: 140 }} />
      </StepsForm.StepForm>
    </StepsForm>
  );
}

export default Demo;
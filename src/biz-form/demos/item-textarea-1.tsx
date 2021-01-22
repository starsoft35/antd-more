import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemTextArea } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-textarea-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <ItemTextArea label="TextArea" name="textarea1" />
      <ItemTextArea label="必填项" name="textarea2" required />
      <ItemTextArea label="自定义" name="textarea4" disabledWhiteSpace inputProps={{ maxLength: 100, showCount: true }} />
    </BizForm>
  );
}

export default Demo;

import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemInput } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-input-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <ItemInput label="Input" name="input1" />
      <ItemInput label="禁止空格" name="input2" disabledWhiteSpace />
      <ItemInput label="姓名" name="input3" disabledWhiteSpace required inputProps={{ placeholder: "请输入姓名" }} />
      <ItemInput.Password label="InputPassword" name="password" />
      <ItemInput.TextArea label="InputTextArea" name="textarea" />
    </BizForm>
  );
}

export default Demo;
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemPassword } = BizForm;

const Demo: React.FC<{}> = () => {
  return (
    <BizForm
      name='form-item-password-1'
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <ItemPassword label="password1" name="password1" />
      <ItemPassword label="password2" name="password2" required />
      <ItemPassword label="自定义规则" name="password3" min={4} max={8} level={3} ignoreCase={true} special="><?-=" required tooltip="4-8位字符，包含大小写字母、数字和符号(><?-=)三者组成" />
    </BizForm>
  );
}

export default Demo;
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemUserName } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-userName-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemUserName label="用户名1" name="userName1" />
      <ItemUserName label="用户名2" name="userName2" required />
    </BizForm>
  );
}

export default Demo;
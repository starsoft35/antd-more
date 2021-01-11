import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemEmail } = BizForm;

const initialValues = {
  email3: '12****@qq.com'
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-email-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
      initialValues={initialValues}
    >
      <ItemEmail label="email1" name="email1" />
      <ItemEmail label="email2" name="email2" required />
      <ItemEmail label="脱敏" name="email3" required security initialValue={initialValues.email3} />
    </BizForm>
  );
}

export default Demo;
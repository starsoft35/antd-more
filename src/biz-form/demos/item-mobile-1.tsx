import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemMobile } = BizForm;

const initialValues = {
  mobile3: '150****2020'
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-mobile-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
      initialValues={initialValues}
    >
      <ItemMobile label="mobile1" name="mobile1" />
      <ItemMobile label="mobile2" name="mobile2" required />
      <ItemMobile label="脱敏" name="mobile3" required security initialValue={initialValues.mobile3} />
    </BizForm>
  );
}

export default Demo;
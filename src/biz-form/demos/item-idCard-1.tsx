import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemIdCard } = BizForm;

const initialValues = {
  idCard3: '130***********2288'
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-idCard-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
      initialValues={initialValues}
    >
      <ItemIdCard label="idCard1" name="idCard1" />
      <ItemIdCard label="idCard2" name="idCard2" required />
      <ItemIdCard label="脱敏" name="idCard3" required security initialValue={initialValues.idCard3} />
    </BizForm>
  );
}

export default Demo;
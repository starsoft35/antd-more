import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemNumber } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-number-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemNumber label="number1" name="number1" />
      <ItemNumber label="number2" name="number2" required />
      <ItemNumber label="金额" name="number3" after="元" gte={0} lte={100} tooltip="大于等于0，小于等于100" required />
      <ItemNumber label="费率" name="number4" after="%" gt={0} lt={6} tooltip="大于0，小于6" required />
    </BizForm>
  );
}

export default Demo;
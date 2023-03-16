import * as React from 'react';
import { BizForm } from 'antd-more';
import CompositionBankLogic from './CompositionBankLogic';

function Demo() {
  return (
    <BizForm
      onFinish={values => {
        console.log(values);
      }}
    >
      <CompositionBankLogic />
    </BizForm>
  );
}

export default Demo;
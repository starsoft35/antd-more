import * as React from 'react';
import { BizForm } from 'antd-more';
import ItemDateRangeDefine from '../components/ItemDateRangeDefine';

function Demo() {
  return (
    <BizForm
      labelWidth={98}
      onFinish={values => {
        console.log(values);
      }}
    >
      <ItemDateRangeDefine
        label='证件有效期'
        name='dateEffective'
        required
      />
    </BizForm>
  );
}

export default Demo;
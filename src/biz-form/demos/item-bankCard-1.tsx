import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemBankCard } = BizForm;

const initialValues = {
  bankCardNo3: '6228480402564890018',
  bankCardNo4: '6228************018',
  bankCardNo5: '6228------------018',
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-bankCard-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
      initialValues={initialValues}
    >
      <ItemBankCard label="银行卡号1" name="bankCardNo1" />
      <ItemBankCard label="银行卡号2" name="bankCardNo2" required />
      <ItemBankCard label="格式化" name="bankCardNo3" required formatting />
      <ItemBankCard label="脱敏" name="bankCardNo4" required security initialValue={initialValues.bankCardNo4} />
      <ItemBankCard label="脱敏格式化" name="bankCardNo5" required formatting security symbol="-" initialValue={initialValues.bankCardNo5} />
    </BizForm>
  );
}

export default Demo;
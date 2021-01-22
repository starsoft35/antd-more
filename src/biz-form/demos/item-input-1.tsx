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
      <ItemInput label="必填项" name="input2" required />
      <ItemInput label="禁止空格" name="input3" disabledWhiteSpace />
      <ItemInput
        label="图形验证码"
        name="code"
        required
        inputProps={{
          placeholder: "请输入验证码"
        }}
        after={<img src="http://img3.itboth.com/12/14/qAVNBz.jpg" style={{ height: 32, margin: 0 }} alt="" />}
      />
      <ItemInput label="银行卡号" name="bankCardNo" type="bankCard" />
      <ItemInput label="手机号码" name="phone" type="mobile" />
      <ItemInput label="身份证号" name="idc" type="idCard" />
      <ItemInput label="邮箱" name="ema" type="email" />
      <ItemInput
        label="用户名"
        name="username"
        type="userName"
        extendRules={[
          {
            min: 6,
            max: 32,
            message: "用户名为6～32位"
          }
        ]}
      />
    </BizForm>
  );
}

export default Demo;
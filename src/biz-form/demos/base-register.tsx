import * as React from 'react';
import { BizForm } from 'antd-more';
import lcnFormInlandData from 'lcn/lcn-form-inland';

const { ItemUserName, ItemAddress, ItemMobile, ItemEmail, ItemPassword, ItemIdCard } = BizForm;

const RegisterDemo: React.FC<{}> = () => {
  return (
    <BizForm
      name='base-register'
      onFinish={values => {
        console.log(values);
      }}
      labelCol={{
        flex: '0 0 80px'
      }}
    >
      <ItemUserName label="用户名" name="userName" required />
      <ItemMobile label="手机号" name="mobile" required />
      <ItemIdCard label="身份证号" name="idCard" required />
      <ItemEmail label="邮箱" name="email" inputProps={{ placeholder: "请输入（选填）" }} />
      <ItemPassword label="密码" name="password" required />
      <ItemAddress label="地址" names={['location', 'address']} labels={['省/市/区', '详细地址']} required options={lcnFormInlandData} />
    </BizForm>
  );
}

export default RegisterDemo;
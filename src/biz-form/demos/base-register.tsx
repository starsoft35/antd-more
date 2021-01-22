import * as React from 'react';
import { BizForm } from 'antd-more';
import lcnFormInlandData from 'lcn/lcn-form-inland';

const { ItemInput, ItemAddress, ItemPassword } = BizForm;

const RegisterDemo: React.FC = () => {
  return (
    <BizForm
      name="base-register"
      onFinish={values => {
        console.log(values);
      }}
    >
      <ItemInput
        label="用户名"
        name="userName"
        type="userName"
        required
        extendRules={[
          {
            min: 6,
            max: 32,
            message: "用户名为6～32位"
          }
        ]}
      />
      <ItemInput label="手机号码" name="mobile" type="mobile" required />
      <ItemInput label="身份证号" name="idCard" type="idCard" required />
      <ItemInput label="邮箱" name="email" type="email" inputProps={{ placeholder: "请输入（选填）" }} />
      <ItemPassword label="密码" name="password" required />
      <ItemAddress label="地址" names={["location", "address"]} labels={["省/市/区", "详细地址"]} required options={lcnFormInlandData} />
    </BizForm>
  );
}

export default RegisterDemo;
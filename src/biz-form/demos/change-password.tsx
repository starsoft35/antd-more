import * as React from 'react';
import { BizForm, BizFormItem, BizFormItemPassword } from 'antd-more';
import { sleep } from 'ut2';

const Demo = () => {
  const [form] = BizForm.useForm();

  return (
    <BizForm
      submitter={{
        submitText: '确定',
        noReset: true
      }}
      onFinish={async (values) => {
        await sleep(2000);
        console.log(values);
      }}
      form={form}
      labelWidth={98}
      name="form-change-password"
    >
      <BizFormItem label="手机号码">13000000000</BizFormItem>
      <BizFormItem label="用户名">guest</BizFormItem>
      <BizFormItemPassword label="原密码" name="password" required validated={false} />
      <BizFormItemPassword
        label="新密码"
        name="newPassword"
        required
        dependencies={['password']}
        extendRules={[
          {
            validator(rules, value) {
              let errMsg = '';
              const oldPwd = form.getFieldValue('password');
              if (oldPwd && oldPwd === value) {
                errMsg = '新密码不能与原密码一致';
              }
              if (errMsg) {
                return Promise.reject(errMsg);
              }

              return Promise.resolve();
            }
          }
        ]}
      />
      <BizFormItemPassword
        label="重复新密码"
        name="repeatNewPassword"
        required
        dependencies={['newPassword']}
        rules={[
          {
            validator(rules, value) {
              let errMsg = '';
              if (!value) {
                errMsg = '请再次输入新密码';
              } else if (value !== form.getFieldValue('newPassword')) {
                errMsg = '两次输入的密码不一致';
              }
              if (errMsg) {
                return Promise.reject(errMsg);
              }
              return Promise.resolve();
            }
          }
        ]}
      />
    </BizForm>
  );
};

export default Demo;

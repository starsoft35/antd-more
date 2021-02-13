/**
 * title: 修改密码
 */
import * as React from 'react';
import { BizForm } from 'antd-more';

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const { ItemPassword, Item } = BizForm;

const Demo: React.FC = () => {
  const [form] = BizForm.useForm();

  return (
    <BizForm
      submitter={{
        submitText: '确定',
        noReset: true
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
      }}
      form={form}
      labelWidth={98}
      name="form-change-password"
    >
      <Item label="手机号码">13000000000</Item>
      <Item label="用户名">guest</Item>
      <ItemPassword
        label="原密码"
        name="oldPassword"
        required
        validated={false}
      />
      <ItemPassword
        label="新密码"
        name="password"
        required
        dependencies={['oldPassword']}
        extendRules={[
          {
            validator(rules, value) {
              let errMsg = '';
              const oldPwd = form.getFieldValue('oldPassword');
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
      <ItemPassword
        label="重复新密码"
        name="repeatPassword"
        required
        dependencies={['password']}
        rules={[
          {
            validator(rules, value) {
              let errMsg = '';
              if (!value) {
                errMsg = '请再次输入新密码';
              } else if (value !== form.getFieldValue('password')) {
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
}

export default Demo;
/**
 * title: 修改密码
 */
import * as React from 'react';
import { Form } from 'antd';
import { BizForm } from 'antd-more';

const { ItemInput, ItemPassword } = BizForm;

const Demo: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [form] = BizForm.useForm();
  const onFinish = React.useCallback((values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BizForm
      submitter={{
        submitText: '确定',
        noReset: true
      }}
      onFinish={onFinish}
      loading={loading}
      form={form}
      labelWidth={98}
      name="form-change-password"
    >
      <Form.Item label="手机号码">13000000000</Form.Item>
      <Form.Item label="用户名">guest</Form.Item>
      <ItemInput.Password
        label="原密码"
        name="oldPassword"
        required
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
      <ItemInput.Password
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
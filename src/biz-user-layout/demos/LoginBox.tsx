import * as React from 'react';
import { Card, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { waitTime } from 'util-helpers';
import { BizForm, BizFormItem, BizFormItemInput, BizFormItemPassword } from 'antd-more';

const LoginBox = () => {
  return (
    <Card
      title="账号密码登录"
      bordered={false}
      style={{ minWidth: 320 }}
      headStyle={{ border: '0 none', fontSize: 24 }}
      bodyStyle={{ paddingTop: 0 }}
    >
      <BizForm
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        submitter={{
          noReset: true,
          submitText: '登录',
          submitButtonProps: {
            size: 'large',
            block: true
          }
        }}
        hideLabel
        size="large"
      >
        <BizFormItemInput
          name="userName"
          inputProps={{
            prefix: <UserOutlined />,
            placeholder: '请输入用户名'
          }}
          label="用户名"
          required
        />
        <BizFormItemPassword
          name="password"
          inputProps={{
            prefix: <LockOutlined />,
            placeholder: '请输入密码'
          }}
          label="密码"
          required
          validated={false}
        />
        <BizFormItem>
          <BizFormItem noStyle name="autoLogin" valuePropName="checked">
            <Checkbox>自动登录</Checkbox>
          </BizFormItem>
          <a style={{ float: 'right' }}>忘记密码</a>
        </BizFormItem>
      </BizForm>
    </Card>
  );
};

export default LoginBox;

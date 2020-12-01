/**
 * title: 登录
 * desc: |
 *    该示例中未用到 `ItemUserName` `ItemPassword` 的校验，所以使用 `ItemInput` 。但是也可以基于 `ItemUserName` `ItemPassword` 覆盖 `rules` 。
 */
import * as React from 'react';
import { message } from 'antd';
import { BizForm } from 'antd-more';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';

const { ItemInput, ItemCaptcha, ItemMobile, ItemEmail } = BizForm;

function sendCaptcha(mobile) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  })
}

const LoginDemo: React.FC<{}> = () => {
  const [form] = BizForm.useForm();
  return (
    <div style={{ width: '80%', maxWidth: 320, margin: '0 auto' }}>
      <BizForm
        name='base-login'
        form={form}
        onFinish={values => {
          console.log(values);
        }}
        submitter={{
          render: (_, dom) => dom[0],
          submitText: '登录',
          submitButtonProps: {
            size: 'large',
            block: true,
          }
        }}
      >
        <ItemInput
          name="userName"
          inputProps={{
            prefix: <UserOutlined />,
            size: 'large',
            placeholder: "请输入用户名"
          }}
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        />
        <ItemInput.Password
          name="password"
          inputProps={{
            prefix: <LockOutlined />,
            size: 'large',
            placeholder: "请输入密码"
          }}
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        />
        <ItemEmail
          name='email'
          inputProps={{
            prefix: <MailOutlined />,
            size: 'large',
            placeholder: "请输入邮箱"
          }}
          validateTrigger="onChange"
          label='邮箱'
          labelCol={{ style: { display: 'none' } }}
          required
        />
        <ItemMobile
          name='mobile'
          inputProps={{
            prefix: <MobileOutlined />,
            size: 'large',
            placeholder: "请输入手机号码"
          }}
          validateTrigger="onChange"
          label='手机号码'
          labelCol={{ style: { display: 'none' } }}
          required
        />
        <ItemCaptcha
          name="captcha"
          inputProps={{
            prefix: <SafetyCertificateOutlined />,
            size: 'large',
            placeholder: '请输入验证码'
          }}
          buttonProps={{
            size: 'large'
          }}
          check={() => {
            // 验证手机号码或邮箱是否正确
            return form.validateFields(['mobile']).catch(() => {
              message.error('请输入正确的手机号码');
              return Promise.reject();
            });
          }}
          onGetCaptcha={() => {
            // 发送验证码
            return sendCaptcha(form.getFieldValue('mobile'));
          }}
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        />
      </BizForm>
    </div>
  );
}

export default LoginDemo;
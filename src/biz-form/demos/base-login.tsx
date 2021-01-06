/**
 * title: 登录
 * desc: |
 *    ItemCaptcha 组件执行顺序： `check` 方法验证手机号码或邮箱成功后，调用 `onGetCaptcha` 并设置按钮 `loading` 状态。当 `onGetCaptcha` 执行成功后，开始倒计时。
 */
import * as React from 'react';
import { message } from 'antd';
import { BizForm } from 'antd-more';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';

const { ItemInput, ItemCaptcha, ItemMobile, ItemEmail } = BizForm;

function sendCaptcha(mobile) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  })
}

const LoginDemo: React.FC<{}> = () => {
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
    <div style={{ width: '80%', maxWidth: 380, margin: '0 auto' }}>
      <BizForm
        name='form-login'
        form={form}
        loading={loading}
        onFinish={onFinish}
        submitter={{
          // render: (_, dom) => dom[0],
          noReset: true,
          submitText: '登录',
          submitButtonProps: {
            size: 'large',
            block: true,
          }
        }}
        labelCol={{ style: { display: 'none' } }}
        size="large"
      >
        <ItemInput
          name="userName"
          inputProps={{
            prefix: <UserOutlined />,
            placeholder: "请输入用户名"
          }}
          label='用户名'
          required
        />
        <ItemInput.Password
          name="password"
          inputProps={{
            prefix: <LockOutlined />,
            placeholder: "请输入密码"
          }}
          label='密码'
          required
        />
        <ItemEmail
          name='email'
          inputProps={{
            prefix: <MailOutlined />,
            placeholder: "请输入邮箱"
          }}
          validateTrigger="onChange"
          label='邮箱'
          required
        />
        <ItemMobile
          name='mobile'
          inputProps={{
            prefix: <MobileOutlined />,
            placeholder: "请输入手机号码"
          }}
          validateTrigger="onChange"
          label='手机号码'
          required
        />
        <ItemCaptcha
          name="captcha"
          inputProps={{
            prefix: <SafetyCertificateOutlined />,
            placeholder: '请输入验证码'
          }}
          required
          label="验证码"
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
        />
        <ItemInput
          name='verifyCode'
          inputProps={{
            prefix: <SafetyCertificateOutlined />,
            placeholder: "请输入图片验证码"
          }}
          after={<img src="http://img3.itboth.com/12/14/qAVNBz.jpg" style={{ height: 40, margin: 0 }} />}
          label='图片验证码'
          required
        />
      </BizForm>
    </div>
  );
}

export default LoginDemo;
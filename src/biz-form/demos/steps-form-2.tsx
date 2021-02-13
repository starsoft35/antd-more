import * as React from 'react';
import { SafetyCertificateOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { BizForm } from 'antd-more';

const { StepsForm, ItemInput, ItemCaptcha, ItemPassword } = BizForm;

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

const TipText: React.FC = ({ children }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: 24, fontSize: 16 }}>{children}</div>
  )
}

const Demo: React.FC = () => {
  const [sent, setSent] = React.useState(false);
  const [form1] = BizForm.useForm();
  const [form3] = BizForm.useForm();

  return (
    <StepsForm
      onFinish={values => {
        console.log(values);
      }}
      stepsFormRender={(stepsDom, formDom, submitterDom) => (
        <>
          <div style={{ width: "80%", minWidth: 375, margin: "0 auto" }}>{stepsDom}</div>
          <div style={{ maxWidth: 375, width: "100%", margin: "0 auto" }}>
            {formDom}
            {submitterDom}
          </div>
        </>
      )}
      submitter={{
        nextButtonProps: {
          size: "large",
          block: true
        },
        submitButtonProps: {
          size: "large",
          block: true
        }
      }}
    >
      <StepsForm.StepForm
        title="确认账号"
        form={form1}
        hideLabel
        size="large"
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
      >
        <TipText>请输入登录时的手机号码</TipText>
        <ItemInput
          label="手机号码"
          name="mobile"
          type="mobile"
          inputProps={{
            prefix: <MobileOutlined />,
            placeholder: "请输入手机号码"
          }}
          validateTrigger="onChange"
          required
        />
        <ItemInput
          label="图片验证码"
          name="verifyCode"
          inputProps={{
            prefix: <SafetyCertificateOutlined />,
            placeholder: "请输入图片验证码"
          }}
          after={<img src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wgARCAAoAIsDAREAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwQD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA2UAAFdPQngRhwlhAAAAABlZoZIg8ChGiAiziLCACCM8NPJEopegCJKgaKDyM/NFABVivltJwAAAAz8ly0gAHIdYAAAAAAP/EADkQAAEDAQMGCwYHAAAAAAAAAAMCBAUTAAYSAQcQICIjERQwMjM0QlJiksIVFiVyhLIXJDZDUVSi/9oACAEBAAE/ANY18oRq9KyI74XTfpRCCQlLyos0vZEujjbgKeqTYRwtCo9OmWmmcOIa3xCox9wJCfZaNvnCy50Cjntcq9jdiJg8+DlYB8dhnRvattGu39Sn1anu/OtNox8Z+EizR7tnt8xzT9C1aXfVi/JbMn+g/qSaZe8EVB0/aj8DOp0dWwr83aOUYQTTJZSbCN7q3sXLogXK4EYiPsG7qejx2L7r+7Q1xjl37fr7vo+P16nbR89oZT8kU3XKjEN9+7kHouxDvmecS8z9y1KNq7p0i9/UmZFbIGwwePKmNH5an61ptmwHI3ehBxD+FfoKs5CVdin9+ki0DHlWvmIsYf4jTTVYRUoOLc1Buf7RE9zwat/gzJ7puEQPT9vv4PB47P310l3B4kz+mai65X7GxzseO11RyoLvNkTxAkfdun/nks5GWUJliGjJq7cRpy/EeLCXUppWju7dmF5WIxCaAjJgQtgY/hpx63EGaCY0NQ5CfzS5f//EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQIBAT8ANf/EABQRAQAAAAAAAAAAAAAAAAAAAGD/2gAIAQMBAT8ANf/Z" style={{ height: 40, margin: 0 }} alt="" />}
          required
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="安全验证"
        hideLabel
        size="large"
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        submitter={{
          noPrev: true
        }}
      >
        <TipText>{sent ? `验证码已发送至 ${form1.getFieldValue('mobile')}` : '请点击获取验证码'}</TipText>
        <ItemCaptcha
          label="短信验证码"
          name="code"
          type="inline"
          onGetCaptcha={async () => {
            await waitTime(2000);
            setSent(true);
          }}
          inputProps={{
            prefix: <SafetyCertificateOutlined />,
            placeholder: "短信验证码"
          }}
          required
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="重置密码"
        hideLabel
        size="large"
        form={form3}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
        }}
        submitter={{
          noPrev: true
        }}
      >
        <TipText>设置新密码</TipText>
        <ItemPassword
          label="新密码"
          name="password"
          inputProps={{
            prefix: <LockOutlined />,
            placeholder: "请输入新密码"
          }}
          required
        />
        <ItemPassword
          label="确认密码"
          name="repeatPassword"
          dependencies={["password"]}
          inputProps={{
            prefix: <LockOutlined />,
            placeholder: "请再次输入新密码"
          }}
          rules={[
            {
              validator(rules, value) {
                let errMsg = '';
                if (!value) {
                  errMsg = '请再次输入新密码';
                } else if (value !== form3.getFieldValue('password')) {
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
      </StepsForm.StepForm>
    </StepsForm>
  );
}

export default Demo;
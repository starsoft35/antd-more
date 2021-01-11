import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemCaptcha } = BizForm;

function checkNumber() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  })
}

function sendCode() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

const Demo: React.FC<{}> = () => {
  return (
    <BizForm
      name='form-item-captcha-1'
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemCaptcha label="验证码1" name="captcha1" check={checkNumber} onGetCaptcha={sendCode} />
      <ItemCaptcha label="验证码2" name="captcha2" second={120} check={checkNumber} onGetCaptcha={sendCode} required />
    </BizForm>
  );
}

export default Demo;
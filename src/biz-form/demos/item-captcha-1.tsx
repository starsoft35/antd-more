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

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-captcha-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemCaptcha label="验证码1" name="captcha1" check={checkNumber} onGetCaptcha={sendCode} />
      <ItemCaptcha label="内联验证码2" name="captcha2" type="inline" check={checkNumber} onGetCaptcha={sendCode} />
      <ItemCaptcha label="验证码3" name="captcha3" second={120} check={checkNumber} onGetCaptcha={sendCode} required />
      <ItemCaptcha
        label="自定义文本"
        name="captcha4"
        check={checkNumber}
        onGetCaptcha={sendCode}
        required
        initText="初始文本"
        runText="倒计时%ss"
        resetText="重新倒计时"
        inputProps={{
          placeholder: "6位数验证码",
          maxLength: 6
        }}
      />
    </BizForm>
  );
}

export default Demo;
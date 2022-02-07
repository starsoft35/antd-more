import * as React from 'react';
import { BizForm, BizFormItemSwitch } from 'antd-more';

const Demo = () => {
  return (
    <BizForm
      name="form-item-switch-1"
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <BizFormItemSwitch label="开关1" name="switch1" />
      <BizFormItemSwitch
        label="开关2"
        name="switch3"
        checkedChildren="开启"
        unCheckedChildren="关闭"
      />
    </BizForm>
  );
};

export default Demo;

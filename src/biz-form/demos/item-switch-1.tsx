import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemSwitch } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-switch-1"
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <ItemSwitch label="开关1" name="switch1" />
      <ItemSwitch label="开关2" name="switch3" checkedChildren="开启" unCheckedChildren="关闭" />
    </BizForm>
  );
};

export default Demo;

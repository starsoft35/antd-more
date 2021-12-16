import * as React from 'react';
import { InputIcon, BizForm } from 'antd-more';
import icons from './icons';

const Demo = () => {
  return (
    <BizForm
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <BizForm.Item label="图标" name="icon">
        <InputIcon iconData={icons} />
      </BizForm.Item>
    </BizForm>
  );
};

export default Demo;

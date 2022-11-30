import * as React from 'react';
import { InputIcon, BizForm, BizFormItem } from 'antd-more';
import icons from './icons';

const Demo = () => {
  return (
    <BizForm
      name="input-icon-define-icon"
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <BizFormItem label="图标" name="icon">
        <InputIcon iconData={icons} />
      </BizFormItem>
    </BizForm>
  );
};

export default Demo;

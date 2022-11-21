import * as React from 'react';
import { InputIcon, InputIconsMap, BizForm, BizFormItem } from 'antd-more';

const Demo = () => {
  return (
    <BizForm
      name="input-icon-bizform-1"
      onFinish={(values) => {
        console.log(values);
      }}
    >
      <BizFormItem label="图标" name="icon">
        <InputIcon iconData={InputIconsMap} />
      </BizFormItem>
    </BizForm>
  );
};

export default Demo;

import * as React from 'react';
import { InputIcon, BizForm, BizFormItem } from 'antd-more';
import icons from 'antd-more/es/input-icon/icons';

const Demo = () => {
  return (
    <BizForm
      name="input-icon-bizform-1"
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

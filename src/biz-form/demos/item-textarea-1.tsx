import * as React from 'react';
import { BizForm, BizFormItemTextArea } from 'antd-more';

const Demo = () => {
  return (
    <BizForm
      name="form-item-textarea-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <BizFormItemTextArea label="TextArea" name="textarea1" />
      <BizFormItemTextArea label="必填项" name="textarea2" required />
      <BizFormItemTextArea
        label="自定义"
        name="textarea4"
        disabledWhiteSpace
        maxLength={100}
        showCount
      />
    </BizForm>
  );
};

export default Demo;

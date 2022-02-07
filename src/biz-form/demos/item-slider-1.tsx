import * as React from 'react';
import { BizForm, BizFormItemSlider } from 'antd-more';

const Demo = () => {
  return (
    <BizForm
      name="form-item-slider-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={112}
    >
      <BizFormItemSlider label="滑块输入条1" name="slider1" />
      <BizFormItemSlider label="滑块输入条2" name="slider2" min={0} max={10} />
    </BizForm>
  );
};

export default Demo;

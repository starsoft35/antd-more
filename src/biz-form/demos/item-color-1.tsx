import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemColor } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-color-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemColor label="颜色" name="color1" showText />
      <ItemColor label="rgb" name="color2" showText colorMode="rgb" />
      <ItemColor label="hover" name="color3" trigger="hover" showText />
      <ItemColor label="颜色必选" name="color4" showText required />
      <ItemColor label="block" name="color5" showText picker="block" />
      <ItemColor label="chrome" name="color6" showText picker="chrome" />
      <ItemColor label="compact" name="color7" showText picker="compact" />
      <ItemColor label="photoshop" name="color8" showText picker="photoshop" />
    </BizForm>
  );
}

export default Demo;
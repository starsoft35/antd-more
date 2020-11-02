/**
 * title: 显示颜色
 * desc: 设置 `showText` 显示颜色值
 */

import React from 'react';
import { Color } from 'antd-more';

export default () => {
  return (
    <>
      <Color value="#e60000" />
      <br />
      <Color value="#e60000" showText />
    </>
  );
};

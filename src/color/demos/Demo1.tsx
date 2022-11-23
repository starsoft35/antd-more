import React from 'react';
import { Color } from 'antd-more';

export default () => {
  return (
    <>
      <Color />
      <br />
      <Color value="#e60000" />
      <br />
      <Color value="#e60000" showText />
      <br />
      <Color value="#e60000" size="middle" />
      <br />
      <Color value="#e60000" size="middle" showText />
    </>
  );
};

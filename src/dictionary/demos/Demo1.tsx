import React from 'react';
import { Dictionary } from 'antd-more';
import { ApproveStatusOptions } from './constants';

export default () => {
  return <Dictionary valueEnum={ApproveStatusOptions} value="1" />;
};

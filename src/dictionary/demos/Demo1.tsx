/**
 * title: 字典值
 * desc: 自动将 `value` 对应的 `label` 显示
 */

import React from 'react';
import { Dictionary } from 'antd-more';
import { ApproveStatusOptions } from './constants';

export default () => {
  return <Dictionary valueEnum={ApproveStatusOptions} value="1" />;
};

/**
 * title: 字典值
 * desc: 自动将 `value` 对应的 `name` 显示
 */

import React from "react";
import { Dictionary } from "antd-more";

const ApproveStatus = [
  {
    value: 1,
    name: '审核中'
  },
  {
    value: 2,
    name: '审核通过'
  },
  {
    value: 3,
    name: '审核不通过'
  },
];

export default () => {
  return <Dictionary data={ApproveStatus} value={1} />
}
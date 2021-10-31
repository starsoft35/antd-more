/**
 * title: 字典值
 * desc: 自动将 `value` 对应的 `label` 显示
 */

import React from "react";
import { Dictionary } from "antd-more";

const ApproveStatus = [
  {
    value: 1,
    label: '审核中'
  },
  {
    value: 2,
    label: '审核通过'
  },
  {
    value: 3,
    label: '审核不通过'
  },
];

export default () => {
  return <Dictionary data={ApproveStatus} value={1} />
}
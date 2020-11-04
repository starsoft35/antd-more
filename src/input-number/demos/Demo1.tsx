/**
 * title: 基础用法
 * desc: |
 *  使用 `before` `after` 可分别设置前后元素
 */

import React from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { InputNumber } from "antd-more";

export default () => {
  return (
    <>
      <InputNumber placeholder="请输入0~100数值" after="%" precision={2} min={0} max={100} />
      <br />
      <InputNumber
        placeholder="请输入金额"
        before={<Tooltip title="文字提示"><InfoCircleOutlined /></Tooltip>}
        after="元"
        precision={2}
        min={0}
      />
    </>
  )
}
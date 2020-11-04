/**
 * title: 多个枚举
 * desc: |
 *  外层包裹 `Space` 组件，可配置 `align` `direction` `size`。
 * 
 *  其中 `value` 变为一个字段值数组，`defaultValue` 仅在 `value` 为非数组或长度小于0时显示。其他参数用于配置和 `Dictionary`。
 */

import React from "react";
import { Divider } from "antd";
import { Dictionary } from "antd-more";

const enumCategory = [
  {
    value: 1,
    name: '动物',
    tag: {
      color: "orange"
    }
  },
  {
    value: 2,
    name: '植物',
    tag: {
      color: "green"
    }
  },
  {
    value: 3,
    name: '微生物',
    custom: {
      color: "purple"
    }
  },
];

export default () => {
  return (
    <>
      <Divider orientation="left">empty</Divider>
      <p>当 value 为空或长度小于0，显示 defaultValue。注意区分 Dictionary 的 defaultName</p>
      <Dictionary.List data={enumCategory} value={[]} />
      <br />
      <Dictionary.List data={enumCategory} value={[]} defaultValue="empty" />
      <Divider orientation="left">text</Divider>
      <Dictionary.List data={enumCategory} value={[1, 2]} />
      <br />
      <Dictionary.List data={enumCategory} value={[2, 3]} />
      <br />
      <Dictionary.List data={enumCategory} value={[1, 2, 3]} />
      <br />
      <Divider orientation="left">tag</Divider>
      <Dictionary.List data={enumCategory} value={[1, 2]} type="tag" />
      <br />
      <Dictionary.List data={enumCategory} value={[2, 3]} type="tag" />
      <br />
      <Dictionary.List data={enumCategory} value={[1, 2, 3]} type="tag" />
    </>
  )
}
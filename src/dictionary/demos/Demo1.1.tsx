/**
 * title: 多种展示方式
 * desc: |
 *  通过 `type` 设置展示方式，支持 `text` `tag` `badge` ，默认为 `text` 。
 * 
 *  在数据字典中配置 `props`，默认读取 `type` 对应的配置项，也可以传入 `optionName` 自定义读取配置名。还有个特别的属性 `alias` 可以替换 `name`。当然也支持在组件中传入 `props`，而且这个优先级是最高的。
 * 
 *  *注意：如果展示 `badge`，一定要有 `status` 或 `color`，不然可能显示不了。*
 * 
 */

import React from "react";
import { Divider } from "antd";
import { Dictionary } from "antd-more";

const ApproveStatus = [
  {
    value: 1,
    name: '审核中',
    badge: {
      status: "processing"
    },
    tag: {
      alias: "待审核",
      color: "orange"
    }
  },
  {
    value: 2,
    name: '审核通过',
    text: {
      style: {
        color: "green"
      }
    },
    badge: {
      status: "success"
    },
    tag: {
      color: "green"
    }
  },
  {
    value: 3,
    name: '审核不通过',
    text: {
      style: {
        color: "red"
      }
    },
    badge: {
      status: "error"
    },
    tag: {
      color: "red"
    },
    custom: {
      color: "purple"
    }
  },
];

export default () => {
  return (
    <>
      <Divider orientation="left">empty or noMatch</Divider>
      <Dictionary data={ApproveStatus} value={5} />
      <br />
      <Dictionary data={ApproveStatus} value={5} defaultName="noMatch value" />
      <br />
      <Divider orientation="left">text</Divider>
      <Dictionary data={ApproveStatus} value={1} />
      <br />
      <Dictionary data={ApproveStatus} value={2} />
      <br />
      <Dictionary data={ApproveStatus} value={3} />
      <br />
      <Divider orientation="left">tag</Divider>
      <Dictionary data={ApproveStatus} value={1} type="tag" />
      <br />
      <Dictionary data={ApproveStatus} value={2} type="tag" />
      <br />
      <Dictionary data={ApproveStatus} value={3} type="tag" />
      <br />
      <Divider orientation="left">badge</Divider>
      <Dictionary data={ApproveStatus} value={1} type="badge" />
      <br />
      <Dictionary data={ApproveStatus} value={2} type="badge" />
      <br />
      <Dictionary data={ApproveStatus} value={3} type="badge" />
      <br />
      <Divider orientation="left">自定义</Divider>
      <Dictionary data={ApproveStatus} value={3} optionName="custom" />
      <br />
      <Dictionary data={ApproveStatus} value={3} type="tag" optionName="custom" />
      <br />
      <Dictionary data={ApproveStatus} value={3} type="badge" optionName="custom" />
    </>
  )
}
/**
 * title: 选择字典值
 */

import React, { useState } from "react";
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
  const [value, setValue] = useState<any>();

  return (
    <>
      <Dictionary.Select data={ApproveStatus} value={value} onChange={setValue} all={false} style={{ width: 200 }} />
      <br />
      <br />
      <div>
        current value:
        {value}
      </div>
    </>
  )
}

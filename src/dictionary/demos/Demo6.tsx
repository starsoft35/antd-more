/**
 * title: 单选
 * desc: 数据中包含 `disabled` 将禁止选择该项。还可以通过指定 `type='button'` 修改显示。
 */

import React, { useState, useCallback } from "react";
import { Dictionary } from "antd-more";

const OrgType = [
  {
    value: '0',
    name: '小学'
  },
  {
    value: '1',
    name: '初中'
  },
  {
    value: '2',
    name: '高中'
  },
  {
    value: '3',
    name: '大学',
    disabled: true
  },
];

export default () => {
  const [value, setValue] = useState(OrgType[0].value);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <Dictionary.Radio data={OrgType} value={value} onChange={handleChange} />
      <br />
      <br />
      <Dictionary.Radio data={OrgType} value={value} onChange={handleChange} type="button" />
    </>
  )
}

/**
 * title: 单选
 * desc: 数据中包含 `disabled` 将禁止选择该项。还可以通过指定 `type='button'` 修改显示。
 */

import React, { useState, useCallback } from 'react';
import { Dictionary } from 'antd-more';

const OrgTypeOptions = [
  {
    value: '0',
    label: '小学'
  },
  {
    value: '1',
    label: '初中'
  },
  {
    value: '2',
    label: '高中'
  },
  {
    value: '3',
    label: '大学',
    disabled: true
  }
];

export default () => {
  const [value, setValue] = useState(OrgTypeOptions[0].value);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <Dictionary.Radio data={OrgTypeOptions} value={value} onChange={handleChange} />
      <br />
      <br />
      <Dictionary.Radio data={OrgTypeOptions} value={value} onChange={handleChange} type="button" />
    </>
  );
};

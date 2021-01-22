import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemSelect } = BizForm;

// 周期
const cycle = [
  {
    name: "按日",
    value: "0"
  },
  {
    name: "按月",
    value: "1"
  },
  {
    name: '按季度',
    value: '2'
  },
];

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-select-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemSelect label="选择器1" name="select1" options={cycle} />
      <ItemSelect label="选择器2" name="select2" options={cycle} required />
      <ItemSelect label="排除项" name="select3" options={cycle} all allValue={["1", "2"]} excludeValues={["0"]} tooltip="包含全部，并且排除按日" />
    </BizForm>
  );
}

export default Demo;
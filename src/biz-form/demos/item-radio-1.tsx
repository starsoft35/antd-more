import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemRadio } = BizForm;

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
      name="form-item-radio-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemRadio label="单选框1" name="radio1" options={cycle} />
      <ItemRadio label="单选框2" name="radio2" options={cycle} required />
      <ItemRadio label="排除项" name="radio3" options={cycle} all allName="全全全部" allValue={["1", "2"]} excludeValues={["0"]} tooltip="包含全部，并且排除按日" />
    </BizForm>
  );
}

export default Demo;
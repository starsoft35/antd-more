import * as React from "react";
import { BizForm } from "antd-more";

const { ItemRadio } = BizForm;

enum Cycle {
  Day,
  Month,
  Quarter
}

// 周期
const cycleOptions = [
  {
    name: "按日",
    value: Cycle.Day
  },
  {
    name: "按月",
    value: Cycle.Month
  },
  {
    name: "按季度",
    value: Cycle.Quarter
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
      <ItemRadio label="单选框1" name="radio1" options={cycleOptions} />
      <ItemRadio label="单选框2" name="radio2" options={cycleOptions} required />
      <ItemRadio label="单选框按钮" name="radio3" options={cycleOptions} optionType="button" />
      <ItemRadio label="排除项" name="radio4" options={cycleOptions} all allName="全全全部" allValue={["1", "2"]} excludeValues={["0"]} tooltip="包含全部，并且排除按日" />
    </BizForm>
  );
}

export default Demo;
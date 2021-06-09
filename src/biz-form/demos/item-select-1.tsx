import * as React from "react";
import { BizForm } from "antd-more";

const { ItemSelect } = BizForm;

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
      name="form-item-select-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemSelect label="选择器1" name="select1" options={cycleOptions} />
      <ItemSelect label="选择器2" name="select2" options={cycleOptions} required />
      <ItemSelect label="排除项" name="select3" options={cycleOptions} all allValue={["1", "2"]} excludeValues={["0"]} tooltip="包含全部，并且排除按日" />
    </BizForm>
  );
}

export default Demo;
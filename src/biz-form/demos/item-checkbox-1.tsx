import * as React from "react";
import { BizForm } from "antd-more";

const { ItemCheckbox } = BizForm;

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
      name="form-item-checkbox-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemCheckbox label="多选框1" name="checkbox1" options={cycleOptions} />
      <ItemCheckbox label="多选框2" name="checkbox2" options={cycleOptions} all required />
      <ItemCheckbox label="排除项" name="checkbox3" options={cycleOptions} all allName="全全全部" excludeValues={["2"]} required />
    </BizForm>
  );
}

export default Demo;
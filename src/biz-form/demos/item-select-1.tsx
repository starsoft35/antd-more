import * as React from "react";
import { BizForm } from "antd-more";
import { Cycle, CycleOptions } from './constants';

const { ItemSelect } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-select-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemSelect label="选择器1" name="select1" options={CycleOptions} />
      <ItemSelect label="选择器2" name="select2" options={CycleOptions} required all />
      <ItemSelect label="排除项" name="select3" options={CycleOptions} all allValue={[Cycle.Month, Cycle.Quarter]} excludeValues={[Cycle.Day]} tooltip="包含全部，并且排除按日" />
    </BizForm>
  );
}

export default Demo;
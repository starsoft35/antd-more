import * as React from 'react';
import { BizForm } from 'antd-more';
import { Cycle, CycleOptions } from './constants';

const { ItemRadio } = BizForm;

const Demo = () => {
  return (
    <BizForm
      name="form-item-radio-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemRadio label="单选框1" name="radio1" options={CycleOptions} />
      <ItemRadio label="单选框2" name="radio2" options={CycleOptions} required />
      <ItemRadio label="单选框按钮" name="radio3" options={CycleOptions} optionType="button" />
      <ItemRadio
        label="排除项"
        name="radio4"
        options={CycleOptions}
        all
        allLabel="全全全部"
        allValue={[Cycle.Month, Cycle.Quarter]}
        excludeValues={[Cycle.Day]}
        tooltip="包含全部，并且排除按日"
      />
    </BizForm>
  );
};

export default Demo;

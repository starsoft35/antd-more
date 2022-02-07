import * as React from 'react';
import { BizForm, BizFormItemRadio } from 'antd-more';
import { Cycle, CycleOptions } from './constants';

const Demo = () => {
  return (
    <BizForm
      name="form-item-radio-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <BizFormItemRadio label="单选框1" name="radio1" options={CycleOptions} />
      <BizFormItemRadio label="单选框2" name="radio2" options={CycleOptions} required />
      <BizFormItemRadio
        label="单选框按钮"
        name="radio3"
        options={CycleOptions}
        optionType="button"
      />
      <BizFormItemRadio
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

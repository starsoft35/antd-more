import * as React from 'react';
import { BizForm } from 'antd-more';
import { Cycle, CycleOptions } from './constants';

const { ItemCheckbox } = BizForm;

const Demo = () => {
  return (
    <BizForm
      name="form-item-checkbox-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemCheckbox label="多选框1" name="checkbox1" options={CycleOptions} />
      <ItemCheckbox label="多选框2" name="checkbox2" options={CycleOptions} all required />
      <ItemCheckbox
        label="排除项"
        name="checkbox3"
        options={CycleOptions}
        all
        allLabel="全全全部"
        excludeValues={[Cycle.Month]}
        required
      />
    </BizForm>
  );
};

export default Demo;

import * as React from 'react';
import { BizForm } from 'antd-more';

const options = [
  {
    label: 'male',
    value: 'male'
  },
  {
    label: 'female',
    value: 'female'
  },
  {
    label: 'other',
    value: 'other'
  }
];

interface DemoProps {

}

const Demo: React.FC<DemoProps> = () => {
  return (
    <BizForm>
      <BizForm.ItemInput name='note' label='Note' required />
      <BizForm.ItemSelect name='gender' label='Gender' options={options} required selectProps={{ allowClear: true }} />
      <BizForm.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) => {
          console.log('111');
          return getFieldValue('gender') === 'other' ? (
            <BizForm.ItemInput name="customizeGender" label="Customize Gender" required />
          ) : null
        }}
      </BizForm.Item>
    </BizForm>
  );
}

export default Demo;
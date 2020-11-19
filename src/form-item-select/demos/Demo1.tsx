import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemSelect } from 'antd-more';

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const buttonLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  }
}

const options = [
  {
    name: 'Jack',
    value: 'jack'
  },
  {
    name: 'Lucy',
    value: 'lucy'
  }
];

const options2 = [
  {
    label: 'Manager',
    options: [
      {
        name: 'Jack',
        value: 'jack'
      },
      {
        name: 'Lucy',
        value: 'lucy'
      }
    ]
  },
  {
    label: 'Engineer',
    options: [
      {
        name: 'Bob',
        value: 'bob'
      }
    ]
  },
];

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form
        name='form-item-select-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemSelect name="select" label="Select" options={options} />
        <FormItemSelect name="required" label="Required" required options={options} />
        <FormItemSelect name="selectGroup" label="SelectGroup" options={options2} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
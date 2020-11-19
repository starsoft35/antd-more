import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemRadio } from 'antd-more';

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

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form
        name='form-item-radio-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemRadio name="radio" label="Radio" options={options} />
        <FormItemRadio name="required" label="Required" required options={options} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
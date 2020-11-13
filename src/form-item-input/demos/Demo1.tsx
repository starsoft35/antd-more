/**
 * title: 基础用法
 * desc: |
 *    没有默认的 `label` `name`
 */
import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemInput } from 'antd-more';

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

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form
        name='form-item-input-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemInput label='Input' name='input' />
        <FormItemInput.Password label='Password' name='password' />
        <FormItemInput.TextArea label='TextArea' name='textarea' />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
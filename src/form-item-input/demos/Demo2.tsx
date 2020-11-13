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
        name='form-item-input-demo2'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemInput label='姓名' name='name' required disabledWhiteSpace />
        <FormItemInput label='编号' name='number' disabledWhiteSpace />
        <FormItemInput.Password label='密码' name='password' required />
        <FormItemInput.TextArea label='备注' name='remark' />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
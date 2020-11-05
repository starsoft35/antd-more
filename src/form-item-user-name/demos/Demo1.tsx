/**
 * title: 基础用法
 * desc: |
 *    默认 `label: '用户名', name: 'userName', required: true, validateTrigger: 'onBlur'`
 */
import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemUserName } from 'antd-more';

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
        name='form-item-user-name-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemUserName />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
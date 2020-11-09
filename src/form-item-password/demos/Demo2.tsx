/**
 * title: 不同规则
 * desc: |
 *    4～8位字符，包含大小写字母、数字和符号( `><?-=` )三者组成。
 */
import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemPassword } from 'antd-more';

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
        name='form-item-password-demo2'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemPassword required min={4} max={8} special='><?-=' level={3} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
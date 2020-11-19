import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemAddress } from 'antd-more';
import lcnFormInlandData from 'lcn/lcn-form-inland';

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
        name='form-item-address-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemAddress
          label="地址"
          names={['location', 'address']}
          labels={['省/市/区', '详细地址']}
          options={lcnFormInlandData}
        />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
import * as React from 'react';
import { Form, Button } from 'antd';
import { FormItemDate } from 'antd-more';

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
        name='form-item-date-demo2'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemDate label="生日" name="date1" required extra="必填" />
        <FormItemDate label="交易日期" name="date2" disabledDateAfter={0} extra="当日及以后日期不可选" />
        <FormItemDate label="订单日期" name="date3" disabledDateBefore={-365} disabledDateAfter={1} extra="一年以前和今天以后日期不可选" />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
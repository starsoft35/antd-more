/**
 * title: 基础用法
 * desc: |
 *    默认 `label: '日期', name: 'date'`
 */
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
        name='form-item-date-demo1'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemDate />
        <FormItemDate name="date2" label="周" pickerProps={{ picker: 'week' }} />
        <FormItemDate name="date3" label="月" pickerProps={{ picker: 'month' }} />
        <FormItemDate name="date4" label="季" pickerProps={{ picker: 'quarter' }} />
        <FormItemDate name="date5" label="年" pickerProps={{ picker: 'year' }} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
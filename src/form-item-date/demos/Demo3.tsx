/**
 * title: 日期范围
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
        name='form-item-date-demo3'
        onFinish={onFinish}
        {...formLayout}
      >
        <FormItemDate.Range />
        <FormItemDate.Range label='周' name='date1' pickerProps={{picker: 'week'}} />
        <FormItemDate.Range label='月' name='date2' pickerProps={{picker: 'month'}} />
        <FormItemDate.Range label='季' name='date3' pickerProps={{picker: 'quarter'}} />
        <FormItemDate.Range label='年' name='date4' pickerProps={{picker: 'year'}} />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
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

// 审核状态
const approveStatus = [
  {
    name: "待审核",
    value: 1
  },
  {
    name: "审核通过",
    value: 2
  },
  {
    name: "审核拒绝",
    value: 3
  },
];

// 周期
const cycle = [
  {
    name: "按日",
    value: "0"
  },
  {
    name: "按月",
    value: "1"
  },
  {
    name: '按季度',
    value: '2'
  },
];

const Demo: React.FC<{}> = () => {
  const [result, setResult] = React.useState();
  const onFinish = React.useCallback((values) => {
    setResult(values);
  }, []);
  const initialValues = {
    approveStatus: 1,
    approveStatus2: '',
    approveStatus3: null
  }

  return (
    <>
      <Form
        name='form-item-radio-demo1'
        onFinish={onFinish}
        initialValues={initialValues}
        {...formLayout}
      >
        <FormItemRadio name="cycle" label="周期" options={cycle} required />
        <FormItemRadio name="approveStatus" label="审核状态" options={approveStatus} />
        <FormItemRadio name="approveStatus2" label="审核状态2" options={approveStatus} all extra="包含全部" />
        <FormItemRadio name="approveStatus3" label="审核状态3" options={approveStatus} excludeValues={[1]} all allValue={null} extra="包含全部，并且排除审核中" />
        <Form.Item {...buttonLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
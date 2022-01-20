/**
 * title: Form 中使用 Radio
 */

import React, { useState, useCallback } from 'react';
import { Form, Button } from 'antd';
import { Dictionary } from 'antd-more';

const OrgTypeOptions = [
  {
    value: '0',
    label: '小学'
  },
  {
    value: '1',
    label: '初中'
  },
  {
    value: '2',
    label: '高中'
  },
  {
    value: '3',
    label: '大学',
    disabled: true
  }
];

const formItemLayouts = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const buttonItemLayouts = {
  wrapperCol: { span: 16, offset: 6 }
};

const initialValues = { school: OrgTypeOptions[0].value };

export default () => {
  const [result, setResult] = useState(initialValues);
  const onFinish = useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form {...formItemLayouts} initialValues={initialValues} onFinish={onFinish} name="radio_1">
        <Form.Item label="学校" name="school">
          <Dictionary.Radio data={OrgTypeOptions} />
        </Form.Item>
        <Form.Item {...buttonItemLayouts}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <br />
      <div>
        form values:
        {JSON.stringify(result)}
      </div>
    </>
  );
};

/**
 * title: antd Form 中使用
 */

import React, { useState, useCallback } from 'react';
import { Form, Button } from 'antd';
import { ColorBlockPicker, ColorSketchPicker } from 'antd-more';

const formItemLayouts = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const buttonItemLayouts = {
  wrapperCol: { span: 16, offset: 6 }
};

const initialValues = {
  color1: '#e60000',
  color2: 'rgba(255,127,0,1)'
};

export default () => {
  const [result, setResult] = useState(initialValues);
  const onFinish = useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form {...formItemLayouts} initialValues={initialValues} onFinish={onFinish}>
        <Form.Item label="颜色1" name="color1">
          <ColorBlockPicker showText />
        </Form.Item>
        <Form.Item label="颜色2" name="color2">
          <ColorSketchPicker colorMode="rgb" placement="topLeft" size="middle" />
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

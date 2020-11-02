/**
 * title: antd Form 中使用
 */

import React, { useState, useCallback } from 'react';
import { Form, Button } from 'antd';
import { Color } from 'antd-more';

const formItemLayouts = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const buttonItemLayouts = {
  wrapperCol: { span: 16, offset: 6 },
};

const initialValues = {
  bgColor: '#e60000',
  textColor: 'rgba(255,127,0,1)',
};

export default () => {
  const [result, setResult] = useState(initialValues);
  const onFinish = useCallback((values) => {
    setResult(values);
  }, []);

  return (
    <>
      <Form {...formItemLayouts} initialValues={initialValues} onFinish={onFinish}>
        <Form.Item label="背景颜色" name="bgColor">
          <Color.BlockPicker showText />
        </Form.Item>
        <Form.Item label="文本颜色" name="textColor">
          <Color.SketchPicker colorMode="rgb" placement="topLeft" />
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
}
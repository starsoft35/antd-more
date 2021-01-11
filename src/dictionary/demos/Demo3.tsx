/**
 * title: antd Form 中使用
 * desc: 全部的值默认为 `""`，可通过 `allValue` 进行设置
 */

import React, { useState, useCallback } from "react";
import { Form, Button } from "antd";
import { Dictionary } from "antd-more";

const ApproveStatus = [
  {
    value: 1,
    name: '审核中'
  },
  {
    value: 2,
    name: '审核通过'
  },
  {
    value: 3,
    name: '审核不通过'
  },
];

const formItemLayouts = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

const buttonItemLayouts = {
  wrapperCol: { span: 16, offset: 6 }
}

const initialValues = {};

export default () => {
  const [result, setResult] = useState(initialValues);
  const onFinish = useCallback(values => {
    setResult(values);
  }, []);

  return (
    <>
      <Form
        {...formItemLayouts}
        initialValues={initialValues}
        onFinish={onFinish}
        name="select_1"
      >
        <Form.Item label="审核状态" name="status">
          <Dictionary.Select data={ApproveStatus} />
        </Form.Item>
        <Form.Item {...buttonItemLayouts}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <br />
      <div>
        form values:
        {JSON.stringify(result)}
      </div>
    </>
  )
}

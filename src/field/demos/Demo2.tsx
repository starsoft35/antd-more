import React from "react";
import { Form, Row, Col } from "antd";
import { InputNumber } from "antd-more";

const twoColSpan = {
  span: 24,
  md: 12,
  xl: 8
};

export default () => {
  return (
    <Form>
      <Row>
        <Col {...twoColSpan}>
          <Form.Item
            label="费率"
            name="alipayFee"
            rules={[
              {
                required: true,
                message: "请输入费率"
              },
              {
                min: 0.01,
                max: 99.99,
                type: "number",
                message: "须大于0，小于100"
              }
            ]}
            validateFirst
            validateTrigger="onBlur"
          >
            <InputNumber placeholder="请输入" precision={2} after="%" />
          </Form.Item>
        </Col>
        <Col {...twoColSpan}>
          <Form.Item
            label="封顶金额"
            name="maxFee"
            rules={[
              {
                required: true,
                message: "请输入封顶金额"
              },
              {
                min: 1,
                type: "number",
                message: "须大于等于1"
              }
            ]}
            validateFirst
            validateTrigger="onBlur"
          >
            <InputNumber placeholder="请输入" after="元/笔" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
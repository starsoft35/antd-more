import * as React from 'react';
import { Form, Cascader, Input, Row, Col, Button } from 'antd';

export interface DemoProps {

}

const Demo: React.FC<DemoProps> = () => {
  const onFinish = React.useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Form
      onFinish={onFinish}
    >
      <Form.Item label="地址" required style={{ marginBottom: 0 }}>
        <Row gutter={10}>
          <Col span={24} md={12} lg={7}>
            <Form.Item
              name="cascader"
              // noStyle
              rules={[
                {
                  required: true,
                  message: '请选择xxx'
                }
              ]}
            >
              <Cascader />
            </Form.Item>
          </Col>
          <Col span={24} md={12} lg={17}>
            <Form.Item
              name="input"
              // noStyle
              rules={[
                {
                  required: true,
                  message: '请输入地址'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Button htmlType="submit">提交</Button>
    </Form>
  );
}

export default Demo;
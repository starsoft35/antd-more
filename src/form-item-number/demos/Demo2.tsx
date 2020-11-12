import * as React from 'react';
import { Form, Button, Tooltip, Row, Col } from 'antd';
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormItemNumber } from 'antd-more';

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

const buttonLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 14, offset: 10 },
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
        name='form-item-number-demo2'
        onFinish={onFinish}
        {...formLayout}
      >
        <Row>
          <Col span={24} lg={12} xl={8}>
            <FormItemNumber
              label="借记卡费率"
              name="num1"
              after="%"
              lt={100}
              gt={0}
              required
            />
          </Col>
          <Col span={24} lg={12} xl={8}>
            <FormItemNumber
              label="借记卡封顶"
              name="num2"
              after="元" gt={0}
              required
            />
          </Col>
          <Col span={24} lg={12} xl={8}>
            <FormItemNumber
              label={(<span>
                IC卡小额&nbsp;
                <Tooltip title="IC卡小额双免优惠费率">
                  <InfoCircleOutlined />
                </Tooltip>
              </span>)}
              name="num3"
              after="%"
              lt={100}
              gt={0}
              required
            />
          </Col>
          <Col span={24} lg={12} xl={8}>
            <FormItemNumber
              label="结算手续费"
              name="num4"
              after="元/笔"
              gt={0}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} lg={12} xl={8}>
            <Form.Item {...buttonLayout}>
              <Button type='primary' htmlType='submit'>提交</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form >
      <div>result: {JSON.stringify(result)}</div>
    </>
  );
}

export default Demo;
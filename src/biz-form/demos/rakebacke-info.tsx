import * as React from 'react';
import { Row, Col } from 'antd';
import { BizForm } from 'antd-more';

const { ItemRadio, ItemNumber } = BizForm;

const oneColSpan = {
  span: 24
};
const twoColSpan = {
  span: 24,
  lg: 12
};
const threeColSpan = {
  span: 24,
  lg: 12,
  xl: 8
};

const innerLabelCol = {
  flex: '0 0 100px'
}

// 返佣周期
const enumRakebackeCycle = [
  {
    value: "0",
    name: "日返"
  },
  {
    value: "1",
    name: "月返"
  }
];

const RakebackeInfo: React.FC<{}> = () => {
  const [loading, setLoading] = React.useState(false);
  const onFinish = React.useCallback((values) => {
    console.log(values);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <BizForm
      name="form-rakebacke-info"
      onFinish={onFinish}
      loading={loading}
      submitter={{
        submitText: "提交",
        submitButtonProps: {
          size: "large",
          style: {
            padding: "0 40px"
          }
        },
        // 提交按钮居中
        render: (_, dom) => <div style={{ display: "flex", justifyContent: "center" }}>{dom.shift()}</div>,
      }}
      labelCol={{
        flex: "0 0 120px"
      }}
    >
      <Row>
        <Col {...oneColSpan}>
          <ItemRadio label="返佣周期" name="rakebackeCycle" required options={enumRakebackeCycle} />
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="普通刷卡" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="借记卡" name="costpriceCp" labelCol={innerLabelCol} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="借记卡封顶" name="costpriceCpMaxFee" labelCol={innerLabelCol} required after="元" gt={0} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="贷记卡" name="costpriceCpCredit" labelCol={innerLabelCol} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="IC卡小额" name="costpriceIC" labelCol={innerLabelCol} required tooltip="IC卡小额双免优惠费率" after="%" gt={0} lt={100} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="扫码支付" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="支付宝" name="costpriceAlipay" labelCol={innerLabelCol} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="微信" name="costpriceWechat" labelCol={innerLabelCol} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="银二小额" name="costpriceUionpay" labelCol={innerLabelCol} required tooltip="银联二维码小额优惠费率" after="%" gt={0} lt={100} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="结算" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="结算手续费" name="settlementFee" labelCol={innerLabelCol} required after="元/笔" gte={0} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
      </Row>
    </BizForm >
  );
}

export default RakebackeInfo;
import * as React from 'react';
import { Row, Col } from 'antd';
import { BizForm } from 'antd-more';

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const { ItemRadio, ItemNumber } = BizForm;

const oneColSpan = {
  span: 24
};
const threeColSpan = {
  span: 24,
  lg: 12,
  xl: 8
};

// 返佣周期
const RakebackeCycle = [
  {
    value: "0",
    name: "日返"
  },
  {
    value: "1",
    name: "月返"
  }
];

const RakebackeInfo: React.FC = () => {
  return (
    <BizForm
      name="form-rakebacke-info"
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
      }}
      submitter={{
        submitText: "提交",
        submitButtonProps: {
          size: "large",
          style: {
            padding: "0 40px"
          }
        },
        noReset: true,
        // 提交按钮居中
        render: (_, dom) => <div style={{ display: "flex", justifyContent: "center" }}>{dom}</div>,
      }}
      labelWidth={112}
    >
      <Row>
        <Col {...oneColSpan}>
          <ItemRadio label="返佣周期" name="rakebackeCycle" required options={RakebackeCycle} />
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="普通刷卡" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="借记卡" name="costpriceCp" labelWidth={98} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="借记卡封顶" name="costpriceCpMaxFee" labelWidth={98} required after="元" gt={0} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="贷记卡" name="costpriceCpCredit" labelWidth={98} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="IC卡小额" name="costpriceIC" labelWidth={98} required tooltip="IC卡小额双免优惠费率" after="%" gt={0} lt={100} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="扫码支付" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="支付宝" name="costpriceAlipay" labelWidth={98} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="微信" name="costpriceWechat" labelWidth={98} required after="%" gt={0} lt={100} />
              </Col>
              <Col {...threeColSpan}>
                <ItemNumber label="银二小额" name="costpriceUionpay" labelWidth={98} required tooltip="银联二维码小额优惠费率" after="%" gt={0} lt={100} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
        <Col {...oneColSpan}>
          <BizForm.Item label="结算" colon={false}>
            <Row>
              <Col {...threeColSpan}>
                <ItemNumber label="结算手续费" name="settlementFee" labelWidth={98} required after="元/笔" gte={0} />
              </Col>
            </Row>
          </BizForm.Item>
        </Col>
      </Row>
    </BizForm>
  );
}

export default RakebackeInfo;
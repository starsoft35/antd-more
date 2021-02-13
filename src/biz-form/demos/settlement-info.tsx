import * as React from 'react';
import { Row, Col } from 'antd';
import { BizForm } from 'antd-more';
import lcnFormPC from 'lcn/lcn-form-pc';

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const { ItemInput, ItemAddress, ItemRadio } = BizForm;

const oneColSpan = {
  span: 24
};
const twoColSpan = {
  span: 24,
  lg: 12
};

// 结算方式
export const SettlementCycle = [
  {
    value: "T1",
    name: "T+1"
  },
  {
    value: "D1",
    name: "D+1"
  }
];

// 结算类型
export const SettlementType = [
  {
    value: "0",
    name: "对公账户"
  },
  {
    value: "1",
    name: "对私账户"
  }
];

const SettlementInfo: React.FC = () => {
  return (
    <BizForm
      name="form-settlement-info"
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
          <ItemRadio label="结算方式" name="settlementCycle" required options={SettlementCycle} tooltip="T为工作日，D为自然日" />
        </Col>
        <Col {...oneColSpan}>
          <ItemRadio label="结算类型" name="settlementType" required options={SettlementType} />
        </Col>
        <Col {...oneColSpan}>
          <ItemInput label="账户名称" name="bankCertName" required />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput label="银行卡号" name="bankCardNo" type="bankCard" required />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput label="开户银行名称" name="bankName" required />
        </Col>
        <Col {...oneColSpan}>
          <ItemAddress label="开户支行" names={["branchLocation", "branchName"]} labels={["省/市", "支行名称"]} required options={lcnFormPC} />
        </Col>
      </Row>
    </BizForm>
  );
}

export default SettlementInfo;
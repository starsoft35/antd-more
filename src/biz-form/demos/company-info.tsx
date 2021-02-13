import * as React from 'react';
import { Row, Col } from 'antd';
import { BizForm } from 'antd-more';
import { isSocialCreditCode, isBusinessLicense } from 'util-helpers';
import lcnFormInland from 'lcn/lcn-form-inland';

function waitTime(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const { ItemInput, ItemAddress } = BizForm;

const oneColSpan = {
  span: 24
};
const twoColSpan = {
  span: 24,
  lg: 12
};

const CompanyInfo: React.FC = () => {
  return (
    <BizForm
      name="form-company-info"
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
      }}
      initialValues={{
        businessRegno: "93410526MA45RDU53U"
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
      labelWidth={120}
    >
      <Row>
        <Col {...oneColSpan}>
          <ItemInput label="公司名称" name="companyName" required inputProps={{ placeholder: "请输入公司营业执照上的商户全称" }} />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput
            label="营业执照号"
            name="businessRegno"
            required
            inputProps={{
              placeholder: "请输入统一社会信用代码或营业执照号"
            }}
            rules={[
              {
                validator(rules, value) {
                  let errMsg = '';
                  if (!value) {
                    errMsg = '请输入统一社会信用代码或营业执照号';
                  } else if (!isBusinessLicense(value) && !isSocialCreditCode(value)) {
                    errMsg = '请输入正确的营业执照号';
                  }
                  if (errMsg) {
                    return Promise.reject(errMsg);
                  }
                  return Promise.resolve();
                }
              }
            ]}
          />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput label="法人姓名" name="legalName" required />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput label="法人身份证号" name="legalIdCard" type="idCard" required />
        </Col>
        <Col {...twoColSpan}>
          <ItemInput label="法人手机号码" name="legalMobile" type="mobile" required />
        </Col>
        <Col {...oneColSpan}>
          <ItemAddress label="公司地址" names={["location", "address"]} labels={["省/市/区", "详细地址"]} options={lcnFormInland} required />
        </Col>
      </Row>
    </BizForm>
  );
}

export default CompanyInfo;
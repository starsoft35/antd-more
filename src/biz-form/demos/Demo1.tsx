import * as React from 'react';
import 'moment/locale/zh-cn';
import { Switch, Row, Col } from 'antd';
import { BizForm } from 'antd-more';
import lcnFormInlandData from 'lcn/lcn-form-inland';

const {
  ItemInput,
  ItemRadio,
  ItemSelect,
  ItemAddress,
  ItemBankCard,
  ItemDate,
  ItemDateRange,
  ItemEmail,
  ItemIdCard,
  ItemMobile,
  ItemNumber,
  ItemPassword,
  ItemUserName,
  ItemColor,
  ItemCaptcha,
  ItemCheckbox,
  ItemUpload
} = BizForm;

const colSpan = {
  xs: 24,
  md: 12,
  lg: 8,
  xxl: 6
}

const specialColSpan = {
  xs: 24,
  lg: 12,
  xxl: 6
}

// 周期
const cycle = [
  {
    name: "按日",
    value: "0"
  },
  {
    name: "按月",
    value: "1"
  },
  {
    name: '按季度',
    value: '2'
  },
];

const Demo: React.FC<{}> = () => {
  const [required, setRequired] = React.useState(false);

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        必填 <Switch defaultChecked={required} onChange={val => setRequired(val)} />
      </div>
      <BizForm
        name='biz-form-demo1'
        onFinish={(values) => {
          console.log(values);
        }}
        labelCol={{
          flex: '0 0 100px'
        }}
      >
        <h3>业务组件</h3>
        <Row gutter={16}>
          <Col {...colSpan}>
            <ItemNumber label='数字' name='number' tooltip="提示文字" required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemEmail label='邮箱' name='email' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemIdCard label='身份证号' name='idCard' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemMobile label='手机号码' name='mobile' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemUserName label='用户名' name='userName' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemPassword label='密码' name='password' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemBankCard label='银行卡号' name='bankCardNo' formatting required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemColor label='颜色' name='color' required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemCaptcha
              label='验证码'
              name='code'
              onGetCaptcha={() => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                })
              }}
              required={required}
            />
          </Col>
          <Col xs={24}>
            <ItemAddress
              label='地址'
              tooltip='组合组件'
              names={['location', 'address']}
              labels={['省/市/区', '详细地址']}
              options={lcnFormInlandData}
              // formItemProps={[
              //   {
              //     colProps: { lg: 6 }
              //   }, {
              //     colProps: { lg: 18 }
              //   }]}
              required={required}
            />
          </Col>
        </Row>
        <h3>基础组件</h3>
        <Row gutter={16}>
          <Col {...colSpan}>
            <ItemDate label='日期' name='date' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDate label='周' name='week' picker='week' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDate label='月' name='month' picker='month' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDate label='季' name='quarter' picker='quarter' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDate label='年' name='year' picker='year' required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDate label='日期时间' name='dateTime' showTime required={required} />
          </Col>
          <Col {...colSpan}>
            <ItemDateRange label='日期区间' name='dateRange' required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemDateRange label='日期时间区间' name='dateTimeRange' showTime required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemInput label='Input' name='input' required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemInput.TextArea label='Input.TextArea' name='inputTextArea' required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemRadio label='Radio' name='radio' options={cycle} required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemRadio label='RadioButton' name='radioButton' optionType='button' options={cycle} required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemSelect label='Select' name='select' options={cycle} required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemCheckbox label='Checkbox' name='checkbox' options={cycle} all required={required} />
          </Col>
          <Col {...specialColSpan}>
            <ItemUpload label='Upload' name='upload' required={required} />
          </Col>
        </Row>
      </BizForm>
    </>
  );
}

export default Demo;
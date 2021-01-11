import * as React from 'react';
import { BizForm } from 'antd-more';
import lcnFormInland from 'lcn/lcn-form-inland';
import lcnFormPC from 'lcn/lcn-form-pc';

const { ItemAddress } = BizForm;

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-address-1"
      onFinish={values => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <ItemAddress label="地址1" names={["location-1", "address-1"]} labels={["省/市/区", "详细地址"]} options={lcnFormInland} />
      <ItemAddress label="地址2" names={["location-2", "address-2"]} labels={["省/市/区", "详细地址"]} options={lcnFormInland} required />
      <ItemAddress label="改变布局" names={["location-3", "address-3"]} labels={["省/市/区", "详细地址"]} options={lcnFormInland} formItemProps={[{ colProps: { lg: 12 } }, { colProps: { lg: 12 } }]} />
      <ItemAddress label="开户银行" names={["location-4", "address-4"]} labels={["省/市", "支行名称"]} options={lcnFormPC} required />
    </BizForm>
  );
}

export default Demo;
import * as React from 'react';
import { BizForm, BizFormItemAddress } from 'antd-more';
import { getPCA, getPC } from 'lcn';

const pca = getPCA({ inland: true, fieldNames: { code: 'value', name: 'label' } });
const pc = getPC({ inland: true, fieldNames: { code: 'value', name: 'label' } });

const Demo = () => {
  return (
    <BizForm
      name="form-item-address-1"
      onFinish={(values) => {
        console.log(values);
      }}
      labelWidth={98}
    >
      <BizFormItemAddress
        label="地址1"
        names={['location-1', 'address-1']}
        labels={['省/市/区', '详细地址']}
        options={pca}
      />
      <BizFormItemAddress
        label="地址2"
        names={['location-2', 'address-2']}
        labels={['省/市/区', '详细地址']}
        options={pca}
        required
      />
      <BizFormItemAddress
        label="改变布局"
        names={['location-3', 'address-3']}
        labels={['省/市/区', '详细地址']}
        options={pca}
        formItemProps={[{ colProps: { lg: 12 } }, { colProps: { lg: 12 } }]}
      />
      <BizFormItemAddress
        label="开户银行"
        names={['location-4', 'address-4']}
        labels={['省/市', '支行名称']}
        options={pc}
        required
      />
    </BizForm>
  );
};

export default Demo;

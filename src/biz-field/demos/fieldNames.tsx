import * as React from 'react';
import { BizField } from 'antd-more';
import CurrencyData from './currency';

function Demo() {
  return (
    <>
      <BizField
        value="CNY"
        valueType="enum"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
      />
      <br />
      <BizField
        value="CNY"
        valueType="enum"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
      />
      <br />
      <BizField
        value="人民币"
        valueType="enum"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'name' }}
      />
      <br />
      <BizField
        value="CNY"
        valueType="enumTag"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
      />
      <br />
      <br />
      <h3>多个枚举</h3>
      <BizField
        value={['CNY', 'USD']}
        valueType="enum"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
      />
      <br />
      <BizField
        value={['CNY', 'USD']}
        valueType="enumTag"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
      />
    </>
  );
}

export default Demo;

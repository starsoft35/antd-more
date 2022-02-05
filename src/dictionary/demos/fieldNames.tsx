import * as React from 'react';
import { Divider } from 'antd';
import { Dictionary } from 'antd-more';

const CurrencyData = [
  {
    symbol: '¥',
    code: 'CNY',
    name: '人民币'
  },
  {
    symbol: '$',
    code: 'USD',
    name: '美元'
  },
  {
    symbol: '€',
    code: 'EUR',
    name: '欧元'
  },
  {
    symbol: '￡',
    code: 'GBP',
    name: '英镑'
  }
];

function Demo() {
  return (
    <>
      <Dictionary
        value="CNY"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
      />
      <br />
      <Dictionary
        value="CNY"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
      />
      <br />
      <Dictionary
        value="人民币"
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'name' }}
        type="tag"
      />
      <br />
      <Divider orientation="left">多个枚举</Divider>
      <Dictionary
        value={['CNY', 'GBP']}
        valueEnum={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
      />
      <br />
      <Dictionary
        value={['CNY', 'GBP']}
        valueEnum={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
        type="tag"
      />
    </>
  );
}

export default Demo;

import * as React from 'react';
import { Divider } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { DefaultOptionType, SelectValue } from 'antd/es/select';
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
  const [radio1, setRadio1] = React.useState('CNY');
  const [radio2, setRadio2] = React.useState('CNY');

  const [select1, setSelect1] = React.useState<SelectValue>('CNY');
  const [select2, setSelect2] = React.useState<SelectValue>('CNY');

  const changeRadio1 = React.useCallback((e: RadioChangeEvent) => {
    console.log(e.target.value);
    setRadio1(e.target.value);
  }, []);

  const changeRadio2 = React.useCallback((e: RadioChangeEvent) => {
    console.log(e.target.value);
    setRadio2(e.target.value);
  }, []);

  const changeSelect1 = React.useCallback(
    (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => {
      console.log(value, option);
      setSelect1(value);
    },
    []
  );

  const changeSelect2 = React.useCallback(
    (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => {
      console.log(value, option);
      setSelect2(value);
    },
    []
  );

  return (
    <>
      <Dictionary value="CNY" data={CurrencyData} fieldNames={{ label: 'symbol', value: 'code' }} />
      <br />
      <Dictionary value="CNY" data={CurrencyData} fieldNames={{ label: 'name', value: 'code' }} />
      <br />
      <Dictionary
        value="人民币"
        data={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'name' }}
      />
      <br />
      <Divider orientation="left">多个枚举</Divider>
      <Dictionary.List
        value={['CNY', 'GBP']}
        data={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
      />
      <br />
      <Dictionary.List
        value={['CNY', 'GBP']}
        data={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
      />
      <br />
      <Divider orientation="left">Radio</Divider>
      <Dictionary.Radio
        value={radio1}
        data={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
        onChange={changeRadio1}
      />
      <br />
      <Dictionary.Radio
        value={radio2}
        data={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
        onChange={changeRadio2}
      />
      <br />
      <Divider orientation="left">Seelct</Divider>
      <Dictionary.Select
        value={select1}
        data={CurrencyData}
        fieldNames={{ label: 'symbol', value: 'code' }}
        onChange={changeSelect1}
      />
      <br />
      <Dictionary.Select
        value={select2}
        data={CurrencyData}
        fieldNames={{ label: 'name', value: 'code' }}
        all={false}
        excludeValues={['EUR']}
        onChange={changeSelect2}
      />
      <br />
    </>
  );
}

export default Demo;

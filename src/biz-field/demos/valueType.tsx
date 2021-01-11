import * as React from 'react';
import { Divider } from 'antd';
import { BizField } from 'antd-more';

const ValueTypeDemo: React.FC = () => {
  return (
    <>
      <Divider orientation="left">string</Divider>
      <BizField value={40} valueType="percent" showSymbol showColor />
      <Divider orientation="left">object</Divider>
      <BizField value={40} valueType={{ type: "percent", showSymbol: true, showColor: true }} />
      <br />
      <BizField value={40} valueType={{ type: "percent" }} showSymbol showColor />
      <Divider orientation="left">function</Divider>
      <BizField value={40} valueType={() => ({ type: "percent", showSymbol: true, showColor: true })} />
    </>
  );
}

export default ValueTypeDemo;
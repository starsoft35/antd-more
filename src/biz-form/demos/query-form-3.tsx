import * as React from 'react';
import { BizForm } from 'antd-more';

const { QueryForm, ItemInput, ItemDate, ItemMobile, ItemDateRange } = BizForm;

const Demo: React.FC<{}> = () => {
  return (
    <QueryForm
      name='query-form-3'
      onFinish={values => {
        console.log(values);
      }}
      defaultColsNumber={2}
      defaultCollapsed={false}
      layout='vertical'
    >
      <ItemInput label='商品编号' name='goodsNo' />
      <ItemDate label='交易日期' name='tradeDate' />
      <ItemMobile label='手机号码' name='mobile' />
      <ItemDateRange label='时间' name='time' showTime colProps={{ xs: 24, md: 24, lg: 14 }} />
    </QueryForm>
  );
}

export default Demo;
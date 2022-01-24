import * as React from 'react';
import { BizForm } from 'antd-more';
import waitTime from '../../utils/waitTime';

const { QueryForm, ItemInput, ItemDate, ItemDateRange } = BizForm;

const Demo = () => {
  return (
    <QueryForm
      name="biz-form-demo2"
      onFinish={async (values) => {
        await waitTime();
        console.log(values);
      }}
      labelWidth={80}
      defaultColsNumber={2}
    >
      <ItemInput label="商品编号" name="goodsNo" />
      <ItemDate label="交易日期" name="tradeDate" />
      <ItemInput label="手机号" name="mobile" type="mobile" />
      <ItemDateRange label="时间" name="time" showTime colProps={{ xs: 24, md: 24, lg: 14 }} />
    </QueryForm>
  );
};

export default Demo;

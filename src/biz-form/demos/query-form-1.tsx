import * as React from 'react';
import { BizForm } from 'antd-more';

const { QueryForm, ItemInput, ItemDate, ItemDateRange } = BizForm;

const Demo: React.FC = () => {
  const [form] = BizForm.useForm();

  return (
    <QueryForm
      name="query-form-1"
      form={form}
      onFinish={values => {
        console.log(values);
      }}
    >
      <ItemInput label="商品编号" name="goodsNo" />
      <ItemDate label="交易日期" name="tradeDate" />
      <ItemInput label="手机号码" name="mobile" type="mobile" />
      <ItemDateRange label="时间" name="time" names={["startTime", "endTime"]} showTime colProps={{ xs: 24, md: 24, lg: 14 }} />
    </QueryForm>
  );
}

export default Demo;
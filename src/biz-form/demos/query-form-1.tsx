import * as React from 'react';
import { BizForm } from 'antd-more';

const { QueryForm, ItemInput, ItemDate, ItemMobile, ItemDateRange } = BizForm;

const Demo: React.FC<{}> = () => {
  const [form] = BizForm.useForm();

  const updateInitialValues = React.useCallback(() => {
    setTimeout(() => {
      form.setFieldsValue({
        time: ['2020-12-03 20:01:25', '2020-12-05 20:01:25']
      });
    }, 2000);
  }, [form]);

  React.useEffect(() => {
    updateInitialValues();
  }, []);

  return (
    <QueryForm
      name='query-form-1'
      form={form}
      onReset={updateInitialValues}
      onFinish={values => {
        console.log(values);
      }}
      initialValues={{}}
    >
      <ItemInput label='商品编号' name='goodsNo' />
      <ItemDate label='交易日期' name='tradeDate' />
      <ItemMobile label='手机号码' name='mobile' />
      <ItemDateRange label='时间' name='time' names={['startTime', 'endTime']} showTime colProps={{ xs: 24, md: 24, lg: 14 }} />
    </QueryForm>
  );
}

export default Demo;
import * as React from 'react';
import { BizForm } from 'antd-more';

const { ItemDate } = BizForm;

const Demo: React.FC<{}> = () => {
  return (
    <BizForm
      name='form-item-date-1'
      onFinish={values => {
        console.log(values);
      }}
      labelCol={{
        flex: '0 0 96px'
      }}
    >
      <ItemDate label="日期" name="date1" />
      <ItemDate label="日期2" name="date2" required />
      <ItemDate label="日期时间" name="date3" showTime />
      <ItemDate label="月" name="date4" picker="month" />
      <ItemDate label="交易日期" name="date5" disabledDateAfter={0} tooltip='当日及以后日期不可选' />
      <ItemDate label="订单日期" name="date6" disabledDateBefore={-365} disabledDateAfter={1} tooltip='一年以前和明天以后日期不可选' />
    </BizForm>
  );
}

export default Demo;
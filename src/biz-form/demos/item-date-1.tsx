import * as React from 'react';
import { BizForm } from 'antd-more';
import moment from 'moment';

const { ItemDate } = BizForm;

const initialValues = {
  date7: "2020-10-10",
  date8: moment("2020-10-10")
}

const Demo: React.FC<{}> = () => {
  return (
    <BizForm
      name='form-item-date-1'
      onFinish={values => {
        console.log(values);
      }}
      initialValues={initialValues}
      labelWidth={98}
    >
      <ItemDate label="日期" name="date1" />
      <ItemDate label="日期2" name="date2" required />
      <ItemDate label="日期时间" name="date3" showTime />
      <ItemDate label="月" name="date4" picker="month" />
      <ItemDate label="交易日期" name="date5" disabledDateAfter={0} tooltip='当日及以后日期不可选' />
      <ItemDate label="订单日期" name="date6" disabledDateBefore={-365} disabledDateAfter={1} tooltip='一年以前和明天以后日期不可选' />
      <ItemDate label="默认值1" name="date7" tooltip='支持string格式' />
      <ItemDate label="默认值2" name="date8" tooltip='moment格式' />
    </BizForm>
  );
}

export default Demo;
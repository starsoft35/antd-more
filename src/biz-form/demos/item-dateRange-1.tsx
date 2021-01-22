import * as React from 'react';
import { BizForm } from 'antd-more';
import moment from 'moment';

const { ItemDateRange } = BizForm;

const initialValues = {
  date7: [moment().subtract(30, 'days').startOf('day'), moment().endOf('day')],
  date8: ["2020-10-10", "2020-12-12"]
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="form-item-dateRange-1"
      onFinish={values => {
        console.log(values);
      }}
      initialValues={initialValues}
      labelWidth={98}
    >
      <ItemDateRange label="日期" name="date1" />
      <ItemDateRange label="解构字段" names={["startDate", "endDate"]} required tooltip="传入names会自动将值解构当前层级" />
      <ItemDateRange label="日期时间" name="date3" showTime />
      <ItemDateRange label="月" name="date4" picker="month" />
      <ItemDateRange label="交易日期" name="date5" disabledDateAfter={0} maxRange={30} tooltip="当日及以后日期不可选，最大区间不能超过30天" />
      <ItemDateRange label="订单日期" name="date6" disabledDateBefore={-365} disabledDateAfter={1} tooltip="一年以前和明天以后日期不可选" />
      <ItemDateRange label="订单日期2" name="date7" disabledDateBefore={-365} disabledDateAfter={1} maxRange={30} tooltip="默认值为最近30天，一年以前和明天以后日期不可选，最大区间不能超过30天" />
      <ItemDateRange label="默认值" name="date8" tooltip="支持string格式" />
    </BizForm>
  );
}

export default Demo;
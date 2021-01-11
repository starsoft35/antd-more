import * as React from 'react';
import { BizForm } from 'antd-more';
import moment from 'moment';

const { ItemTimeRange } = BizForm;

const initialValues = {
  time4: ['14:59:45', '18:00:00'],
  time5: [moment('14:59:45', 'HH:mm:ss'), moment('18:00:00', 'HH:mm:ss')]
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="item-timeRange-1"
      onFinish={value => console.log(value)}
      initialValues={initialValues}
      labelWidth={98}
    >
      <ItemTimeRange label="时间" name="time1" />
      <ItemTimeRange label="解构字段" name="time2" names={["startTime", "endTime"]} required tooltip="传入names会自动将值解构到当前层级" />
      <ItemTimeRange label="时分" name="time3" format="HH:mm" />
      <ItemTimeRange label="默认值1" name="time4" tooltip="支持string格式" />
      <ItemTimeRange label="默认值2" name="time5" tooltip="moment格式" />
    </BizForm>
  );
}

export default Demo;
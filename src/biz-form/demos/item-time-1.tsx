import * as React from 'react';
import { BizForm } from 'antd-more';
import moment from 'moment';

const { ItemTime } = BizForm;

const initialValues = {
  time4: '14:59:45',
  time5: moment('14:59:45', 'HH:mm:ss')
}

const Demo: React.FC = () => {
  return (
    <BizForm
      name="item-time-1"
      onFinish={value => console.log(value)}
      initialValues={initialValues}
      labelWidth={98}
    >
      <ItemTime label="时间" name="time1" />
      <ItemTime label="时间2" name="time2" required />
      <ItemTime label="时分" name="time3" format="HH:mm" />
      <ItemTime label="默认值1" name="time4" tooltip="支持string格式" />
      <ItemTime label="默认值2" name="time5" tooltip="moment格式" />
    </BizForm>
  );
}

export default Demo;
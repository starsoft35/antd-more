import * as React from 'react';
import { BizForm, BizFormItemTime } from 'antd-more';
import moment from 'moment';

const initialValues = {
  time4: '14:59:45',
  time5: moment('14:59:45', 'HH:mm:ss')
};

const Demo = () => {
  return (
    <BizForm
      name="item-time-1"
      onFinish={(value) => console.log(value)}
      initialValues={initialValues}
      labelWidth={98}
    >
      <BizFormItemTime label="时间" name="time1" />
      <BizFormItemTime label="时间2" name="time2" required />
      <BizFormItemTime label="时分" name="time3" format="HH:mm" />
      <BizFormItemTime label="默认值1" name="time4" tooltip="支持string格式" />
      <BizFormItemTime label="默认值2" name="time5" tooltip="moment格式" />
    </BizForm>
  );
};

export default Demo;

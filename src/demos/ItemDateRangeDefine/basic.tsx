import * as React from 'react';
import { BizForm } from 'antd-more';
import ItemDateRangeDefine from '../components/ItemDateRangeDefine';

function Demo() {
  return (
    <BizForm
      labelWidth={98}
      initialValues={{
        startDate1: '2022-10-10',
        endDate1: '9999-12-31',

        startDate3: '2022-10-10',
        endDate3: '9999-12-31'
      }}
      onFinish={values => {
        console.log(values);
      }}
    >
      <ItemDateRangeDefine
        label='证件有效期'
        labels={['证件有效期始', '证件有效期止']}
        names={['startDate', 'endDate']}
      />
      <ItemDateRangeDefine
        label='初始值'
        labels={['证件有效期始', '证件有效期止']}
        names={['startDate1', 'endDate1']}
      />
      <ItemDateRangeDefine
        label='自定义'
        labels={['证件有效期始', '证件有效期止']}
        names={['startDate2', 'endDate2']}
        longTermLabel='永久'
        longTermValue='2099-12-31'
        hideOnLongTerm={false}
      // formItemProps={[{}, {
      //   contentAfter: <Button icon={<UploadOutlined />}>上传国徽面识别</Button>
      // }]}
      />
      <ItemDateRangeDefine
        label='禁选'
        labels={['证件有效期始', '证件有效期止']}
        names={['startDate3', 'endDate3']}
        hideOnLongTerm
        disabled
      />
      <ItemDateRangeDefine
        label='严格模式'
        labels={['证件有效期始', '证件有效期止']}
        names={['startDate4', 'endDate4']}
        strict
        tooltip='开启后，开始日期不能大于今天，结束日期不能小于今天。'
      />
    </BizForm>
  );
}

export default Demo;
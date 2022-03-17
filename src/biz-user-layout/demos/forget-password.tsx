import * as React from 'react';
import { BizUserLayout } from 'antd-more';
import ForgetPasswordBox from './ForgetPasswordBox';

function Demo() {
  return (
    <BizUserLayout
      logo="https://www.caijinfeng.com/assets/images/logo-doly@3x.png"
      title="antd-more"
      footer={{
        copyright: '©️ 2022 doly-dev'
      }}
    >
      <ForgetPasswordBox />
    </BizUserLayout>
  );
}

export default Demo;

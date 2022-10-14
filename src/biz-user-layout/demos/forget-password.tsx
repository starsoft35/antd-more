/**
 * compact: true
 */
import * as React from 'react';
import { BizUserLayout } from 'antd-more';
import ForgetPasswordBox from './ForgetPasswordBox';

function Demo() {
  return (
    <BizUserLayout
      logo="https://doly-dev.github.io/logo.png"
      title="antd-more"
      footer={{
        copyright: `©️ ${new Date().getFullYear()} doly-dev`
      }}
    >
      <ForgetPasswordBox />
    </BizUserLayout>
  );
}

export default Demo;

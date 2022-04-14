import * as React from 'react';
import { BizUserLayout } from 'antd-more';
import LoginBox from './LoginBox';
import BackgroundImage from './images/bg-login@2x.5802ccf3.jpg';
import styles from './fullscreen.less';

function Demo() {
  return (
    <BizUserLayout
      className={styles.wrapper}
      title="antd-more"
      banner={[BackgroundImage]}
      bannerRightContent={<LoginBox />}
    />
  );
}

export default Demo;

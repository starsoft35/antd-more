import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Card, Layout, Menu, Spin, theme } from 'antd';
import styles from './index.module.less';

const { Sider, Content, Header } = Layout;

const pages = [
  {
    key: 'profile',
    label: '个人信息',
    component: () => import('./Profile')
  },
  {
    key: 'change-password',
    label: '修改密码',
    component: () => import('./ChangePassword')
  },
];

console.log(styles);

const Settings = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState(pages[0].key);
  const currentPage = useMemo(() => pages.find(item => item.key === selectedKey)!, [selectedKey]);

  const Comp = lazy(currentPage.component);

  return (
    <div className={styles?.page}>
      <Layout>
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            items={pages}
            style={{ height: '100%' }}
            selectedKeys={[selectedKey]}
            onSelect={(item) => {
              setSelectedKey(item.key);
            }}
          />
        </Sider>
        <Content>
          <Header style={{ background: colorBgContainer }}>{currentPage.label}</Header>
          <Card bordered={false} style={{ boxShadow: 'none' }}>
            <Suspense fallback={<div className={styles?.lazyload}><Spin /></div>}>
              <Comp />
            </Suspense>
          </Card>
        </Content>
      </Layout>
    </div>
  );
}

export default Settings;

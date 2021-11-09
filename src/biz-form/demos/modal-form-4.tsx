import * as React from 'react';
import { Button } from 'antd';
import ChangePasswordModal from './components/ChangePasswordModal';

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        修改密码
      </Button>
      <ChangePasswordModal visible={visible} onVisibleChange={setVisible} />
    </>
  );
};

export default Demo;

import * as React from 'react';
import { Button } from 'antd';
import ChangePasswordModal from './components/ChangePasswordModal';

const Demo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        修改密码
      </Button>
      <ChangePasswordModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Demo;

import React from 'react';
import { Modal } from 'antd';

export default ({ visible, title, onCancel = () => {}, imgUrl = '' }) => {
  return (
    <Modal
      visible={visible}
      title={title}
      footer={null}
      onCancel={onCancel}
      width="auto"
      centered
      style={{
        maxWidth: '80%',
      }}
    >
      <img alt="" style={{ width: '100%' }} src={imgUrl} />
    </Modal>
  );
};

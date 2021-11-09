import React from 'react';
import { Modal } from 'antd';

export default ({ imgUrl = '', style = {}, ...restProps }) => {
  return (
    <Modal
      footer={null}
      width="auto"
      centered
      style={{
        maxWidth: '80%',
        ...style
      }}
      {...restProps}
    >
      <img alt="" style={{ width: '100%' }} src={imgUrl} />
    </Modal>
  );
};

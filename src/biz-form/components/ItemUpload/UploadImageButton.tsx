import * as React from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const UploadImageButton = ({ loading = false, uploading = false }) => {
  const text = React.useMemo(() => {
    return loading ? '加载中' : uploading ? '上传中' : '点击上传'; // eslint-disable-line
  }, [loading, uploading]);
  return (
    <div>
      {loading || uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{text}</div>
    </div>
  );
};

export default UploadImageButton;

import * as React from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UploadWrapper, { UploadWrapperProps } from './UploadWrapper';

const defaultShowUploadList = {
  showPreviewIcon: false,
};

const UploadButton: React.FC<UploadWrapperProps> = ({ showUploadList, ...restProps }) => {
  const innerShowUploadList = React.useMemo(() => {
    if (typeof showUploadList === 'boolean' && showUploadList === false) {
      return false;
    }
    if (typeof showUploadList === 'object') {
      return {
        ...defaultShowUploadList,
        ...showUploadList,
      };
    }
    // 为 true 或 undefined 时
    return defaultShowUploadList;
  }, [showUploadList]);

  return (
    <UploadWrapper {...restProps} showUploadList={innerShowUploadList}>
      <Button icon={<UploadOutlined />}> 点击上传</Button>
    </UploadWrapper>
  );
};

export default UploadButton;

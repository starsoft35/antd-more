import * as React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import UploadWrapper, { UploadWrapperProps } from './UploadWrapper';

const defaultShowUploadList = {
  showPreviewIcon: false,
};

const UploadDragger: React.FC<UploadWrapperProps> = ({
  showUploadList,
  icon = <InboxOutlined />,
  title = '单击或拖动文件到此区域进行上传',
  ...restProps
}) => {
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
    <UploadWrapper {...restProps} dragger showUploadList={innerShowUploadList}>
      <p className="ant-upload-drag-icon">{icon}</p>
      <p className="ant-upload-text">{title}</p>
    </UploadWrapper>
  );
};

export default UploadDragger;

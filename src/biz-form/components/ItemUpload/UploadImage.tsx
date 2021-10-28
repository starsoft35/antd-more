import * as React from 'react';
import UploadWrapper from './UploadWrapper';
import type { UploadWrapperProps } from './UploadWrapper';
import UploadImageButton from './UploadImageButton';

const UploadImage: React.FC<UploadWrapperProps> = ({
  fileList,
  maxCount,
  icon,
  title,
  ...restProps
}) => {
  return (
    <UploadWrapper
      fileList={fileList}
      maxCount={maxCount}
      listType="picture-card"
      {...restProps}
      accept={restProps?.accept || '.jpg, .jpeg, .png'}
    >
      {maxCount && fileList && fileList.length >= maxCount ? null : (
        <UploadImageButton icon={icon} title={title} />
      )}
    </UploadWrapper>
  );
};

export default UploadImage;

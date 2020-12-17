import * as React from 'react';
import UploadWrapper, { UploadWrapperProps } from './UploadWrapper';
import UploadContext from './UploadContext';
import UploadImageButton from './UploadImageButton';

const UploadButton: React.FC<{}> = () => {
  const { transforming } = React.useContext(UploadContext);
  return <UploadImageButton loading={transforming} />;
};

const UploadImage: React.FC<UploadWrapperProps> = ({ fileList, max, ...restProps }) => {
  return (
    <UploadWrapper
      fileList={fileList}
      max={max}
      listType="picture-card"
      {...restProps}
      accept={restProps?.accept || '.jpg, .jpeg, .png'}
    >
      {max && fileList && fileList.length >= max ? null : <UploadButton />}
    </UploadWrapper>
  );
};

export default UploadImage;

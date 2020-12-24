import * as React from 'react';
import UploadWrapper, { UploadWrapperProps } from './UploadWrapper';
import UploadContext from './UploadContext';
import UploadImageButton from './UploadImageButton';

const UploadButton = ({ icon, title }) => {
  const { transforming } = React.useContext(UploadContext);
  return <UploadImageButton icon={icon} title={title} loading={transforming} />;
};

const UploadImage: React.FC<UploadWrapperProps> = ({
  fileList,
  max,
  icon,
  title,
  ...restProps
}) => {
  return (
    <UploadWrapper
      fileList={fileList}
      max={max}
      listType="picture-card"
      {...restProps}
      accept={restProps?.accept || '.jpg, .jpeg, .png'}
    >
      {max && fileList && fileList.length >= max ? null : (
        <UploadButton icon={icon} title={title} />
      )}
    </UploadWrapper>
  );
};

export default UploadImage;

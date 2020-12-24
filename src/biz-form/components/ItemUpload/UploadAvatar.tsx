import * as React from 'react';
import { message, Tooltip } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { UploadFile } from 'antd/es/upload/interface';
import UploadWrapper, { UploadWrapperProps } from './UploadWrapper';
import UploadContext from './UploadContext';
import UploadImageButton from './UploadImageButton';
import { getBase64 } from './uploadUtil';

const prefixCls = 'antd-more-upload-avatar';

const UploadButton: React.FC<{
  fileList?: UploadFile[];
  title?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ fileList, icon, title }) => {
  const { uploading, transforming } = React.useContext(UploadContext);
  const [imgUrl, setImgUrl] = React.useState('');
  const currentFile = React.useMemo(() => {
    return Array.isArray(fileList) && fileList.length > 0 ? fileList[0] : null;
  }, [fileList]);

  const transformBase64 = React.useCallback(async () => {
    if (currentFile) {
      if (!currentFile.url && !currentFile.preview) {
        if (!currentFile.originFileObj) {
          message.error('当前文件不支持显示！');
          setImgUrl('');
          return;
        }
        currentFile.preview = await getBase64(currentFile.originFileObj as File);
      }
      setImgUrl(currentFile.url || currentFile.preview);
    }
  }, [currentFile]);

  React.useEffect(() => {
    transformBase64();
  }, [currentFile]);

  let view = null;

  if (currentFile && currentFile.status === 'error') {
    view = (
      <div style={{ width: '100%' }}>
        <PictureOutlined />
        <div
          style={{
            marginTop: 8,
            padding: '0 8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={currentFile.name || ''}
        >
          {currentFile.name || ''}
        </div>
      </div>
    );
  } else if (transforming || uploading || !imgUrl) {
    view = (
      <UploadImageButton uploading={uploading} loading={transforming} icon={icon} title={title} />
    );
  } else {
    view = <img src={imgUrl} alt={(currentFile && currentFile.name) || ''} />;
  }

  const dom = (
    <div
      className={classNames(`${prefixCls}-box`, {
        [`${prefixCls}-box-error`]: currentFile && currentFile.status === 'error',
      })}
      style={imgUrl && !transforming && !uploading ? { background: '#fff' } : {}}
    >
      {view}
    </div>
  );

  if (currentFile && currentFile.status === 'error' && currentFile.response) {
    return <Tooltip title={currentFile.response}>{dom}</Tooltip>;
  }
  return dom;
};

const UploadImage: React.FC<UploadWrapperProps> = ({
  fileList,
  className,
  icon,
  title,
  ...restProps
}) => {
  return (
    <UploadWrapper
      {...restProps}
      accept={restProps?.accept || '.jpg, .jpeg, .png'}
      fileList={fileList}
      showUploadList={false}
      only
      multiple={false}
      className={classNames(prefixCls, className)}
    >
      <UploadButton fileList={fileList} icon={icon} title={title} />
    </UploadWrapper>
  );
};

export default UploadImage;

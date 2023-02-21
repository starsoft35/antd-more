import * as React from 'react';
import { BizForm, BizFormItemUpload } from 'antd-more';
import { waitTime } from 'util-helpers';
import FileViewer from './components/FileViewer';
import { uploadFile } from './services';
import { previewFile, getFileType, getFileUrl, removeFile } from './utils/utils';
import { uploadFileToFssid } from './utils/fileUtils';

const Demo = () => {
  const [previewInfo, setPreviewInfo] = React.useState({
    url: '',
    fileType: '',
    fileName: ''
  });
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <BizForm
        name="upload-file-viewer"
        onFinish={async (values) => {
          await waitTime();
          console.log(values);
        }}
        labelWidth={98}
      >
        <BizFormItemUpload
          name="files"
          label="任意文件"
          type="image"
          accept="*"
          maxCount={9}
          maxSize={1024 * 1024 * 10}
          multiple
          required
          onUpload={uploadFile}
          transform={uploadFileToFssid}
          uploadProps={{
            onPreview(file) {
              // console.log(file);
              const originFile = (file?.originFileObj || file) as File;
              setPreviewInfo({
                url: getFileUrl(file),
                fileType: getFileType(originFile),
                fileName: originFile.name
              });
              setOpen(true);
            },
            onRemove: removeFile,
            previewFile
          }}
        />
      </BizForm>
      <FileViewer open={open} onCancel={() => setOpen(false)} {...previewInfo} />
    </div>
  );
};

export default Demo;

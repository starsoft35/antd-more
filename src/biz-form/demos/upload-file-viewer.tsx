import * as React from 'react';
import type { UploadFile } from 'antd';
import { BizForm, BizFormItemUpload, FileViewer } from 'antd-more';
import { sleep } from 'ut2';
import { uploadFile } from './services';
import { uploadFileToFssid } from './utils/fileUtils';

const Demo = () => {
  const [fileInfo, setFileInfo] = React.useState<UploadFile>();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <BizForm
        name="upload-file-viewer"
        onFinish={async (values) => {
          await sleep();
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
              setFileInfo(file);
              setOpen(true);
            },
            onRemove: FileViewer.removeFile,
            previewFile: FileViewer.previewFile
          }}
        />
      </BizForm>
      <FileViewer open={open} onCancel={() => setOpen(false)} file={fileInfo} />
    </div>
  );
};

export default Demo;

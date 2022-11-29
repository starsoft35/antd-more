import * as React from 'react';
import { BizForm, BizFormItemUpload } from 'antd-more';
import type { UploadFile } from 'antd';
import { waitTime } from 'util-helpers';
import PreviewFile from './components/PreviewFile';
import { getThumbUrl } from './utils/utils';
import { uploadFile } from './services';

const Demo = () => {
  const [file, setFile] = React.useState<File>();
  const [open, setOpen] = React.useState(false);

  // 提交和校验时自动转换上传文件的值
  const transformUploadValue = React.useCallback((files: UploadFile[]) => {
    // 实际项目中服务端可能没有返回其他值
    return files?.map((item) => item?.response?.fssId).filter((item) => !!item);
  }, []);

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
          transform={transformUploadValue}
          uploadProps={{
            onPreview: async (file) => {
              // console.log(file);
              setFile((file?.originFileObj || file) as File);
              setOpen(true);
            },
            previewFile: getThumbUrl
          }}
        />
      </BizForm>
      <PreviewFile open={open} onCancel={() => setOpen(false)} file={file} />
    </div>
  );
};

export default Demo;

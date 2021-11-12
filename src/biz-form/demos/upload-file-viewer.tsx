/**
 * title: 上传各种类型文件预览
 * desc: |
 *      上传图片、pdf、audio、video等类型的文件自定义缩略图及预览。关于文件预览可以参考 [react-file-viewer](https://www.npmjs.com/package/react-file-viewer) 。
 */
import * as React from 'react';
import { BizForm } from 'antd-more';
import type { UploadFile } from 'antd/lib/upload/interface';
import PreviewFile from './components/PreviewFile';
import { getThumbUrl } from './utils/utils';
import waitTime from './utils/waitTime';

const { ItemUpload } = BizForm;

// 上传文件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function upload(file: File): Promise<{ fssId: string }> {
  return new Promise((resolve, reject) => {
    // const formData = new FormData();
    // formData.append("file", file);

    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({
          fssId: `${Math.random()}`
        });
      } else {
        reject();
      }
    }, 2000);
  });
}

const Demo = () => {
  const [file, setFile] = React.useState<File>();
  const [visible, setVisible] = React.useState(false);

  // 上传
  const handleUpload = React.useCallback((file) => {
    return upload(file).then((res) => {
      // 返回值自动添加到 file 中，thumbUrl 为自定义缩略图
      return { value: res.fssId, thumbUrl: getThumbUrl(file) };
    });
  }, []);

  // 提交时转换上传值
  const transformUploadValue = React.useCallback(
    (uploadValues: (UploadFile & Record<string, any>)[]) => {
      return uploadValues
        ? uploadValues
            .filter((valItem) => valItem.status !== 'error' && valItem.value)
            .map((valItem) => valItem.value)
        : undefined;
    },
    []
  );

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
        <ItemUpload
          name="files"
          label="任意文件"
          type="image"
          accept="*"
          maxCount={9}
          maxSize={1024 * 1024 * 10}
          multiple
          required
          onUpload={handleUpload}
          transform={transformUploadValue}
          uploadProps={{
            onPreview: async (file) => {
              // console.log(file);
              setFile((file?.originFileObj || file) as File);
              setVisible(true);
            }
          }}
        />
      </BizForm>
      <PreviewFile visible={visible} onCancel={() => setVisible(false)} file={file} />
    </div>
  );
};

export default Demo;

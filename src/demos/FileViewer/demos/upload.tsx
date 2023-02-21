import * as React from 'react';
import { Upload } from 'antd';
import FileViewer from '../../../biz-form/demos/components/FileViewer';
import TestImage from '../../../biz-form/demos/assets/test.jpg';
import TestAudio from '../../../biz-form/demos/assets/test.mp3';
import TestVideo from '../../../biz-form/demos/assets/test.mp4';
import TestPdf from '../../../biz-form/demos/assets/test.pdf';
import TestWord from '../../../biz-form/demos/assets/test.docx';
import TestExcel from '../../../biz-form/demos/assets/test.xlsx';
import { getFileThumbUrl, getFileType } from '../../../biz-form/demos/utils/utils';

const fileList = [
  {
    uid: '0',
    url: TestImage,
    name: 'test.jpg',
  },
  {
    uid: '1',
    url: TestAudio,
    name: 'test.mp3'
  },
  {
    uid: '2',
    url: TestVideo,
    name: 'test.mp4'
  },
  {
    uid: '3',
    url: TestPdf,
    name: 'test.pdf'
  },
  {
    uid: '4',
    url: TestWord,
    name: 'test.docx'
  },
  {
    uid: '5',
    url: TestExcel,
    name: 'test.xlsx'
  },
].map(item => ({
  ...item,
  thumbUrl: getFileThumbUrl(item as any)
}));

function Demo() {
  const [previewInfo, setPreviewInfo] = React.useState({
    url: '',
    fileType: '',
    fileName: ''
  });
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Upload
        fileList={fileList}
        listType='picture-card'
        onPreview={(file) => {
          const originFile = (file?.originFileObj || file) as File;
          setPreviewInfo({
            url: file.url,
            fileType: getFileType(originFile),
            fileName: originFile.name
          });
          setOpen(true);
        }}
        showUploadList={{ showRemoveIcon: false }}
      />
      <FileViewer open={open} onCancel={() => setOpen(false)} {...previewInfo} />
    </>
  );
}

export default Demo;
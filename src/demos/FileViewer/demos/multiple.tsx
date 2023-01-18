import * as React from 'react';
import { Button } from 'antd';
import FileViewer from '../../../biz-form/demos/components/FileViewer';
import TestImage from '../../../biz-form/demos/assets/test.jpg';
import TestAudio from '../../../biz-form/demos/assets/test.mp3';
import TestVideo from '../../../biz-form/demos/assets/test.mp4';
import TestPdf from '../../../biz-form/demos/assets/test.pdf';
import TestWord from '../../../biz-form/demos/assets/test.docx';
import TestExcel from '../../../biz-form/demos/assets/test.xlsx';

const data = {
  image: {
    url: TestImage,
    fileName: 'test.jpg',
    fileType: 'image'
  },
  audio: {
    url: TestAudio,
    fileName: 'test.mp3',
    fileType: 'audio'
  },
  video: {
    url: TestVideo,
    fileName: 'test.mp4',
    fileType: 'video'
  },
  pdf: {
    url: TestPdf,
    fileName: 'test.pdf',
    fileType: 'pdf'
  },
  word: {
    url: TestWord,
    fileName: 'test.docx',
    fileType: 'word'
  },
  excel: {
    url: TestExcel,
    fileName: 'test.xlsx',
    fileType: 'word'
  },
}

function Demo() {
  const [open, setOpen] = React.useState(false);
  const [previewInfo, setPreviewInfo] = React.useState<{ url: string, fileName: string, fileType: string }>();
  const preview = (type) => {
    setPreviewInfo(data[type]);
    setOpen(true);
  }

  return (
    <div>
      <Button onClick={() => preview('image')}>预览图片</Button>
      <Button onClick={() => preview('audio')}>预览音频</Button>
      <Button onClick={() => preview('video')}>预览视频</Button>
      <Button onClick={() => preview('pdf')}>预览pdf</Button>
      <Button onClick={() => preview('word')}>预览word</Button>
      <Button onClick={() => preview('excel')}>预览excel</Button>
      <FileViewer
        {...previewInfo}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

export default Demo;
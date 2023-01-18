import * as React from 'react';
import { Button } from 'antd';
import FileViewer from '../../../biz-form/demos/components/FileViewer';

function Demo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>预览图片</Button>
      <FileViewer
        url='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        fileName='图片文件名称111'
        fileType='image'
        open={open}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}

export default Demo;
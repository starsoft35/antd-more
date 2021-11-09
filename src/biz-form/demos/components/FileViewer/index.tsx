import * as React from 'react';
import MediaViewer from './MediaViewer';
import styles from './index.less';

interface FileViewerProps {
  fileName?: string;
  filePath: string;
  // fileType: 'image' | 'audio' | 'video' | 'pdf';
  fileType: string;
}

const FileViewer: React.FunctionComponent<FileViewerProps> = ({ fileName, filePath, fileType }) => {
  if (fileType === 'image') {
    return <img src={filePath} alt="" className={styles.viewer} />;
  }
  if (fileType === 'audio') {
    return <MediaViewer filePath={filePath} mediaType="audio" />;
  }

  if (fileType === 'video') {
    return <MediaViewer filePath={filePath} mediaType="video" />;
  }

  if (fileType === 'pdf') {
    return <iframe src={filePath} frameBorder="0" width="800" height="400" />;
  }

  return (
    <div>
      该文件不支持预览，你可尝试{' '}
      <a href={filePath} download={fileName || filePath}>
        点击下载
      </a>
      。
    </div>
  );
};

export default FileViewer;

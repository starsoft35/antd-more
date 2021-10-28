import * as React from 'react';
import styles from './index.less';

interface MediaViewerProps {
  filePath: string;
  mediaType: 'audio' | 'video';
}

const MediaViewer: React.FunctionComponent<MediaViewerProps> = ({ filePath, mediaType }) => {
  const mediaRef = React.useRef<HTMLVideoElement>();

  React.useEffect(() => {
    const target = mediaRef.current;
    return () => {
      if (target && target.played) {
        target.pause();
      }
    }
  }, []);

  return React.createElement(mediaType, {
    src: filePath,
    controls: true,
    style: { width: '100%' },
    className: styles.viewer,
    ref: mediaRef
  });
}

export default MediaViewer;
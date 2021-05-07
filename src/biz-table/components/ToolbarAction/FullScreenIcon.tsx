import * as React from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import TableContext from '../../TableContext';

const FullScreenIcon: React.FC = () => {
  const { rootRef, isFullScreen, setFullScreen } = React.useContext(TableContext);

  React.useEffect(() => {
    rootRef.current.onfullscreenchange = (e) => {
      setFullScreen(document.fullscreenElement === e.target);
    };
  }, []);

  const fullScreen = React.useCallback(() => {
    return Promise.resolve(rootRef.current.requestFullscreen());
  }, [rootRef]);

  const toggleFullScreen = React.useCallback(() => {
    if (!document.fullscreenEnabled) {
      message.warning('当前页面不支持全屏功能');
      return;
    }

    if (!document.fullscreenElement) {
      fullScreen().catch((err: any) => message.error(err.message));
    } else {
      document.exitFullscreen();
    }
  }, [fullScreen]);

  return isFullScreen ? (
    <Tooltip title="退出全屏">
      <FullscreenExitOutlined onClick={toggleFullScreen} />
    </Tooltip>
  ) : (
    <Tooltip title="全屏">
      <FullscreenOutlined onClick={toggleFullScreen} />
    </Tooltip>
  );
};

export default FullScreenIcon;

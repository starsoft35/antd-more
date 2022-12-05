import * as React from 'react';
import type { SpaceProps } from 'antd';
import { Space } from 'antd';
import ReloadIcon from './ReloadIcon';
import DensityIcon from './DensityIcon';
import ColumnSetting from './ColumnSetting';
import FullScreenIcon from './FullScreenIcon';

type ToolbarActionConfig = {
  reload?: boolean;
  density?: boolean;
  columnSetting?: boolean;
  fullScreen?: boolean;
};

export interface ToolbarActionProps extends SpaceProps {
  config?: ToolbarActionConfig;
}

const ToolbarAction: React.FC<ToolbarActionProps> = ({ config, ...restProps }) => {
  return (
    <Space size="middle" {...restProps} style={{ fontSize: '16px', ...restProps?.style }}>
      {config.reload && <ReloadIcon />}
      {config.density && <DensityIcon />}
      {config.columnSetting && <ColumnSetting />}
      {config.fullScreen && <FullScreenIcon />}
    </Space>
  );
};

export default ToolbarAction;

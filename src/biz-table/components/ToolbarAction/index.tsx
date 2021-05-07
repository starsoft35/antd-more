import * as React from 'react';
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

export interface ToolbarActionProps {
  config?: ToolbarActionConfig;
}

const ToolbarAction: React.FC<ToolbarActionProps> = ({ config }) => {
  return (
    <Space size="middle" style={{ fontSize: '16px' }}>
      {config.reload && <ReloadIcon />}
      {config.density && <DensityIcon />}
      {config.columnSetting && <ColumnSetting />}
      {config.fullScreen && <FullScreenIcon />}
    </Space>
  );
};

export default ToolbarAction;

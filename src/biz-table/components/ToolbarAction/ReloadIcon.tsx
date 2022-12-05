import * as React from 'react';
import { Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import TableContext from '../../TableContext';

// 兼容 antd v4
import 'antd/es/tooltip/style';

const DensityIcon = () => {
  const { reload } = React.useContext(TableContext);

  return (
    <Tooltip title="刷新">
      <ReloadOutlined onClick={reload} />
    </Tooltip>
  );
};

export default DensityIcon;

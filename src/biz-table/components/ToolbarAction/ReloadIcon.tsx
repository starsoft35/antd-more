import * as React from 'react';
import { Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import TableContext from '../../TableContext';

const DensityIcon = () => {
  const { reload } = React.useContext(TableContext);

  return (
    <Tooltip title="刷新">
      <ReloadOutlined onClick={reload} />
    </Tooltip>
  );
};

export default DensityIcon;

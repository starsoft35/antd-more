import * as React from 'react';
import { Menu, Dropdown, Tooltip } from 'antd';
import { ColumnHeightOutlined } from '@ant-design/icons';
import TableContext from '../../TableContext';
import type { TableContextProps } from '../../TableContext';

const DensityIcon = () => {
  const { size, setSize } = React.useContext(TableContext);

  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[!size || size === 'large' ? 'default' : size]}
          onClick={({ key }) => {
            setSize?.(key as TableContextProps['size']);
          }}
          items={[
            {
              label: '默认',
              key: 'default'
            },
            {
              label: '中等',
              key: 'middle'
            },
            {
              label: '紧凑',
              key: 'small'
            }
          ]}
          style={{
            width: 80
          }}
        />
      }
      trigger={['click']}
    >
      <Tooltip title="表格密度">
        <ColumnHeightOutlined />
      </Tooltip>
    </Dropdown>
  );
};

export default DensityIcon;

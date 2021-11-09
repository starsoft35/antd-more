import * as React from 'react';
import { Menu, Dropdown, Tooltip } from 'antd';
import { ColumnHeightOutlined } from '@ant-design/icons';
import TableContext from '../../TableContext';
import type { TableContextProps } from '../../TableContext';

const DensityIcon: React.FC = () => {
  const { size, setSize } = React.useContext(TableContext);

  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[!size || size === 'large' ? 'default' : size]}
          onClick={({ key }) => {
            setSize?.(key as TableContextProps['size']);
          }}
          style={{
            width: 80
          }}
        >
          <Menu.Item key="default">默认</Menu.Item>
          <Menu.Item key="middle">中等</Menu.Item>
          <Menu.Item key="small">紧凑</Menu.Item>
        </Menu>
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

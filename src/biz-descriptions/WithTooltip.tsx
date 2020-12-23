import * as React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export interface WithTooltipProps {
  label?: React.ReactNode;
  tooltip?: string;
}

const WithTooltip: React.FC<WithTooltipProps> = ({ label, tooltip }) => {
  if (!label) {
    return null;
  }

  if (tooltip) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        <Tooltip title={tooltip}>
          <InfoCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </div>
    );
  }

  return label as React.ReactElement;
};

export default WithTooltip;

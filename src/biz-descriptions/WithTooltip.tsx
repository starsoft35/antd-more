import * as React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

// 兼容 antd v4
import 'antd/es/tooltip/style';

type WrapperTooltipProps = TooltipProps & {
  icon?: React.ReactNode;
};

export interface WithTooltipProps {
  label?: React.ReactNode;
  tooltip?: TooltipProps['title'] | WrapperTooltipProps;
}

function toTooltipProps(props: WithTooltipProps['tooltip']): WrapperTooltipProps | null {
  if (!props) {
    return null;
  }
  if (typeof props === 'object' && !React.isValidElement(props)) {
    return props as WrapperTooltipProps;
  }

  return {
    title: props
  };
}

const WithTooltip: React.FC<WithTooltipProps> = ({ label, tooltip }) => {
  if (!label) {
    return null;
  }

  const tooltipProps = toTooltipProps(tooltip);

  if (tooltipProps) {
    const { icon = <InfoCircleOutlined />, ...restTooltipProps } = tooltipProps;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        <Tooltip {...restTooltipProps}>
          <div style={{ marginLeft: 4 }}>{icon}</div>
        </Tooltip>
      </div>
    );
  }

  return label as React.ReactElement;
};

export default WithTooltip;

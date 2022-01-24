import * as React from 'react';
import { Tooltip, Spin } from 'antd';

interface IdentifyCodeProps {
  loading?: boolean;
  src?: string;
  width?: string | number;
  height?: string | number;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const IdentifyCode: React.FC<IdentifyCodeProps> = ({
  loading = true,
  src,
  width = 108,
  height = 40,
  onClick,
  style,
  className
}) => {
  const img = (
    <img
      src={src}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}
      alt="验证码"
      onClick={onClick}
    />
  );

  return (
    <Spin size="small" spinning={loading}>
      <div className={className} style={{ width, height, ...style }}>
        {src && <Tooltip title="点击刷新验证码">{img}</Tooltip>}
      </div>
    </Spin>
  );
};

export default IdentifyCode;

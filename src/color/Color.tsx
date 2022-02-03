import React, { useMemo } from 'react';
import classNames from 'classnames';
import './index.less';

const prefixCls = 'antd-more-color';

export interface ColorProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  value: string;
  showText?: boolean;
  size?: 'small' | 'middle';
  renderColor?: (dom: JSX.Element) => React.ReactNode;
}

const Color: React.FC<ColorProps> = ({
  className,
  value,
  size = 'small',
  showText = false,
  renderColor,
  ...restProps
}) => {
  const colorDom = useMemo(
    () => (
      <span className={`${prefixCls}-outer`} title={value}>
        <span className={`${prefixCls}-inner`} style={{ backgroundColor: value }} />
      </span>
    ),
    [value]
  );

  const colorView = renderColor ? renderColor(colorDom) : colorDom;

  return (
    <span className={classNames(className, prefixCls, `${prefixCls}-${size}`)} {...restProps}>
      {colorView}
      {showText && value && <span className={`${prefixCls}-text`}>{value}</span>}
    </span>
  );
};

export default Color;

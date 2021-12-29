import React, { useCallback, useState, cloneElement } from 'react';
import { Popover, PopoverProps, TooltipProps } from 'antd';
import classNames from 'classnames';
import { transformColor, ColorObj } from './utils';

import './index.less';

const prefixCls = 'antd-more-color';

interface PhotoshopAction {
  onCancel?: () => void;
  onAccept?: () => void;
  [key: string]: any;
}

export interface PickerCommonProps {
  className?: string;
  value?: string;
  showText?: boolean;
  trigger?: 'click' | 'hover' | string | string[];
  onChange?: (colorStr: string) => void;
  colorMode?: 'hex' | 'rgb';
  placement?: TooltipProps['placement'];
}

export interface PickerWrapperProps extends PickerCommonProps, PopoverProps {
  children?: React.ReactElement | any;
  childrenProps?: PhotoshopAction;
  photoshop?: boolean;
  [key: string]: any;
}

const PickerWrapper: React.FC<PickerWrapperProps> = ({
  className,
  value,
  showText = false,
  trigger = 'click',
  onChange,
  colorMode = 'hex',
  placement = 'bottomLeft',
  children,
  childrenProps = {},
  photoshop = false,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false);

  const handleChangeComplete = useCallback(
    (color: ColorObj) => {
      onChange?.(transformColor(color, colorMode));
    },
    [colorMode, onChange]
  );

  const photoshopAction: PhotoshopAction = {};

  if (photoshop && !photoshopAction.onCancel) {
    photoshopAction.onCancel = () => {
      childrenProps.onCancel && childrenProps.onCancel();
      setVisible(false);
    };
    photoshopAction.onAccept = () => {
      childrenProps.onAccept && childrenProps.onAccept();
      setVisible(false);
    };
  }

  return (
    <span className={classNames(className, prefixCls)}>
      <Popover
        content={cloneElement(children, {
          onChangeComplete: handleChangeComplete,
          color: value || 'transparent',
          ...childrenProps,
          ...photoshopAction
        })}
        trigger={trigger}
        visible={visible}
        onVisibleChange={setVisible}
        autoAdjustOverflow={false}
        placement={placement}
        overlayClassName={`${prefixCls}-overlay-normalize`}
        {...restProps}
      >
        <span
          className={classNames(`${prefixCls}-outer`, `${prefixCls}-select`, {
            [`${prefixCls}-active`]: visible
          })}
          title={value}
        >
          <span className={`${prefixCls}-inner`} style={value ? { backgroundColor: value } : {}} />
        </span>
      </Popover>
      {showText && <span className={`${prefixCls}-text`}>{value}</span>}
    </span>
  );
};

export default PickerWrapper;

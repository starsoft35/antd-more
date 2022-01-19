import React from 'react';
import { ChromePicker } from 'react-color';
import type { PickerCommonProps } from './PickerWrapper';
import PickerWrapper from './PickerWrapper';

export interface ChromePickerProps extends PickerCommonProps {
  renderers?: {
    canvas?: HTMLCanvasElement;
  };
}

const ChromePickerWrapper: React.FC<ChromePickerProps> = ({
  className,
  value,
  trigger,
  showText,
  onChange,
  colorMode,
  placement,
  changeMethod,
  size,
  ...restProps
}) => {
  const wrapperProps = {
    className,
    value,
    trigger,
    showText,
    onChange,
    colorMode,
    placement,
    changeMethod,
    size
  };

  return (
    <PickerWrapper {...wrapperProps}>
      <ChromePicker {...restProps} disableAlpha={colorMode !== 'rgb'} />
    </PickerWrapper>
  );
};

export default ChromePickerWrapper;

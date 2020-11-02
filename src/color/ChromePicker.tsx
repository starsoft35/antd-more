import React from 'react';
import { ChromePicker } from 'react-color';
import PickerWrapper, { PickerCommonProps } from './PickerWrapper';

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
  };

  return (
    <PickerWrapper {...wrapperProps}>
      <ChromePicker {...restProps} disableAlpha={colorMode !== 'rgb'} />
    </PickerWrapper>
  );
};

export default ChromePickerWrapper;

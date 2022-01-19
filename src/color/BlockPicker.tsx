import React from 'react';
import { BlockPicker } from 'react-color';
import type { PickerCommonProps } from './PickerWrapper';
import PickerWrapper from './PickerWrapper';

export interface BlockPickerProps extends PickerCommonProps {
  width?: string;
  colors?: string[];
}

const BlockPickerWrapper: React.FC<BlockPickerProps> = ({
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
      <BlockPicker {...restProps} triangle="hide" />
    </PickerWrapper>
  );
};

export default BlockPickerWrapper;

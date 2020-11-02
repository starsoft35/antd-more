import React from 'react';
import { BlockPicker } from 'react-color';
import PickerWrapper, { PickerCommonProps } from './PickerWrapper';

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
      <BlockPicker {...restProps} triangle="hide" />
    </PickerWrapper>
  );
};

export default BlockPickerWrapper;

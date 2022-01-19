import React from 'react';
import { CompactPicker } from 'react-color';
import type { PickerCommonProps } from './PickerWrapper';
import PickerWrapper from './PickerWrapper';

export interface CompactPickerProps extends PickerCommonProps {
  colors?: string[];
}

const CompactPickerWrapper: React.FC<CompactPickerProps> = ({
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
      <CompactPicker {...restProps} />
    </PickerWrapper>
  );
};

export default CompactPickerWrapper;

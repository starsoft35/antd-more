import React from 'react';
import { CompactPicker } from 'react-color';
import PickerWrapper, { PickerCommonProps } from './PickerWrapper';

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
      <CompactPicker {...restProps} />
    </PickerWrapper>
  );
};

export default CompactPickerWrapper;

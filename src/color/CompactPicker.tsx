import React from 'react';
import type { CompactPickerProps } from 'react-color';
import { CompactPicker } from 'react-color';
import type { PickerWrapperProps } from './PickerWrapper';
import PickerWrapper from './PickerWrapper';

export interface ColorCompactPickerProps extends PickerWrapperProps {
  pickerProps?: Omit<CompactPickerProps, 'onChange' | 'onChangeComplete'>;
}

const CompactPickerWrapper: React.FC<ColorCompactPickerProps> = ({
  pickerProps,
  ...restProps
}) => {
  return (
    <PickerWrapper {...restProps}>
      <CompactPicker {...pickerProps} />
    </PickerWrapper>
  );
};

export default CompactPickerWrapper;

import React, { useState, useCallback } from 'react';
import { PhotoshopPicker } from 'react-color';
import PickerWrapper, { PickerCommonProps } from './PickerWrapper';
import { transformColor } from './utils';

export interface PhotoshopPickerProps extends PickerCommonProps {
  header?: string;
}

const PhotoshopPickerWrapper: React.FC<PhotoshopPickerProps> = ({
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
  const [innerColor, setInnerColor] = useState(value);

  const handleChangeComplete = useCallback((color) => {
    setInnerColor(transformColor(color, colorMode));
  }, []);

  const handleAccept = useCallback(() => {
    if (typeof onChange === 'function') {
      onChange(innerColor as string);
    }
  }, [innerColor, colorMode]);

  return (
    <PickerWrapper
      placement="topLeft"
      {...wrapperProps}
      childrenProps={{
        color: innerColor,
        onChangeComplete: handleChangeComplete,
        onAccept: handleAccept,
        cancelable: true,
      }}
      photoshop
    >
      <PhotoshopPicker {...restProps} />
    </PickerWrapper>
  );
};

export default PhotoshopPickerWrapper;

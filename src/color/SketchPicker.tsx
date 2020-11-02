import React from 'react';
import { SketchPicker } from 'react-color';
import PickerWrapper, { PickerCommonProps } from './PickerWrapper';

export type PresetColor = { color: string; title: string } | string;

export interface SketchPickerProps extends PickerCommonProps {
  width?: string;
  renderers?: {
    canvas?: HTMLCanvasElement;
  };
  presetColors?: PresetColor[];
}

const SketchPickerWrapper: React.FC<SketchPickerProps> = ({
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
    <PickerWrapper placement="topLeft" {...wrapperProps}>
      <SketchPicker {...restProps} disableAlpha={colorMode !== 'rgb'} />
    </PickerWrapper>
  );
};

export default SketchPickerWrapper;

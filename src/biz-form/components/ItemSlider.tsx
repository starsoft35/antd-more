import * as React from 'react';
import { Slider } from 'antd';
import { SliderSingleProps, SliderRangeProps } from 'antd/lib/slider';
import BizFormItem, { BizFormItemProps } from './Item';

export interface FormItemSliderProps
  extends BizFormItemProps,
    Pick<SliderSingleProps, 'min' | 'max' | 'step' | 'marks'> {
  sliderProps?: SliderSingleProps | SliderRangeProps;
}

const FormItemSlider: React.FC<FormItemSliderProps> = ({
  min,
  max,
  step,
  marks,
  sliderProps = {},
  ...restProps
}) => {
  return (
    <BizFormItem {...restProps}>
      <Slider min={min} max={max} step={step} marks={marks} {...sliderProps} />
    </BizFormItem>
  );
};

export default FormItemSlider;

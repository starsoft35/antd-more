import * as React from 'react';
import { TooltipPlacement } from 'antd/es/tooltip';
import Color from '../../color';
import BizFormItem, { BizFormItemProps } from './Item';

export enum ColorPicker {
  block = 'BlockPicker',
  chrome = 'ChromePicker',
  compact = 'CompactPicker',
  photoshop = 'PhotoshopPicker',
  sketch = 'SketchPicker',
}

export interface FormItemColorProps extends BizFormItemProps {
  showText?: boolean;
  picker?: keyof typeof ColorPicker;
  trigger?: 'hover' | 'click' | string;
  colorMode?: 'rgb' | 'hex';
  placement?: TooltipPlacement;
  colorProps?: any;
}

const FormItemColor: React.FC<FormItemColorProps> = ({
  label,
  required = false,

  picker = 'sketch',
  showText,
  trigger,
  colorMode,
  placement,
  colorProps,
  ...restProps
}) => {
  const Comp = Color[ColorPicker[picker]];

  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${label}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      {...restProps}
    >
      <Comp
        showText={showText}
        trigger={trigger}
        colorMode={colorMode}
        placement={placement}
        {...colorProps}
      />
    </BizFormItem>
  );
};

export default FormItemColor;

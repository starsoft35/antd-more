import * as React from 'react';
import type { TooltipProps } from './antd.interface';
import type { ColorSketchPickerProps } from '../../color';
import { ColorSketchPicker } from '../../color';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export enum ColorPicker {
  block = 'BlockPicker',
  chrome = 'ChromePicker',
  compact = 'CompactPicker',
  photoshop = 'PhotoshopPicker',
  sketch = 'SketchPicker'
}

export interface BizFormItemColorProps extends BizFormItemProps {
  showText?: boolean;
  colorMode?: 'rgb' | 'hex';
  placement?: TooltipProps['placement'];
  colorProps?: ColorSketchPickerProps;
}

const BizFormItemColor: React.FC<BizFormItemColorProps> = ({
  required = false,
  showText,
  colorMode,
  placement,
  colorProps,
  ...restProps
}) => {
  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      {...restProps}
    >
      <ColorSketchPicker
        showText={showText}
        colorMode={colorMode}
        placement={placement}
        {...colorProps}
      />
    </BizFormItem>
  );
};

export default BizFormItemColor;

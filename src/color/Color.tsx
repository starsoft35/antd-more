import React from 'react';
import classNames from 'classnames';
import BlockPicker from './BlockPicker';
import ChromePicker from './ChromePicker';
import CompactPicker from './CompactPicker';
import PhotoshopPicker from './PhotoshopPicker';
import SketchPicker from './SketchPicker';

import './index.less';

const prefixCls = 'antd-more-color';

export interface ColorProps {
  className?: string;
  value: string;
  showText?: boolean;
  size?: 'small' | 'middle';
  [x: string]: any;
}

const Color: React.FC<ColorProps> & {
  BlockPicker: typeof BlockPicker;
  ChromePicker: typeof ChromePicker;
  CompactPicker: typeof CompactPicker;
  PhotoshopPicker: typeof PhotoshopPicker;
  SketchPicker: typeof SketchPicker;
} = ({ className, value, size = 'small', showText = false, ...restProps }) => {
  return (
    <span className={classNames(className, prefixCls, `${prefixCls}-${size}`)} {...restProps}>
      <span className={`${prefixCls}-outer`} title={value}>
        <span className={`${prefixCls}-inner`} style={{ backgroundColor: value }} />
      </span>
      {showText && <span className={`${prefixCls}-text`}>{value}</span>}
    </span>
  );
};

Color.BlockPicker = BlockPicker;
Color.SketchPicker = SketchPicker;
Color.PhotoshopPicker = PhotoshopPicker;
Color.ChromePicker = ChromePicker;
Color.CompactPicker = CompactPicker;

export default Color;

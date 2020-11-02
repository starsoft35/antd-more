import React from 'react';
import classNames from 'classnames';

import BlockPicker from './BlockPicker';
import ChromePicker from './ChromePicker';
import CompactPicker from './CompactPicker';
import PhotoshopPicker from './PhotoshopPicker';
import SketchPicker from './SketchPicker';

const prefixCls = 'antd-more-color';

export interface ColorProps {
  className?: string;
  value: string;
  showText?: boolean;
}

class Color extends React.Component<ColorProps> {
  static defaultProps = {
    showText: false,
  };

  static BlockPicker: typeof BlockPicker;

  static ChromePicker: typeof ChromePicker;

  static CompactPicker: typeof CompactPicker;

  static PhotoshopPicker: typeof PhotoshopPicker;

  static SketchPicker: typeof SketchPicker;

  render() {
    const { className, value, showText } = this.props;
    return (
      <span className={classNames(className, prefixCls)}>
        <span className="color" title={value}>
          <span className="inner" style={{ backgroundColor: value }} />
        </span>
        {showText && <span className="text">{value}</span>}
      </span>
    );
  }
}

export default Color;

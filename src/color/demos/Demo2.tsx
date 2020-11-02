/**
 * title: 选择颜色
 * desc: |
 *  支持设置颜色选择器位置、颜色模式（`rgb`、`hex`）。
 *
 *  其中 `ChromePicker` `SketchPicker` 在颜色模式为 `rgb` 时，支持设置透明度。
 */

import React, { useState } from 'react';
import { Color } from 'antd-more';

export default () => {
  const [colorOne, setColorOne] = useState('#e60000');
  const [colorTwo, setColorTwo] = useState('rgba(255,127,0,1)');
  const [colorThree, setColorThree] = useState('#fcdc00');
  const [colorFour, setColorFour] = useState('#a4dd00');
  const [colorFive, setColorFive] = useState('rgba(104,204,202,1)');

  return (
    <>
      <h3>BlockPicker</h3>
      <Color.BlockPicker value={colorOne} onChange={setColorOne} showText />
      <br />
      <br />
      <h3>ChromePicker</h3>
      <Color.ChromePicker
        value={colorTwo}
        onChange={setColorTwo}
        showText
        colorMode="rgb"
        placement="topLeft"
      />
      <br />
      <br />
      <h3>CompactPicker</h3>
      <Color.CompactPicker value={colorThree} onChange={setColorThree} showText />
      <br />
      <br />
      <h3>PhotoshopPicker</h3>
      <Color.PhotoshopPicker
        value={colorFour}
        onChange={setColorFour}
        showText
        placement="topLeft"
      />
      <br />
      <br />
      <h3>SketchPicker</h3>
      <Color.SketchPicker
        value={colorFive}
        onChange={setColorFive}
        showText
        colorMode="rgb"
        placement="topLeft"
      />
    </>
  );
};

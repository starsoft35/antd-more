---
group:
  title: 通用
toc: content
---

# Color - 颜色

> 推荐使用 [BizField](/components/biz-field)、[BizFormItemColor](/components/item#color)。

用于显示/选择颜色

## 代码演示

### 显示颜色

设置 `showText` 显示颜色值

<code src="./demos/Demo1.tsx"></code>

### 选择颜色

支持设置颜色选择器位置、颜色模式（`rgb`、`hex`）。

其中 `ColorChromePicker` `ColorSketchPicker` 在颜色模式为 `rgb` 时，支持设置透明度。

<code src="./demos/Demo2.tsx"></code>

### Form 中使用

<code src="./demos/Demo3.tsx"></code>

## API

### Color

```typescript
import { Color } from 'antd-more';
```

| 参数     | 说明           | 类型                  | 默认值    |
| -------- | -------------- | --------------------- | --------- |
| value    | 颜色值         | `string`              | -         |
| showText | 显示颜色值文本 | `boolean`             | `false`   |
| size     | 颜色块大小     | `'small' \| 'middle'` | `'small'` |

### Picker 共同的 API

```typescript
import {
  ColorBlockPicker,
  ColorChromePicker,
  ColorCompactPicker,
  ColorPhotoshopPicker,
  ColorSketchPicker
} from 'antd-more';
```

除了以下参数外，还支持各自的 API，更多信息可查阅 [react-color](http://casesandberg.github.io/react-color/) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 颜色值 | `string` | - |
| showText | 显示颜色值文本 | `boolean` | `false` |
| onChange | 当颜色值变动后触发。 | `(color: string) => void` | - |
| trigger | 触发行为 | `'hover' \| 'click'` | `'click'` |
| colorMode | 颜色模式 | `'hex' \| 'rgb'` | `'hex'` |
| placement | 颜色选择浮层位置 | `'top' \| 'left' \| 'right' \| 'bottom' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` | `'bottomLeft'` |
| size | 颜色块大小 | `'small' \| 'middle'` | `'small'` |

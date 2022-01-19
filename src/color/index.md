---
title: Color - 颜色
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

# Color

> 推荐使用 [BizField](/components/biz-field) 和 [BizForm.ItemColor](/components/item#itemcolor)。

用于显示/选择颜色

## 代码演示

### 显示颜色

<code src="./demos/Demo1.tsx" />

### 选择颜色

<code src="./demos/Demo2.tsx" />

### Form 中使用

<code src="./demos/Demo3.tsx" />

## API

### Color

| 参数     | 说明           | 类型                  | 默认值    |
| -------- | -------------- | --------------------- | --------- |
| value    | 颜色值         | `string`              | -         |
| showText | 显示颜色值文本 | `boolean`             | `false`   |
| size     | 颜色块大小     | `'small' \| 'middle'` | `'small'` |

### Picker 共同的 API

以下 API 为 `BlockPicker` `ChromePicker` `CompactPicker` `PhotoshopPicker` `SketchPicker` 共同的 API。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 颜色值 | `string` | - |
| showText | 显示颜色值文本 | `boolean` | `false` |
| onChange | 当颜色值变动后触发。 | `(color: string) => void` | - |
| trigger | 触发行为 | `'hover' \| 'click'` | `'click'` |
| colorMode | 颜色模式 | `'hex' \| 'rgb'` | `'hex'` |
| placement | 颜色选择浮层位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | `string` | `'bottomLeft'` |
| size | 颜色块大小 | `'small' \| 'middle'` | `'small'` |

### Color.BlockPicker

| 参数   | 说明             | 类型       | 默认值  |
| ------ | ---------------- | ---------- | ------- |
| width  | 颜色选择浮层宽度 | `string`   | `170px` |
| colors | 预置快捷选择颜色 | `string[]` | -       |

### Color.ChromePicker

```javascript
type Renderers = { canvas?: HTMLCanvasElement };
```

<br />

| 参数      | 说明                                                 | 类型        | 默认值 |
| --------- | ---------------------------------------------------- | ----------- | ------ |
| renderers | 使用 `{canvas: Canvas}` 和 `canvas` 节点来处理 `SSR` | `Renderers` | -      |

### Color.CompactPicker

| 参数   | 说明             | 类型       | 默认值 |
| ------ | ---------------- | ---------- | ------ |
| colors | 预置快捷选择颜色 | `string[]` | -      |

### Color.PhotoshopPicker

| 参数   | 说明             | 类型     | 默认值         |
| ------ | ---------------- | -------- | -------------- |
| header | 颜色选择浮层标题 | `string` | `Color Picker` |

### Color.SketchPicker

```javascript
type PresetColor = { color: string, title: string } | string;
type Renderers = { canvas?: HTMLCanvasElement };
```

<br />

| 参数         | 说明                                                 | 类型            | 默认值  |
| ------------ | ---------------------------------------------------- | --------------- | ------- |
| width        | 颜色选择浮层宽度                                     | `string`        | `200px` |
| renderers    | 使用 `{canvas: Canvas}` 和 `canvas` 节点来处理 `SSR` | `Renderers`     | -       |
| presetColors | 预置快捷选择颜色                                     | `PresetColor[]` | -       |

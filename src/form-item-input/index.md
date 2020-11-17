---
title: FormItemInput
group:
  title: 基础表单项
  path: /base-form-item
  order: 1
legacy: /base-form-item/form-item-input
---

# FormItemInput

Input 输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**校验顺序**

- 必填时为空，提示：`请输入${label}`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 常用示例

<code src="./demos/Demo2.tsx" />

## API

### 共同的API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
disabledWhiteSpace | 禁止输入空白符。`Password` 组件不支持该项。 | `boolean` | `false` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) \| [`Input.Password`](https://ant-design.gitee.io/components/input-cn/#Input.Password) \| [`Input.TextArea`](https://ant-design.gitee.io/components/input-cn/#Input.TextArea) | - |

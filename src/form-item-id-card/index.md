---
title: FormItemIdCard
group:
  title: 表单项
  path: /form
  order: 1
legacy: /form/form-item-id-card
---

# FormItemIdCard

身份证号输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 过滤非数字`xX`（如果开启脱敏校验允许输入脱敏符号）
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较
- 使用 [util-helpers isIdCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard) 验证

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 脱敏

<code src="./demos/Demo2.tsx" />

## API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
security  | 开启脱敏校验。为 `ture` 时，必须传入 `initialValue` 。 | `boolean` | `false` |
symbol  | 脱敏符号 | `string` | `*` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |
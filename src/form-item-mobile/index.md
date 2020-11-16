---
title: FormItemMobile
group:
  title: 业务表单项
  path: /business-form-item
  order: 1
legacy: /business-form-item/form-item-mobile
---

# FormItemMobile

手机号码输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 过滤非数字（如果开启脱敏校验允许输入脱敏符号）
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 使用 [util-helpers isMobile](https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile) 验证，提示：`请输入正确的${label}`

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
---
title: FormItemPassword
group:
  title: 表单项
  path: /form-item
  order: 1
legacy: /form-item/password
---

# FormItemPassword

密码输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 失焦校验

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 验证长度，提示：`${label}为${min}～${max}位`
- 验证非法字符，提示：`${label}包含无法识别的字符`
- 使用 [util-helpers isPassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.isPassword) 验证密码强度，提示：`${label}为大小写字母、数字或符号任意${numMap[level]}者组成`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 不同规则

<code src="./demos/Demo2.tsx" />

## API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
min  | 最小长度 | `number` | `8` |
max  | 最大长度 | `number` | `16` |
level  | 密码强度。可选 `1` `2` `3` | `number` | `2` |
ignoreCase | 忽略大小写。为 `ture` 时，大小写字母视为一种字符 | `boolean` | `false` |
special  | 支持的特殊字符 | `string` | `!@#$%^&*()-=_+[]\|{},./?<>~` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |
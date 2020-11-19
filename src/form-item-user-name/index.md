---
title: FormItemUserName
group:
  title: 表单项
  path: /form-item
  order: 1
legacy: /form-item/user-name
---

# FormItemUserName

用户名输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 自动过滤空格
- 失焦校验

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 验证长度，提示：`${label}为${min}~${max}位`
- 验证非手机号码，提示：`${label}不能为手机号码`
- 验证不包含@符号，提示：`${label}不能包含@符号`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
min  | 最小长度 | `number` | `6` |
max  | 最大长度 | `number` | `32` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |
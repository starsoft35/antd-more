---
title: FormItemNumber
group:
  title: 业务表单项
  path: /business-form-item
  order: 1
legacy: /business-form-item/form-item-number
---

# FormItemNumber

数字输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 支持数字输入框前后插入元素
- 返回的值为类型数字
- 默认精度 `precision=2`

**校验顺序**

- 必填时不为数字，提示：`请输入${label}`
- 大于等于 `lt` 时，提示：`不能大于等于${lt}`
- 小于等于 `gt` 时，提示：`不能小于等于${gt}`
- 大于 `lte` 时，提示：`不能大于${lte}`
- 小于 `gte` 时，提示：`不能小于${gt}`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 常用示例

<code src="./demos/Demo2.tsx" />

## API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
before  | 数字输入框前面元素。 | `React.ReactNode` | - |
after  | 数字输入框后面元素。 | `React.ReactNode` | - |
lt  | 最大值。 | `number` | - |
lte  | 最大值（允许等于最大值）。 | `number` | - |
gt  | 最小值。 | `number` | - |
gte  | 最小值（允许等于最小值）。 | `number` | - |
inputProps  | 数字输入框配置参数 | [`InputNumberProps`](https://ant-design.gitee.io/components/input-number-cn/#API) | - |
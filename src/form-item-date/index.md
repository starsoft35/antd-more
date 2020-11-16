---
title: FormItemDate
group:
  title: 业务表单项
  path: /business-form-item
  order: 1
legacy: /business-form-item/form-item-mobile
---

# FormItemDate

日期选择框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 向前/后禁选范围
- 最大区间范围

**校验顺序**

- 必填时为空，提示：`请选择${label}`
- 日期范围判断超过区间，提示：`时间跨度不能超过${maxRange}天/周/月/季/年`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 常用示例一

<code src="./demos/Demo2.tsx" />

### 日期范围

<code src="./demos/Demo3.tsx" />

### 常用示例二

<code src="./demos/Demo4.tsx" />

## API

### 共同的API

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
disabledDateBefore  | 快捷配置 `disabledDate` ，不可选基于当天增加/减少之前的日期。 | `number` | - |
disabledDateAfter  | 快捷配置 `disabledDate` ，不可选基于当天增加/减少之后的日期。 | `number` | - |
pickerProps  | 日期选择框配置参数，参考 [`API`](https://ant-design.gitee.io/components/date-picker-cn/#API) | [`DataProps`](https://ant-design.gitee.io/components/date-picker-cn/#API) | - |

### FormItemDate.Range

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
maxRange  | 最大可选范围值，用于校验，根据当前 picker 为单位。比如当前 `picker=weeks` 该数字表示最大可选多少周。 | `number` | - |
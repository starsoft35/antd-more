---
group:
  title: 表单组件
  order: 2
---

# 费率输入 - ItemNumberFee

前置值+输入值=当前值。

## 代码演示

### 基础用法

<code src='../../src/demos/ItemNumberFee/basic.tsx'></code>

### 结算信息

<code src='../../src/demos/ItemNumberFee/rakeback.tsx'></code>

## API

除以下参数，其余同 [BizFormItem](/components/biz-form-item) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| beforeValue | 前置值。一般等于最小值。 | `string \| number` | - |
| forceRenderInitialValue | 强制渲染输入的初始值，需要有 `beforeValue` `value` 才生效。 | `boolean` | - |
| lte | 最大值（允许等于），用于校验 | `number` | - |
| gte | 最小值（允许等于），用于校验 | `number` | - |
| inputProps | 数字输入框的属性 | [InputNumberProps](https://ant-design.gitee.io/components/input-number-cn/#API) | - |

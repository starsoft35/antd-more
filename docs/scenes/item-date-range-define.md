---
group:
  title: 表单组件
  order: 2
toc: content
---

# 证件有效期 - ItemDateRangeDefine

自定义日期选择范围

## 代码演示

### 基础用法

<code src='../../src/demos/ItemDateRangeDefine/basic.tsx'></code>

### 其他方案

选择证件开始日期+有效期。该方案常见于移动端。

<code src='../../src/demos/ItemDateRangeDefine/recommend.tsx'></code>

## API

除以下参数，其余同 [BizFormItem](/components/biz-form-item) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| labels | 开始日期和结束日期的标签，主要用于验证 | `[string, string]` | - |
| names | 开始日期和结束日期的字段名 | `[string, string]` | - |
| longTermValue | 长期日期值 | `string` | `'9999-12-31'` |
| longTermLabel | 长期显示标签 | `ReactNode` | `'长期'` |
| hideOnLongTerm | 值为长期时隐藏结束日期选择框 | `boolean` | `true` |
| disabled | 禁止选择 | `boolean` | - |
| strict | 严格模式。开启后，开始日期不能大于今天，结束日期不能小于今天。 | `boolean` | `false` |
| format | 日期格式，参考 [dayjs](https://day.js.org/docs/en/display/format) | `string` | `'YYYY-MM-DD'` |

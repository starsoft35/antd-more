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
| format | 日期格式，参考 [dayjs](https://day.js.org/docs/en/display/format) | `string` | `'YYYY-MM-DD'` |
| longTermValue | 长期日期值 | `string` | `'9999-12-31'` |
| longTermLabel | 长期显示标签 | `ReactNode` | `'长期'` |

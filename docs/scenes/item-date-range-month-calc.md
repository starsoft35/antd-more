---
group:
  title: 表单组件
  order: 2
toc: content
---

# 某月的日期范围 - ItemDateRangeMonthCalc

默认为`当前月`，根据所选月份可选取该月内日期时间段（不可跨月），当日不可选。如当日为该月第一天，默认为`当前月-1`，如需要选择其他月份日期，须先切换月份。

## 代码演示

### 基础用法

<code src='../../src/demos/ItemDateRangeMonthCalc/basic.tsx'></code>

## API

除以下参数，其余同 [BizFormItemDateRange](/components/biz-form-item-date-range) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名，同时配置 `names` 时，该值将会失效。 | `string` | - |
| names | 开始和结束的字段名，配置该值后，原来的 `name` 将失效。如 `['startDate', 'endDate']` 。 | `[string, string]` | - |

## 常见问题

### 手动修改日期范围后，再切换月份，日期的选择面板不会动态跟随

参考 [日期组件时间范围动态跟随（can rangepicker component provied prop to achieve paneltime dynamically followed pre chosen time）](https://github.com/ant-design/ant-design/issues/40680)，官方还未解决。

---
group:
  title: 表单组件
  order: 2
toc: content
---

# 金额输入 - ItemNumberMoney

金额格式化，保留 2 位小数点，支持输入框后面添加文字操作。

## 代码演示

### 基础用法

<code src='../../src/demos/ItemNumberMoney/demos/basic.tsx'></code>

### 更多

<code src='../../src/demos/ItemNumberMoney/demos/exchange.tsx'></code>

## API

除以下参数，其余同 [BizFormItemNumber](/components/biz-form-item#number) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| inputPrefixReverse | 输入框的前缀反转，相当于将 prefix 放到后缀位置。<br/>当该值为 `true` 时，默认关闭输入框的 `controls` 。 | `boolean` | - |

---
title: BizField - 业务字段
group:
  title: BizField - 业务字段
---

# BizField

用于字段展示。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
value  | 值 | `any` | - |
valueType  | 类型 | `ValueType` | - |
valueEnum  | 包含 `value` `name` 的数据字典 | `EnumData[]` | - |

### ValueType 值

类型 | 描述 | 示例 |
------------- | ------------- | ------------- |
text  | 默认不做处理，当值为 [`Falsy`](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 时，显示 `-` | - |
money  | 金额 | 100.00 |
index  | 序列号 | - |
indexBorder  | 带 border 的序列号 | - |
progress  | 进度条 | - |
percent  | 百分比 | - |
color  | 颜色 | - |
enum  | 枚举值，需配合 `valueEnum` 使用。 | - |
enumTag  | 标签形式的枚举值，需配合 `valueEnum` 使用。 | - |
enumBadge  | Badge形式的枚举值，需配合 `valueEnum` 使用。 | - |
date  | 日期 `YYYY-MM-DD` | 2020-10-10 |
dateWeek  | 周 `YYYY-wo` | 2020-41周 |
dateMonth  | 月 `YYYY-MM` | 2020-10 |
dateQuarter  | 季 `YYYY-\QQ` | 2020-Q4 |
dateYear  | 年 `YYYY` | 2020 |
dateRange  | 日期区间 `YYYY-MM-DD ~ YYYY-MM-DD` | 2020-10-10 ~ 2020-12-12 |
dateTime  | 日期时间 `YYYY-MM-DD HH:mm:ss` | 2020-10-10 00:00:00 |
dateTimeRange  | 日期时间区间 `YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss` | 2020-10-10 00:00:00 ~ 2020-12-12 00:00:00 |
time  | 时间 `HH:mm:ss` | 00:00:00 |
fromNow  | 相对当前时间，使用 `moment` [`fromNow`](http://momentjs.cn/docs/#/displaying/fromnow/) 方法 | - |

<br/>

```typescript
interface EnumData {
  name: string;
  value: any;
  // 配置badge
  badge?: {
    status?: string;
    color?: string;
    [key: string]: any;
  };
  // 配置tag
  tag?: {
    color?: string;
    [key: string]: any;
  };
  // 配置文本
  text?: {
    style?: {
      color?: string;
      [key: string]: any;
    }
    [key: string]: any;
  };
  [key: string]: any;
}
```
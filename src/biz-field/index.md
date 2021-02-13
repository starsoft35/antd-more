---
title: BizField
group:
  title: 业务组件
  path: /business
  order: 0
legacy: /business/biz-field
---

# BizField

业务常见字段显示。

在 BizTable BizDescriptions 中使用更方便，只需配置 `valueType` 即可。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

## API

```typescript
import { BizField } from 'antd-more';

<BizField value={value} valueType={valueType} />
```

### 共同的API

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
value  | 值 | `any` | - |
valueType  | 值类型 | `ValueType` | - |
valueEnum  | 包含 `value` `name` 的数据字典。<br/>当 `valueType` 为 `enum` `enumTag` `enumBadge` 时生效。 | `EnumData` | - |

### ValueType 值

<code src="./demos/valueType.tsx" />

值为 `string` 时，支持以下类型：

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
time  | 时间 `HH:mm:ss` | 10:05:20 |
timeRange  | 时间区间 `HH:mm:ss ~ HH:mm:ss` | 10:05:20 ~ 20:00:00 |
fromNow  | 相对当前时间，使用 `moment` [`fromNow`](http://momentjs.cn/docs/#/displaying/fromnow/) 方法 | - |

<br/>

```javascript
<BizField value={40} valueType='percent' showSymbol showColor />
```

值为 `object` 时，必须包含 `type`，且 `type` 为上述 `string` ，剩下的值将作为 `props` 传入组件。

如下两种写法皆可：

```javascript
<BizField value={40} valueType={{type: 'percent', showSymbol: true, showColor: true}}  />

<BizField value={40} valueType={{type: 'percent'}} showSymbol showColor  />
```

值为 `function` 时，必须返回上述 `object` 值。

```javascript
<BizField value={40} valueType={()=>({type: 'percent', showSymbol: true, showColor: true})}  />
```

### valueEnum 值

```typescript
interface EnumItem {
  name: string;
  value: any;
  // 配置badge
  badge?: {
    status?: string;
    color?: string;
  };
  // 配置tag
  tag?: {
    color?: string;
  };
  // 配置文本
  text?: {
    style?: {
      color?: string;
    }
  };
}
type EnumData = EnumItem[];
```

### 个别 ValueType 的 API

#### text 和 money

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
prefix  | 前缀 | `React.ReactNode` | - |
suffix  | 后缀 | `React.ReactNode` | - |
color  | 颜色 | `string` | - |
size  | 文字大小 | `number` | - |

#### percent

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
precision  | 精度 | `number` | `2` |
showColor  | 显示颜色 | `boolean` | `false` |
showSymbol  | 显示符号 | `boolean` | `false` |
suffix  | 百分号后缀 | `string` | `%` |

#### 日期类

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
format  | 设置日期或时间格式 | `string` | - |

#### image

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
value  | 如果为 `string`，表示为 `src`。<br/>如果为 `object` 需传入 `src`，也支持传入 `name`。 | `string` \| `{ src: string; name?: string; }` | - |
bordered  | 显示边框。高和宽将保持一致，以正方形方式呈现，图片根据最长的宽或高自适应。 | `boolean` | `false` |

其余同 [`Image`](https://ant-design.gitee.io/components/image-cn/#API) 。

#### progress

同 [`Progress`](https://ant-design.gitee.io/components/progress-cn/#API) 。

#### enum、enumTag、enumBadge

枚举数据改为 `valueEnum` 传入，其余同 [`Dictionary`](https://doly-dev.github.io/antd-more/site/v1/index.html#/common/dictionary?anchor=dictionary-1) 。

#### color

同 [`Color`](https://doly-dev.github.io/antd-more/site/v1/index.html#/common/color?anchor=api) 。

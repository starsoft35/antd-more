---
title: Dictionary
group:
  title: 通用组件
  path: /common
  order: 2
legacy: /common/dictionary
---

# Dictionary

> 推荐使用 `BizField` 和 `BizForm.ItemSelect` `BizForm.Radio` 。

`数据字典` 显示 和 选择

数据必须含有 `value` `name` 。

## 代码演示

### 字典值

<code src="./demos/Demo1.tsx" />

### 多种展示方式

<code src="./demos/Demo1.1.tsx" />

### 多个枚举

<code src="./demos/Demo1.2.tsx" />

### 选择字典值

<code src="./demos/Demo2.tsx" />

### Form 中使用 Select

<code src="./demos/Demo3.tsx" />

### 不显示全部

<code src="./demos/Demo4.tsx" />

### 自定义排除项和全部

<code src="./demos/Demo5.tsx" />

### 单选框

<code src="./demos/Demo6.tsx" />

### Form 中使用 Radio

<code src="./demos/Demo7.tsx" />

## API

```typescript
interface EnumItem {
  name: string;
  value: any;
  badge?: {
    status?: string;
    color?: string;
  };
  tag?: {
    color?: string;
  };
  text?: {
    style?: {
      color?: string;
    }
  };
}

type EnumData = EnumItem[];
```

### Dictionary

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData` | `[]` |
value  | 当前字典值 | `any` | `""` |
defaultName  | 当找不到字典值对应的名称时，显示默认名称 | `string` | `-` |
type  | 显示方式 | `text` \| `tag` \| `badge` | `text` |

### Dictionary.List

除了以下参数，其余和 `Dictionary` 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
align  | 对齐方式 | `start` \| `end` \| `center` \| `baseline` | `start` |
direction  | 间距方向 `vertical` `horizontal` | `string` | `horizontal` |
size  | 间距大小，支持 `small` `middle` `large` 或 数值 | `string` \| `number` | `small` |
value  | 字典值数组 | `any[]` | `[]` |

### Dictionary.Select

除了以下参数，其余和 [`antd Select`](https://ant.design/components/select-cn/) 组件一样。如需支持多选，可设置 `mode`。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData` | `[]` |
value  | 当前字典值 | `any` | - |
all  | 是否显示全部  | `boolean` | `true` |
allValue | 全部的值 | `string` | `""` |
allName | 全部的名称 | `string` | `全部` |
excludeValues | 排除的值 | `any[]` | `[]` |

### Dictionary.Radio

除了以下参数，其余和 [`antd RadioGroup`](https://ant.design/components/radio-cn/#RadioGroup) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData` | `[]` |
value  | 当前字典值 | `any` | - |
type  | `button` 表现为 `Radio.Button`，其他表示为 `Radio`  | `default` \| `button` | `defalut` |

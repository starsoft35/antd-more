---
title: Dictionary
group:
  title: 通用组件
  path: /common
  order: 0
legacy: /common/dictionary
---

# Dictionary

用于 `数据字典` 的显示 和 选择

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

```javascript
interface EnumData {
  name: string;
  value: any;
  badge?: {
    status?: string;
    color?: string;
    [key: string]: any;
  };
  tag?: {
    color?: string;
    [key: string]: any;
  };
  text?: {
    color?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
```

### Dictionary

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData[]` | `[]` |
value  | 当前字典值 | `any` | `""` |
defaultName  | 当找不到字典值对应的名称时，显示默认名称 | `string` | `-` |
type  | 显示方式，支持 `text` `tag` `badge` | `string` | `text` |

### Dictionary.List

除了以下参数，其余和 `Dictionary` 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
align  | 对齐方式 `start` `end` `center` `baseline` | `string` | `start` |
direction  | 间距方向 `vertical` `horizontal` | `string` | `horizontal` |
size  | 间距大小，支持 `small` `middle` `large` 或 数值 | `string` `number` | `small` |
value  | 字典值数组 | `array` | `[]` |
defaultValue  | 默认值，当 `value` 为非数组或长度小于0时显示 | `string` | `-` |

### Dictionary.Select

除了以下参数，其余和 [`antd Select`](https://ant.design/components/select-cn/) 组件一样。如需支持多选，可设置 `mode`。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData[]` | `[]` |
value  | 当前字典值 | `any` | - |
all  | 是否显示全部  | `boolean` | `true` |
allValue | 全部的值 | `string` | `""` |
allName | 全部的名称 | `string` | `全部` |
excludeValues | 排除的值 | `array` | `[]` |

### Dictionary.Radio

除了以下参数，其余和 [`antd RadioGroup`](https://ant.design/components/radio-cn/#RadioGroup) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
data  | 包含 `value` `name` 的 `数据字典` | `EnumData[]` | `[]` |
value  | 当前字典值 | `any` | - |
type  | `button` 表现为 `Radio.Button`，其他表示为 `Radio`  | `string` | `defalut` |

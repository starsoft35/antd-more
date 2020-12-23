---
title: BizDescriptions
group:
  title: 业务组件
  path: /business
  order: 0
legacy: /business/biz-descriptions
---

# BizDescriptions

基于 Descriptions 扩展了 字段（BizField）、columns 列展示。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 数据配置

使用数据配置 dataSource 和 columns 。

<code src="./demos/Demo2.tsx" />

### 混用

支持数据配置和组件方式混合使用。

<code src="./demos/Demo3.tsx" />


## API

```typescript
import { BizDescriptions } from 'antd-more';
```

### BizDescriptions

除了以下参数，其余和 [antd Descriptions](https://ant-design.gitee.io/components/descriptions-cn/#Descriptions) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
dataSource  | 数据 | `object` | - |
columns  | 列的配置描述 | `ColumnItem[]` | - |
tooltip  | 标题后面的补充提示，需有标题才生效 | `string` | - |

### BizDescriptions.Item

除了以下参数，其余和 [antd DescriptionsItem](https://ant-design.gitee.io/components/descriptions-cn/#DescriptionItem) 组件一样。

`ValueType` `EnumData` 请参考 `BizField` 组件 API 说明。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
valueType  | 值类型 | `ValueType` | - |
valueEnum  | 包含 `value` `name` 的数据字典。<br/>当 `valueType` 为 `enum` `enumTag` `enumBadge` 时生效。 | `EnumData` | - |
tooltip  | 标签后面的补充提示，需有标签才生效 | `string` | - |

### 类型

```typescript
interface ItemProps extends DescriptionsItemProps {
  valueType?: ValueType;
  valueEnum?: EnumData;
  tooltip?: string;
  key?: React.ReactText;
}

type DataIndex = string | number;

interface ColumnItem extends Omit<ItemProps, 'children'> {
  dataIndex?: DataIndex | DataIndex[];
  title?: React.ReactNode;
  render?: (value: any, dataSource: Record<DataIndex, any>, index: number) => React.ReactNode;
}

interface BizDescriptionsProps extends DescriptionsProps {
  dataSource?: Record<DataIndex, any>;
  columns?: ColumnItem[];
  tooltip?: string;
}
```


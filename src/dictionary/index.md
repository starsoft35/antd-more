---
group:
  title: 通用
  order: 4
toc: content
---

# Dictionary - 数据字典

> 推荐使用 [BizField](/components/biz-field) 。

数据字典显示

## 代码演示

### 基础用法

自动将 `value` 对应的 `label` 显示。

<code src="./demos/Demo1.tsx"></code>

### 不同展示方式

通过 `type` 设置展示方式，支持 `text` `tag` `badge` ，默认为 `text` 。

在数据字典中配置 `props`，默认读取 `type` 对应的配置项，也可以传入 `optionName` 自定义读取配置名。还有个特别的属性 `alias` 可以替换 `label`。

_注意：如果展示 `badge`，一定要有 `status` 或 `color`，不然可能显示不了。_

<code src="./demos/Demo2.tsx"></code>

### 多个枚举

`value` 是一个数组，`defaultLabel` 仅在 `value` 为非数组或长度小于 `0` 时显示。

<code src="./demos/Demo3.tsx"></code>

### fieldNames

自定义字段名。

<code src="./demos/fieldNames.tsx"></code>

## API

```typescript
import { Dictionary } from 'antd-more';
```

<br />

除了以下参数，其余同 [Space](https://ant-design.gitee.io/components/space-cn#api) 一样。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueEnum | 数据字典 | `EnumData` | `[]` |
| value | 当前字典值 | `ValueType` | - |
| defaultLabel | 当找不到字典值对应的名称时，显示默认名称 | `ReactNode` | - |
| type | 显示方式 | `'text' \| 'tag' \| 'badge'` | `'text'` |
| propsName | 数据中的配置属性名，默认为 `type` 值。 | `string` | - |
| fieldNames | 自定义节点 `label`、`value` 的字段 | `{label: string; value: string;}` | - |
| match | 自定义 value 匹配方法 | `(itemValue: ValueType, value: ValueType) => boolean;` | - |

### EnumData

```typescript
import type { TagProps, BadgeProps, SpaceProps } from 'antd';

type AliasType = { alias?: ReactNode };

type EnumItem<ValueType = any> = {
  label?: ReactNode;
  value?: ValueType;
  badge?: Omit<BadgeProps, 'status'> & AliasType & { status?: string };
  tag?: TagProps & AliasType;
  text?: HtmlHTMLAttributes<HTMLSpanElement> & AliasType;
  [key: string]: any;
};

export type EnumData<ValueType = any> = EnumItem<ValueType>[];
```

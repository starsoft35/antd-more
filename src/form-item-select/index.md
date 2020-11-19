---
title: FormItemSelect
group:
  title: 表单项
  path: /form-item
  order: 1
legacy: /form-item/select
---

# FormItemSelect

选择器，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 支持配置 `全部` 选项、排除项

**校验顺序**

- 必填时为空，提示：`请选择${label}`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 常用示例

<code src="./demos/Demo2.tsx" />

## API

```typescript
interface OptionData {
    value: string | number;
    name: string;
    key?: string | number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [x: string]: any;
}
interface OptionGroupData {
    key?: Key;
    label?: React.ReactNode;
    options: OptionData[];
    className?: string;
    style?: React.CSSProperties;
    [prop: string]: any;
}

type Options = (OptionData | OptionGroupData)[];
```

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
options  | 包含 `value` `name` 的数组 | `Options` | `[]` |
all  | 是否显示全部  | `boolean` | `false` |
allValue | 全部的值 | `string` | `""` |
allName | 全部的名称 | `string` | `全部` |
excludeValues | 排除的值 | `any[]` | `[]` |
selectProps  | 选择器配置参数 | [`SelectProps`](https://ant-design.gitee.io/components/select-cn/#Select-props) | - |
---
title: FormItemAddress
group:
  title: 业务表单项
  path: /business-form-item
  order: 1
legacy: /business-form-item/form-item-address
---

# FormItemAddress

地址选择和输入框，必须包裹在 [Form](https://ant-design.gitee.io/components/form-cn/) 组件内。

**特点**

- 过滤空格
- 分开校验

**校验顺序**

- 必填时为空，提示：`请选择${labels[0]}` `请输入${labels[1]}`

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx" />

### 常用示例

<code src="./demos/Demo2.tsx" />

## API

```typescript
type NamePath = string | number | (string | number)[];

interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

除了以下参数，其余和 [`antd Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
options | 必填项，可选项数据源。  | `Option[]` | - |
names  | 字段名 | `[NamePath, NamePath]` | `['location', 'address']` |
labels  | 标签文本 | `[string, string]` | `['省/市/区', '详细地址']` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |
cascaderProps  | 级联选择框配置参数 | [`CascaderProps`](https://ant-design.gitee.io/components/cascader-cn/#API) | - |
formItemProps  | 内部 [`Form.Item`](https://ant-design.gitee.io/components/form-cn/#Form.Item) 的配置参数 | `[FormItemProps, FormItemProps]` | - |

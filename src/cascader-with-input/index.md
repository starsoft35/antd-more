---
title: CascaderWithInput
group:
  title: 通用组件
  path: /common
  order: 0
legacy: /common/cascader-with-input
---

# CascaderWithInput

[`Cascader`](https://ant.design/components/cascader-cn/#API) 和 [`Input`](https://ant.design/components/input-cn/#API) 组件结合，常用于省市区+详细地址。

## 代码演示

### 基本用法

<code src="./demos/Demo1.tsx" />

### 省/市/区+详细地址

<code src="./demos/Demo2.tsx" />

## API

```typescript
type CascaderValue = string[] | number[];
type Value = [CascaderValue, string | undefined];

interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}

<CascaderWithInput value={value} options={options} />
```

<br />

| 参数          | 说明   | 类型    | 默认值    |
| ------------- | ------------- | ------------- | --------- |
| value         | 指定选中项和输入框的值 | `Value` | `[[],""]` |
| options       | 可选项数据源  | `Option[]` | - |
| onChange      | 值改变后的回调  | `(value: Value) => void` | - |
| cascaderProps | [`Cascader`](https://ant.design/components/cascader-cn/#API)组件配置项 | `object` | - |
| inputProps    | [`Input`](https://ant.design/components/input-cn/#API)组件配置项  | `object` | - |
| form          | 经 `Form.useForm()` 创建的 `form` 控制实例。仅当 `validateTrigger` 为 `onBlur` 时，必须传入才生效。 | [`FormInstance`](https://ant.design/components/form-cn/#FormInstance) | - |

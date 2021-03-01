---
title: Modal/Drawer - 浮层表单
group:
  title: 数据录入
  path: /form
legacy: /form/modal-form
---

# ModalForm/DrawerForm - 浮层表单

基于 BizForm 扩展的浮层表单。

## 代码演示

### ModalForm 表单

<code src="../demos/modal-form-1.tsx" />

### DrawerForm 表单

<code src="../demos/drawer-form-1.tsx" />

## API

```typescript
import { BizForm } from 'antd-more';
```

### ModalForm 

```typescript
const { ModalForm } = BizForm;
```

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Modal` 标题 | `React.ReactNode` | - |
width  | `Modal` 宽度 | `number` | `600` |
trigger  | 用于触发 `Modal` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开，非受控 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
modalProps  | `Modal` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [ModalProps](https://ant.design/components/modal-cn/#API) | - |
onFinish  | 提交数据时触发，如果返回不是 `false`，会关掉弹框并且重置表单 | `async (values)=>any` | - |

### DrawerForm 

```typescript
const { DrawerForm } = BizForm;
```

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Drawer` 标题 | `React.ReactNode` | - |
width  | `Drawer` 宽度 | `number` | `600` |
trigger  | 用于触发 `Drawer` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开，非受控 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
drawerProps  | `Drawer` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [DrawerProps](https://ant.design/components/drawer-cn/#API) | - |
onFinish  | 提交数据时触发，如果返回不是 `false`，会关掉弹框并且重置表单 | `async (values)=>any` | - |

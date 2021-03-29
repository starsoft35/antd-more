---
title: Modal/Drawer - 浮层表单
order: 2
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ModalForm/DrawerForm - 浮层表单

基于 BizForm 扩展的浮层表单。

## 代码演示

### ModalForm 表单

<code src="../demos/modal-form-1.tsx" />

### DrawerForm 表单

<code src="../demos/drawer-form-1.tsx" />

### 使用 visible 受控方式

<code src="../demos/modal-form-2.tsx" />

### 自定义底部按钮

<code src="../demos/modal-form-3.tsx" />

### 修改密码

<code src="../demos/modal-form-4.tsx" />

### 修改和新增共用表单

<code src="../demos/modal-form-5.tsx" />

## API

```typescript
import { BizForm } from 'antd-more';
```

### ModalForm 

```typescript
const { ModalForm } = BizForm;
```

除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Modal` 标题 | `React.ReactNode` | - |
width  | `Modal` 宽度 | `number` | `600` |
trigger  | 用于触发 `Modal` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开。<br/>设置后表示为 `受控组件`，可结合 `onVisibleChange` 进行控制。 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
modalProps  | `Modal` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [ModalProps](https://ant.design/components/modal-cn/#API) | - |
onFinish  | 提交数据时触发。如果返回 `false` 或 `Promise.reject()` 表示提交失败。否则会关掉弹框并且重置表单 | `async (values)=>any` | - |

### DrawerForm 

```typescript
const { DrawerForm } = BizForm;
```

除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Drawer` 标题 | `React.ReactNode` | - |
width  | `Drawer` 宽度 | `number` | `600` |
trigger  | 用于触发 `Drawer` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开。<br/>设置后表示为 `受控组件`，可结合 `onVisibleChange` 进行控制。 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
drawerProps  | `Drawer` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [DrawerProps](https://ant.design/components/drawer-cn/#API) | - |
onFinish  | 提交数据时触发。如果返回 `false` 或 `Promise.reject()` 表示提交失败。否则会关掉弹框并且重置表单 | `async (values)=>any` | - |

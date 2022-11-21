---
title: InputIcon - 图标输入
order: 3
group:
  path: /
nav:
  title: 组件
  path: /components
---

# InputIcon - 图标输入

图标输入，常用于菜单图标设置。图标由外部自定义传入，方便回显和按需配置，防止包过大。

## 代码演示

### 基础用法

<code src="./demos/Demo1.tsx"></code>

### BizForm 中使用

<code src="./demos/bizform-1.tsx"></code>

### 自定义图标

<code src="./demos/define-icon.tsx"></code>

### 菜单配置

<code src="./demos/modal-menu.tsx"></code>

## API

除了以下参数，其余和 antd [Input](https://ant.design/components/input-cn/) 组件一样。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| iconData | 图标名称和组件的 Map 键值对。<br/>推荐使用内置图标：<br/>`import icons from 'antd-more/es/input-icon/icons';` | `Map<string, React.FC>` | `new Map([])` |
| showSearch | 显示图标搜索框 | `boolean` | `true` |
| column | 一行显示图标数量。<br/>如果不能被 24 整除，自动向下取整。 | `number` | `3` |
| value | 图标名称 | `string` | - |
| onChange | 图标修改时触发 | `(iconName: string) => void` | - |

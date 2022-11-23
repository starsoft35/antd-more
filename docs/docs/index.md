---
order: 1
---

# 介绍

[![npm][npm]][npm-url] ![GitHub](https://img.shields.io/github/license/doly-dev/antd-more.svg)

## 使用

### npm 或 yarn 安装

```shell
npm install antd-more
```

<br />

```shell
yarn add antd-more
```

### 示例

```javascript
import { BizField } from 'antd-more';

// 值类型为颜色，显示红色色块
ReactDon.render(<BizField value="red" valueType="color" />, mountNode);
```

## 对应版本

| antd-more                   | antd   |
| --------------------------- | ------ |
| `v0.x` `v1.x` `v2.x` `v3.x` | `v4.x` |

## 组件列表

### 数据展示

- [BizDescriptions] - 业务描述
- [BizField] - 业务字段
- [BizTable] - 业务表格
- [EditableBizTable] - 可编辑业务表格

### 数据录入

- [BizForm] - 业务表单
- [BizFormItem] - 表单项
- [BizFormList] - 表单数组
- [Modal/Drawer] - 浮层表单
- [QueryForm] - 查询表单
- [StepsForm] - 分步表单

### 页面布局

- [BizUserLayout] - 用户界面布局

### 通用

- [CaptchaButton] - 验证码按钮
- [Color] - 颜色
- [Dictionary] - 数据字典
- [InputIcon] - 图标输入
- [TreeTable] - 树表格

## 精选第三方 react 组件

- [qrcode.react] - 生成二维码
- [wangeditor] - 轻量级 web 富文本编辑器

[npm]: https://img.shields.io/npm/v/antd-more.svg
[npm-url]: https://npmjs.com/package/antd-more
[site]: https://doly-dev.github.io/antd-more/latest/index.html
[captchabutton]: /components/captcha-button
[color]: /components/color
[dictionary]: /components/dictionary
[bizdescriptions]: /components/biz-descriptions
[bizfield]: /components/biz-field
[biztable]: /components/biz-table
[editablebiztable]: /components/editable-biz-table
[bizform]: /components/biz-form
[bizformitem]: /components/biz-form-item
[bizformlist]: /components/biz-form-list
[modal/drawer]: /components/modal-form
[queryform]: /components/query-form
[stepsform]: /components/steps-form
[bizuserlayout]: /components/biz-user-layout
[inputicon]: /components/input-icon
[treetable]: /components/tree-table
[qrcode.react]: https://www.npmjs.com/package/qrcode.react
[wangeditor]: https://www.npmjs.com/package/wangeditor

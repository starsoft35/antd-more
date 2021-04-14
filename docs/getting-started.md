---
title: 快速上手
order: 0
group:
  path: /
nav:
  title: 文档
  path: /docs
---

# 快速上手

[![npm][npm]][npm-url]

## 使用

### npm 或 yarn 安装

```shell
npm install antd-more --save
```

<br />

```shell
yarn add antd-more
```

### 按需加载

- 使用 [doly] 或 [umi] 脚手架，在配置文件中的 `extraBabelPlugins` 添加：

```javascript
[
  'import', 
  { 
    libraryName: 'antd-more', 
    libraryDirectory:  'es', 
    style: true, 
  }, 
  'antd-more'
]
```

- 自定义配置的 `webpack` 项目，请安装 [babel-plugin-import] ，将上面配置添加到 `babel` 的 `plugins` 中。

### 示例

```javascript
import { BizField } from 'antd-more';

ReactDon.render(<BizField value="red" valueType="color" />, mountNode);
```

## 对应版本

 antd-more | antd |
 --------- | ---- |
 v0.x      | v4.x |
 v1.x      | v4.x |
 v2.x      | v4.x |

## API

- **数据展示**
  - [BizField] - 业务字段
  - [BizDescriptions] - 业务描述
  - [BizTable] - 业务表格
  - [EditableBizTable] - 可编辑业务表格
- **数据录入**
  - [BizForm] - 业务表单
  - [Item] - 表单项
  - [Modal/Drawer] - 浮层表单
  - [QueryForm] - 查询表单
  - [StepsForm] - 分步表单

## 精选第三方 react 组件

- [qrcode.react] - 生成二维码
- [wangeditor] - 轻量级 web 富文本编辑器



[npm]: https://img.shields.io/npm/v/antd-more.svg
[npm-url]: https://npmjs.com/package/antd-more

[site]: https://doly-dev.github.io/antd-more/site/latest/index.html
[babel-plugin-import]: https://www.npmjs.com/package/babel-plugin-import

[doly]: https://www.npmjs.com/package/doly-cli
[umi]: https://umijs.org/zh-CN
[antd]: https://ant-design.gitee.io

[CaptchaButton]: /components/captcha-button
[Color]: /components/color
[Dictionary]: /components/dictionary

[BizDescriptions]: /components/biz-descriptions
[BizField]: /components/biz-field
[BizTable]: /components/biz-table
[EditableBizTable]: /components/editable-biz-table

[BizForm]: /components/biz-form
[Item]: /components/item
[Modal/Drawer]: /components/modal-form
[QueryForm]: /components/query-form
[StepsForm]: /components/steps-form

[qrcode.react]: https://www.npmjs.com/package/qrcode.react
[wangeditor]: https://www.npmjs.com/package/wangeditor
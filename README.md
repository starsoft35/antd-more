# antd-more

[![npm][npm]][npm-url]

基于 [antd] 扩展的业务场景组件。

[查看文档和示例][site]

## 特性

- 🌈 支持 [antd] 主题定制
- 📦 面向业务场景封装


## 对应版本

 antd-more | antd |
 --------- | ---- |
 v0.x      | v4.x |
 v1.x      | v4.x |
 v2.x      | v4.x |

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

ReactDon.render(<BizField value="red" valueType="color" />, mountNode);
```

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

## 贡献

### commit格式

- **格式**

```bash
type(scope?): subject
```

- **示例**

```bash
chore: run tests on travis ci
fix(server): send cors headers
feat(blog): add comment section
```

- **type**

 值 | 说明 
 ----- | -----
build | 影响构建系统或外部依赖项的更新（示例范围：gulp, broccoli, npm）
ci | 对CI配置文件和脚本的更改(例如scopes: Travis, Circle, BrowserStack, SauceLabs)
chore | 其他不修改src或测试文件的更改
docs | 只改变文档
feat | 新功能
fix | bug 修复
perf | 改进性能的代码更改
refactor | 既不修复bug也不添加新功能的代码更改
revert | 还原以前的提交
style | 不影响代码含义的更改(white-space、格式、缺少分号等)
test | 添加缺失的测试或纠正现有的测试

- **使用 `cz` 生成**

> 格式参考 [What is commitlint]

原来使用 `git commit -m "xx"` 改为以下命令（交互方式填写提交信息）：

```bash
yarn commit
```

或

```bash
npm run commit
```



[npm]: https://img.shields.io/npm/v/antd-more.svg
[npm-url]: https://npmjs.com/package/antd-more

[site]: https://doly-dev.github.io/antd-more/latest/index.html
[babel-plugin-import]: https://www.npmjs.com/package/babel-plugin-import

[doly]: https://www.npmjs.com/package/doly-cli
[umi]: https://umijs.org/zh-CN
[antd]: https://ant-design.gitee.io

[CaptchaButton]: https://doly-dev.github.io/antd-more/latest/index.html#/components/captcha-button
[Color]: https://doly-dev.github.io/antd-more/latest/index.html#/components/color
[Dictionary]: https://doly-dev.github.io/antd-more/latest/index.html#/components/dictionary

[BizDescriptions]: https://doly-dev.github.io/antd-more/latest/index.html#/components/biz-descriptions
[BizField]: https://doly-dev.github.io/antd-more/latest/index.html#/components/biz-field
[BizTable]: https://doly-dev.github.io/antd-more/latest/index.html#/components/biz-table
[EditableBizTable]: https://doly-dev.github.io/antd-more/latest/index.html#/components/editable-biz-table

[BizForm]: https://doly-dev.github.io/antd-more/latest/index.html#/components/biz-form
[Item]: https://doly-dev.github.io/antd-more/latest/index.html#/components/item
[Modal/Drawer]: https://doly-dev.github.io/antd-more/latest/index.html#/components/modal-form
[QueryForm]: https://doly-dev.github.io/antd-more/latest/index.html#/components/query-form
[StepsForm]: https://doly-dev.github.io/antd-more/latest/index.html#/components/steps-form

[What is commitlint]: https://github.com/conventional-changelog/commitlint#what-is-commitlint

[qrcode.react]: https://www.npmjs.com/package/qrcode.react
[wangeditor]: https://www.npmjs.com/package/wangeditor
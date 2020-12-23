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

## API

- **业务组件**
  - [BizDescriptions] - 描述
  - [BizField] - 字段
  - [BizForm] - 表单
  - [BizTable] - 表格
- **通用组件**
  - [CaptchaButton] - 验证码按钮
  - [Color] - 颜色显示、选择器
  - [Dictionary] - 数据字典

## 贡献

### commit 规范

**格式: 冒号后面有空格**

```shell
<type>: <subject>
```

- **upd** - 更新某功能（不是 feat, 不是 fix）
- **feat** - 新功能（feature）
- **fix** - 修补bug
- **docs** - 文档（documentation）
- **style** -  格式（不影响代码运行的变动）
- **refactor** - 重构（即不是新增功能，也不是修改bug的代码变动）
- **test** - 增加测试
- **chore** - 构建过程或辅助工具的变动

**示例**

```shell
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
git commit -m 'upd: 更新某组件文本'
```



[npm]: https://img.shields.io/npm/v/antd-more.svg
[npm-url]: https://npmjs.com/package/antd-more

[site]: https://doly-dev.github.io/antd-more/site/v1/index.html
[babel-plugin-import]: https://www.npmjs.com/package/babel-plugin-import

[doly]: https://www.npmjs.com/package/doly-cli
[umi]: https://umijs.org/zh-CN
[antd]: https://ant-design.gitee.io

[CaptchaButton]: https://doly-dev.github.io/antd-more/site/v1/index.html#/common/captcha-button
[Color]: https://doly-dev.github.io/antd-more/site/v1/index.html#/common/color
[Dictionary]: https://doly-dev.github.io/antd-more/site/v1/index.html#/common/dictionary

[BizDescriptions]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-descriptions
[BizField]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-field
[BizForm]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-form
[BizTable]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-table
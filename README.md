# antd-more

[![npm][npm]][npm-url]

基于 [antd] 扩展的业务场景组件。

[查看文档和示例][site]

<!-- 
## 对应版本

antd-more | antd |
--------- | ---- |
v1        | v4   | -->

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

如果使用 [doly] 或 [umi] 脚手架，在配置文件中的 `extraBabelPlugins` 添加：

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

如果是自定义配置的 `webpack` 项目，请安装 [babel-plugin-import] ，将上面配置添加到 `babel` 的 `plugins` 中。

### 示例

```javascript
import { Color } from 'antd-more';

ReactDon.render(<Color value="red" />, mountNode);
```

## 已有组件

- [CaptchaButton] - 验证码按钮，含倒计时功能
- [CascaderWithInput] - 级联和输入框结合，常用于填写地址
- [Color] - 颜色显示、选择器

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

示例

```shell
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
git commit -m 'upd: 更新某组件文本'
```



[npm]: https://img.shields.io/npm/v/antd-more.svg
[npm-url]: https://npmjs.com/package/antd-more

[site]: https://doly-dev.github.io/antd-more/site/index.html
[babel-plugin-import]: https://www.npmjs.com/package/babel-plugin-import

[doly]: https://www.npmjs.com/package/doly-cli
[umi]: https://umijs.org/zh-CN
[antd]: https://ant-design.gitee.io

[CaptchaButton]: https://doly-dev.github.io/antd-more/site/index.html#/common/captcha-button
[CascaderWithInput]: https://doly-dev.github.io/antd-more/site/index.html#/common/cascader-with-input
[Color]: https://doly-dev.github.io/antd-more/site/index.html#/common/color
---
title: 常见问题
order: 1
group:
  path: /
nav:
  title: 文档
  path: /docs
---

# 常见问题

整理一些经常遇到的问题

## antd-more 和 ProComponents 有什么区别？

antd-more 是脱胎于所在公司内部业务场景，目前主要应用于国内业务，部分设计参考了 ProComponents ，使用起来更加简单。

- form - 提供了大量基础组件，扩展了转换方法，还集成常见的业务规则，这对于业务统一规范很有帮助。
- fied - antd-more 中只负责是字段展示，而在 ProComponents 中则是字段的展示和表单。
- table - 集成 form 和 field 提供了丰富的扩展 API

## 2.2.x 升 2.3.x 说明

无需再用 `babel-plugin-import` 引入，安装后即可使用，支持 Tree-shaking 。

## 调整 splitChunks 策略，减少整体尺寸

> 参考 [调整 splitChunks 策略，减少整体尺寸](https://umijs.org/zh-CN/guide/boost-compile-speed#%E8%B0%83%E6%95%B4-splitchunks-%E7%AD%96%E7%95%A5%EF%BC%8C%E5%87%8F%E5%B0%91%E6%95%B4%E4%BD%93%E5%B0%BA%E5%AF%B8)

```typescript
chunks: ['vendors', 'umi'],
chainWebpack: function (config) {
  config.merge({
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 3,
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
        },
      },
    }
  });
}
```

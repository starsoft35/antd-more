---
title: 从 v1 到 v2
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
---

# 从 v1 到 v2

## v2 有哪些变化

### 移除废弃的 API

- 移除 BizForm 的 `ItemBankCard` `ItemEmail` `ItemIdCard` `ItemMobile` `ItemUserName`，请使用 `ItemInput` 替代。

### 组件重构

- BizField
  - `valueType` 改为仅支持 `string` 形式的枚举值，如有使用 `object` 或 `function` ，请改为 `string`
- BizDescriptions 和 BizTable 
  - 添加 `field` 配置项，用于透传给 BizField 
  - 如果原来 `valueType` 使用 `object` 或 `function` ，请改为 `string`

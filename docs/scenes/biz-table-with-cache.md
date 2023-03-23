---
group:
  title: 展示组件
  order: 2
toc: content
---

# 缓存列表页 - BizTableWithCache

> 从列表页到详情页，再返回列表页，需要带入之前的查询条件和页面重新查询。

由于 [umi-plugin-keep-alive](https://www.npmjs.com/package/umi-plugin-keep-alive) 在 `umi v4` 版本中兼容不是很好，临时使用该方案解决列表页缓存问题。

**注意在重新登录或进入系统时，清空该缓存：**

```javascript
memoryCache.clear();
```

## 代码演示

### 基础用法

<code src='../../src/demos/BizTableWithCache/basic.tsx'></code>

## API

### BizTableWithCache

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cacheKey | 查询项和页面缓存键值。 | `string` | - |
| cacheTransformNames | 缓存值逆向转换为表单项的字段。<br/>主要用于日期范围逆向转换赋值。 | `Record<string, [string, string]>` | - |

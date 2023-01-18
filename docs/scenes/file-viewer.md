---
group:
  title: 展示组件
  order: 2
toc: content
---

# 文件预览 - FileViewer

目前已支持 `image` `audoi` `video` `pdf` 等文件类型预览，其他文件类型会提供点击下载提示。

## 代码演示

### 基础用法

<code src='../../src/demos/FileViewer/demos/basic.tsx'></code>

### 不同文件格式

<code src='../../src/demos/FileViewer/demos/multiple.tsx'></code>

### 上传各种类型文件预览

<code src='../../src/biz-form/demos/upload-file-viewer.tsx'></code>

## API

### FileViewer

除以下参数，其余同 [antd Modal](https://ant.design/components/modal-cn#api) 。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 文件地址。 | `string` | - |
| fileName | 文件名称，自动设置为 Modal 的标题，可以通过设置 `title` 自定义标题。 | `string` | - |
| fileType | 文件类型，目前仅支持 `image` `audoi` `video` `pdf` 等文件类型的预览。 | `string` | - |

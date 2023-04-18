---
group:
  title: 展示组件
  order: 1
toc: content
---

# 异步图片 - AsyncImage

> 建议使用 [FileViewer](/components/file-viewer) 组件展示

## 代码演示

### 基础用法

<code src='../../src/demos/AsyncImage/basic.tsx'></code>

### 多张且支持下载图片

示例中的图片是静态地址，所以点击会新开窗口打开。如果是 `bolb` 地址会触发下载。

<code src='../../src/demos/AsyncImage/multiple.tsx'></code>

## API

### AsyncImage

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fssid | 静态文件图片的 fssid 。<br/>支持单张/多张配置。 | `string \| string[] \| { fileId: string; fileName: string } \| { fileId: string; fileName: string }[]` | - |
| enabledDownload | 是否开启点击名称下载。<br/>需要有 `name` ，并且 `url` 使用的是 `blob` 才生效。 | `boolean` | - |

### 文件上传、下载工具方法

`utils/fileUtils.ts` 提供了以下方法：

- `fssidToUploadFile` 用于展示文件、表单回显，将 `fssid` 转为 `UploadFile`
- `uploadFileToFssid` 用于表单上传，将 `UploadFile` 转为 `fssid`

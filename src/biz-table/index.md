---
title: BizTable
group:
  title: 业务组件
  path: /business
  order: 0
legacy: /business/biz-table
---

# BizTable

基于 antd Table 扩展了表单（BizForm）、字段（BizField）、分页等功能。

## 代码演示

### 简易列表页

只需定义 `request` `rowKey` `columns` `formItems` 。

<code src='./demos/Demo1.tsx'  background="#f5f5f5" />

### 复杂列表页

自定义查询表单操作，表单默认值，默认展示2个表单项，扩展区域，工具栏区域。

但是自定义查询表单操作，需要自己设置按钮 `loading` 等状态.

<code src='./demos/Demo2.tsx'  background="#f5f5f5" />

### 普通表格

不设置 `formItems` 。

<code src='./demos/Demo3.tsx'  background="#f5f5f5" />

### 异步初始值表格

5秒后获取到初始值再发起请求。

<code src='./demos/async-initial-values.tsx'  background="#f5f5f5" />

## API

### BizTable

除了以下参数，其余和 [`antd Table`](https://ant-design.gitee.io/components/table-cn/#API) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
request  | 获取 `dataSource` 的方法 | `Request` | - |
autoRequest  | 初始化时自动触发 `request` | `boolean` | `true` |
ready  | 为 `false` 时，禁止提交/重置表单，不触发 `request` 。<br/>为 `true` 时，会重新设置表单初始值，如果 `autoRequest=true` 则自动请求。 | `boolean` | `true` |
nowrap  | th、td内容不会换行，表格宽度超过100%自动处理横向滚动条。 | `boolean` | `true` |
formItems  | 表单列 | `React.ReactNode[]` | - |
toolbar  | 工具栏，表格内的上面区域 | `React.ReactNode` | - |
extra  | 扩展内容，表格外的上面、查询表单下面的区域 | `React.ReactNode` | - |
form  | 同 [BizForm.QueryForm] 配置参数 | [QueryFormProps] | - |
formRef  | 获取查询表单的 `form` 实例  | `React.MutableRefObject<FormInstance>` | - |
actionRef  | 常用操作引用，便于自定义触发  | `React.MutableRefObject<ActionType>` | - |

### Request 请求方法

只需按照提供的参数发起请求，并处理成相应的返回值格式即可。

```typescript
type Request = (
  params: {
    pageSize?: number;
    current?: number;
    [key: string]: any;
  },
  filters: Record<string, (string | number)[] | null>,
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
  extra: {
    currentDataSource,
    action: "paginate" | "sort" | "filter" | "reload" | "reset" | "submit";
  }
) => Promise<{ data: object[]; total?: number; [x: string]: any }>;
```

**参数**

第一个参数是查询表单值和分页，第二个是筛选，第三个是排序，第四个扩展数据。

**返回值**

`data` 用于设置 Table 的 dataSource ，`total` 用于设置分页。

**action 触发请求说明**

如果使用 `formRef.current.submit()` 触发表单提交，会导致第四个参数的 `action` 不准确，`formRef` 一般在处理赋值时使用。常用操作推荐使用 `actionRef` 。

值 | 说明 |
---- | ---- |
paginate | 点击分页 |
sort | 点击排序 |
filter | 点击筛选 |
reload | 调用 `actionRef.current.reload` |
reset | 点击重置 或 调用 `actionRef.current.reset` |
submit | 点击查询 或 调用 `actionRef.current.submit` |

### Columns 列定义

在原来的基础上扩展了几个配置 `tooltip` `valueType` `valueEnum` 。 `valueType` `valueEnum` 具体可以参考 [BizField] 。

如果设置 `valueType`，且没有 `render`，将使用 [BizField] 渲染。

### actionRef

用 `actionRef` 可手动触发 `reload` `reset` 等操作。

```typescript
type ActionType = {
  reload: () => void;
  reset: () => void;
  submit: () => void;
};

const ref = useRef<ActionType>();

<BizTable actionRef={ref} />;

// 刷新，使用原来的查询表单值、筛选、排序、分页参数重新发起请求
ref.current.reload();

// 重置查询表单并触发请求，分页会重置到第一页，筛选、排序不变
ref.current.reset();

// 触发查询表单提交，分页会重置到第一页，筛选、排序不变
ref.current.submit();
```

[BizField]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-field?anchor=api
[QueryFormProps]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-form?anchor=%E6%9F%A5%E8%AF%A2%E8%A1%A8%E5%8D%95#queryform
[BizForm.QueryForm]: https://doly-dev.github.io/antd-more/site/v1/index.html#/business/biz-form?anchor=%E6%9F%A5%E8%AF%A2%E8%A1%A8%E5%8D%95#queryform
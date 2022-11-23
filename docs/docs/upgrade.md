---
order: 2
---

# 从 v2 到 v3

## v3 有哪些变化

### Color

- 单独导出颜色展示和各个颜色选择器组件

### Dictionary

- 移除 `List` `Radio` `Seelct`
- 枚举数据属性 `data` 改为 `valueEnum`，去掉枚举数据中的 `name`
- 去掉属性 `defaultName`
- 新增属性 `match` 支持自定义值匹配方法

### BizForm

- 单独导出各个 `Item` 组件，不再挂载到 `BizForm` 上（原使用 `BizForm.ItemXXX` 改为 `BizFormItemXXX`）
- 移除 `BizFormItem` 属性 `before` `after`，请使用 `contentBefore` `contentAfter`
- 移除 `BizFormItemCaptcha` 属性 `check`
- 移除 `BizFormItemUpload` 属性 `max`
- 移除 `BizFormItemSelect` `BizFormItemRadio` `BizFormCheckbox` 属性 `allName`，请使用 `allLabel`

### BizTable

- 移除类型 `ActionType` `Request` `BizColumnType`，请使用 `BizTableActionType` `BizTableRequest` `BizTableColumnType`
- 移除类型 `EditableActionType` `EditableOptions` ，请使用 `EditableBizTableActionType` `EditableBizTableEditable`

---
title: BizForm
group:
  title: 业务组件
  path: /business
  order: 0
legacy: /business/biz-form
---

# BizForm

基于 antd Form 扩展了布局、校验、转换值等功能，帮助业务快速开发。

## 代码演示

### 创建用户

<code src='./demos/base-register.tsx' />

### 登录

<code src='./demos/base-login.tsx' />

### 忘记密码

<code src='./demos/forget-password.tsx' />

### 修改密码

<code src='./demos/change-password.tsx' />

### 实时上传文件图片

添加文件后，立即上传到文件服务器，获取 `fssId`，提交时取出该 `fssId` 。

<code src='./demos/upload-real-time.tsx' />

### 实时上传文件含默认值

修改页面中需要显示已有文件，并且支持实时上传

<code src='./demos/upload-with-default.tsx' />

### 提交时一次性上传所有文件

添加文件后不触发上传，在提交时获取所有文件一次性上传。

<code src='./demos/upload-no-upload.tsx' />

### 企业信息

<code src='./demos/company-info.tsx' />

### 结算信息

<code src='./demos/settlement-info.tsx' />

### 返佣信息

<code src='./demos/rakebacke-info.tsx' />

### 脱敏校验

<code src='./demos/security.tsx' />

### 异步初始值

<code src='./demos/async-initial-values.tsx' />

### 所有表单项

<code src='./demos/Demo1.tsx' />

### 查询表单

<code src='./demos/query-form-1.tsx' />

### 查询表单-展开收起

<code src='./demos/query-form-2.tsx' />

### 查询表单-垂直布局

<code src='./demos/query-form-3.tsx' />

### 分步表单

<code src="./demos/steps-form-1.tsx" />

### 分步表单-忘记密码

<code src="./demos/steps-form-2.tsx" />

### 分步表单-与Modal配合使用

<code src="./demos/steps-form-3.tsx" />

### 分步表单-固定页脚

<code src="./demos/steps-form-4.tsx" iframe="550px" />

### 浮层表单-ModalForm

<code src="./demos/modal-form-1.tsx" />

### 浮层表单-DrawerForm

<code src="./demos/drawer-form-1.tsx" />

## API

```typescript
import { BizForm } from 'antd-more';
```

### BizForm

除了以下参数，其余和 [`antd Form`](https://ant-design.gitee.io/components/form-cn/#Form) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
onReset  | 点击重置按钮的回调 | `(e)=>void` | - |
submitter  | 提交、重置按钮相关配置 | `false` \| `SubmitterProps` | - |
pressEnterSubmit  | 是否开启回车键提交，注意不要与自定义的 `htmlType='submit'` 的按钮冲突。 | `boolean` | `true` |
ready  | 为 `false` 时，禁止提交/重置表单。<br/>为 `true` 时，会重新设置表单初始值。 | `boolean` | `true` |
loading  | 设置提交、重置的加载/禁止状态。<br/>如果 `onFinish` 返回异步则无需设置，内部会自动更新。 | `boolean` | `false` |
labelWidth  | label 宽度 | `number` \| `'auto'` | `84` |
hideLabel  | 隐藏 label | `boolean` | `false` |

#### SubmitterProps

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
onSubmit  | 点击提交按钮的回调 | `(e)=>void` | - |
onReset  | 点击重置按钮的回调 | `(e)=>void` | - |
submitText  | 提交按钮文本 | `React.ReactNode` | `提交` |
resetText  | 重置按钮文本 | `React.ReactNode` | `重置` |
submitButtonProps  | 提交按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
resetButtonProps  | 重置按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
noReset  | 不渲染重置按钮 | `boolean` | `false` |
render  | 自定义操作的渲染 | `false` \| `(props,dom:JSX[])=>ReactNode[]` | - |

### QueryForm

基于 BizForm 扩展布局的查询表单。

```typescript
const { QueryForm } = BizForm;
```

除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
submitText  | 提交按钮文本 | `React.ReactNode` | `查询` |
resetText  | 重置按钮文本 | `React.ReactNode` | `重置` |
defaultCollapsed  | 默认状态下是否折叠超出的表单项 | `boolean` | `true` |
defaultColsNumber  | 默认显示的表单控件数量，数量大于等于控件数量则隐藏展开按钮。 | `number` | - |

#### 支持响应式

QueryForm 下的 Col 默认设置 `{ xs: 24, md: 12, lg: 8, xxl: 6 }` ，可以通过 BizForm.Item 的 `colProps` 重置。

### StepsForm

分步表单。

```typescript
const { StepsForm } = BizForm;
```

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
current  | 当前表单的步骤数，从 `0` 开始 | `number` | 0 |
onCurrentChange  | current 发生改变的事件 | `(current:number)=>void` | - |
ready  | 为 `false` 时，禁止上一步、下一步、提交操作。 | `boolean` | `true` |
onFinish  | 表单提交成功后调用 | `(values)=>void` | - |
stepsProps  | `StepsForm` 自带的 `Steps` 的 `props`，使用方式与 antd 相同，但是去掉了 `current` 和 `onChange` | [StepsProps](https://ant.design/components/steps-cn/#API) | - |
formProps  | `StepsForm.StepForm` 的属性，除了没有 `onReset` 和 `submitter`  | `BizFormProps` | - |
submitter  | 上一步、下一步、提交按钮的配置 | `StepsSubmitterProps` | - |
actionRef  | 常用操作引用，便于自定义触发 | `React.MutableRefObject<ActionType>` | - |
stepsRender  | 自定义步骤器 | `(stepsProps: StepsProps,stepsDom: React.ReactNode)=>React.ReactNode` | - |
stepFormRender  | 自定义每个表单 | `(formDom: React.ReactNode)=>React.ReactNode` | - |
stepsFormRender  | 自定义整个表单 | `(stepsDom: React.ReactNode, formDom: React.ReactNode, submitterDom: React.ReactNode)=>React.ReactNode` | - |

#### StepsForm.StepForm

基于 BizForm 扩展的表单，没有 `onReset` `resetText` `ready`， 除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | 步骤条标题 | `React.ReactNode` | - |
subTitle  | 步骤条子标题，可选 | `React.ReactNode` | - |
icon  | 步骤图标的类型，可选 | `React.ReactNode` | - |
description  | 步骤的详情描述，可选 | `React.ReactNode` | - |
stepProps  | 步骤条内的当前步骤配置。 | [Steps.Spep](https://ant.design/components/steps-cn/#Steps.Step) | - |
submitter  | 上一步、下一步、提交按钮的配置。会与 StepsForm 的 submitter 合并，优先级更高。 | `StepsSubmitterProps` | - |

#### StepsSubmitterProps

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
onPrev  | 点击上一步按钮的回调 | `()=>void` | - |
prevText  | 上一步按钮文本 | `React.ReactNode` | `上一步` |
prevButtonProps  | 上一步按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
noPrev  | 不显示上一步按钮 | `boolean` | - |
forceShowPrev  | 强制显示上一步按钮，优先级比noPrev高 | `boolean` | - |
onNext  | 点击下一步按钮的回调 | `()=>void` | - |
nextText  | 下一步按钮文本 | `React.ReactNode` | `下一步` |
nextButtonProps  | 提交按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
noNext  | 不显示下一步按钮 | `boolean` | - |
forceShowNext  | 强制显示下一步按钮，优先级比noNext高 | `boolean` | - |
onSubmit  | 点击提交按钮的回调 | `()=>void` | - |
submitText  | 提交按钮文本 | `React.ReactNode` | `提交` |
submitButtonProps  | 提交按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
forceShowSubmit  | 强制显示提交按钮 | `boolean` | - |
render  | 自定义操作的渲染 | `false` \| `(props,dom:JSX[])=>ReactNode[]` | - |

#### StepsFormActionType

```typescript
// import { StepsFormActionType } from 'antd-more/es/biz-form';

interface StepsFormActionType {
  prev: () => void; // 返回上一步
  next: (submitted: boolean) => void; // 跳转下一步，当submitted为true时，触发当前表单校验，校验成功则跳转下一步；当submitted为false时，不触发当前表单校验直接进入下一步。默认submitted为true
  submit: () => void; // 触发当前表单校验，并提交所有表单值
  reset: () => void; // 重置所有表单和值，将步骤恢复初始步骤
}
```

### ModalForm 

基于 BizForm 扩展的表单，除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Modal` 标题 | `React.ReactNode` | - |
width  | `Modal` 宽度 | `number` | `600` |
trigger  | 用于触发 `Modal` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开，非受控 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
modalProps  | `Modal` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [ModalProps](https://ant.design/components/modal-cn/#API) | - |
onFinish  | 提交数据时触发，如果返回不是 `false`，会关掉弹框并且重置表单 | `async (values)=>any` | - |

### DrawerForm 

基于 BizForm 扩展的表单，除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
title  | `Drawer` 标题 | `React.ReactNode` | - |
width  | `Drawer` 宽度 | `number` | `600` |
trigger  | 用于触发 `Drawer` 打开的 dom，一般是 button | `JSX.Element` | - |
visible  | 是否打开，非受控 | `boolean` | - |
onVisibleChange  | `visible` 改变时触发 | `(visible:boolean)=>void` | - |
drawerProps  | `Drawer` 的 `props`，使用方式与 antd 相同。注意：不支持 'visible'，请使用全局的 visible。 | [DrawerProps](https://ant.design/components/drawer-cn/#API) | - |
onFinish  | 提交数据时触发，如果返回不是 `false`，会关掉弹框并且重置表单 | `async (values)=>any` | - |

### List

```typescript
const { List } = BizForm;
```

参数和 antd Form.List 一样。

### Item

```typescript
const { Item } = BizForm;
```

除了以下参数，其余和 antd Form.Item 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
labelWidth  | label 宽度。默认继承 `BizForm` 的 `labelWidth`。 | `number` \| `'auto'` | - |
hideLabel  | 隐藏 label 。默认继承 `BizForm` 的 `hideLabel`。 | `boolean` | - |
transform  | 转换该字段值，表单提交时执行。 | `(value)=>any` | - |
extendRules  | 扩展校验规则。如果需要覆盖，请使用 `rules` | [`Rule[]`](https://ant-design.gitee.io/components/form-cn/#Rule) | - |
colProps  | 设置该表单项 Col 属性。部分场景下生效，如 QueryForm 下。  | [`ColProps`](https://ant-design.gitee.io/components/grid-cn/#Col) | - |

### 其它Item

以下 ItemX 组件都是基于 BizForm.Item 扩展，仅列出扩展的参数。如果为必填项，仅需设置 `required` 即可。

### ItemAddress

地址选择和输入框，该表单项由2个表单项组合而成，所以不要配置 `name`，但必须配置 `names` `labels` 。

默认级联框的 `colProps` 为 `{ md: 12, lg: 8 }` ， 输入框的 `colProps` 为 `{ md: 12, lg: 16 }` 。

**特点**

- 过滤空格
- 分开校验

**校验顺序**

- 必填时为空，提示：`请选择${labels[0]}` `请输入${labels[1]}`

<code src="./demos/item-address-1.tsx" />

<br/>

```typescript
type CascaderValue = string[] | number[];

interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
names  | 级联选项和输入框的字段名 | `[NamePath, NamePath]` | - |
labels  | 级联选项和输入框的标签名，仅用于提示 | `[string, string]` | - |
options  | 级联选项数据 | `Option[]` | - |
formItemProps  | 级联选项和输入框的 Item 属性。如果要修改宽度，可以分别传入 `colProps` 进行设置。 | `[BizFormItemProps, BizFormItemProps]` | `[]` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |
cascaderProps  | 级联选项的属性 | [`CascaderProps`](https://ant-design.gitee.io/components/cascader-cn/#API) | - |


### ItemCaptcha

验证码输入框和按钮。

**特点**

- 按钮状态自动管理（倒计时、禁用、loading）

**校验顺序**

- 必填时为空，提示：`请输入${label}`

<code src="./demos/item-captcha-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
type  | 显示类型 | `default` \| `inline` | `default` |
check  | 用于检查手机号码或邮箱是否正确，点击按钮时触发。 | `()=>boolean` \| `()=>Promise<any>` | `()=>true` |
onGetCaptcha  | 用于请求获取验证码，`check` 验证成功后触发。 | `()=>Primise<any>` | `()=>Promise.resolve()` |
initText  | 按钮初始显示文本 | `string` | `获取验证码` |
runText  | 按钮倒计时显示文本，包含 `%s` 会自动替换为秒数 | `string` | `%s秒后重新获取` |
resetText  | 按钮倒计时结束显示文本 | `string` | `重新获取验证码` |
second  | 按钮倒计时时长，单位秒 | `number` | `60` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |
buttonProps  | 按钮的属性 | [`ButtonProps`](https://ant.design/components/button-cn/#API) | - |


### ItemCheckbox

多选框

**特点**

- 支持配置全部选项、排除项

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-checkbox-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
options  | 包含 `value` `name` 的数组 | `EnumData` | `[]` |
excludeValues  | 排除的值 | `any[]` | `[]` |
all  | 是否显示全部 | `boolean` | `false` |
allName  | 全部的名称 | `string` | `全部` |
checkboxProps  | 多选框的属性 | [`CheckboxProps`](https://ant-design.gitee.io/components/checkbox-cn/#Checkbox) | - |
checkboxGroupProps  | 多选框 Group 的属性 | [`CheckboxGroupProps`](https://ant-design.gitee.io/components/checkbox-cn/#Checkbox-Group) | - |


### ItemColor

颜色选择

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-color-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
showText  | 显示颜色值文本 | `boolean` | `false` |
picker  | 颜色选择样式 | `block` `chrome` `compact` `photoshop` `sketch` | `sketch` |
trigger  | 触发行为 | `hover` `click` | `click` |
colorMode  | 颜色模式 | `hex` `rgb` | `hex` |
placement  | 颜色选择浮层位置 | `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | `bottomLeft` |
colorProps  | 其他颜色选择器配置，不同 picker 有不同的配置项，参考 [Color](https://doly-dev.github.io/antd-more/site/v1/index.html#/common/color?anchor=picker-%E5%85%B1%E5%90%8C%E7%9A%84-api) | `any` | - |


### ItemDate

日期选择框

**特点**

- 快捷配置向前、后禁选范围
- 支持字符串格式的日期输入
- 输出时自动转换为字符串格式

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-date-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
disabledDateBefore  | 配置不可选基于当天增加/减少之前的日期。 | `number` | - |
disabledDateAfter  | 配置不可选基于当天增加/减少之后的日期。 | `number` | - |
showTime  | 显示时间选择 | `boolean` | `false` |
format  | 设置日期格式，默认值会根据 `picker` 调整。 | `string` | `YYYY-MM-DD` |
picker  | 设置选择器类型 | `date` `week` `month` `quarter` `year` | `date` |
pickerProps  | 选择器的属性 | [`DatePickerProps`](https://ant-design.gitee.io/components/date-picker-cn/#API) | - |


### ItemDateRange

日期区间选择框

**特点**

- 快捷配置向前、后禁选范围
- 支持字符串格式的日期输入
- 输出时自动转换为字符串格式
- 最大区间范围
- 字段名自动转换拆分

**校验顺序**

- 必填时为空，提示：`请选择${label}`
- 日期范围判断超过区间，提示：`时间跨度不能超过${maxRange}天/周/月/季/年`

<code src="./demos/item-dateRange-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
maxRange  | 最大可选范围值，用于校验，根据当前 picker 为单位。 | `number` | - |
names  | 开始和结束的字段名，配置该值后，原来的 `name` 将失效。如 `['startDate', 'endDate']` | `[NamePath, NamePath]` | - |
disabledDateBefore  | 配置不可选基于当天增加/减少之前的日期。 | `number` | - |
disabledDateAfter  | 配置不可选基于当天增加/减少之后的日期。 | `number` | - |
showTime  | 显示时间选择 | `boolean` | `false` |
format  | 设置日期格式，默认值会根据 `picker` 调整。 | `string` | `YYYY-MM-DD` |
picker  | 设置选择器类型 | `date` `week` `month` `quarter` `year` | `date` |
pickerProps  | 选择器的属性 | [`DateRangePickerProps`](https://ant-design.gitee.io/components/date-picker-cn/#RangePicker) | - |



### ItemInput

Input 输入框

**特点**

- 可配置过滤空格
- 当有 `type` 值时：
  - 失焦校验
  - 手机号码、身份证号、银行卡号自动格式化
  - 邮箱、用户名自动过滤空格

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 根据 `type` 使用 `util-helpers` [isMobile]、[isIdCard]、[isBankCard]、[isEmail] 验证，提示：`请输入正确的${label}`
- 如果是用户名（如有长度限制，可通过 `excludeRules` 扩展规则）
  - 验证非手机号码，提示：`${label}不能为手机号码`
  - 验证不包含@符号，提示：`${label}不能包含@符号`

<code src="./demos/item-input-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
type  | 输入框类型。 | `mobile` \| `bankCard` \| `idCard` \| `email` \| `userName` | - |
disabledWhiteSpace  | 禁止输入空白符。 `Password` 组件不支持该项。 | `boolean` | `false` |
before  | 输入框前面元素 | `React.ReactNode` | - |
after  | 输入框后面元素 | `React.ReactNode` | - |
security  | 开启脱敏校验。为 `ture` 时，必须传入 `initialValue` 。 | `boolean` | `false` |
symbol  | 脱敏符号 | `string` | `*` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |


### ItemNumber

数字输入框

**特点**

- 支持数字输入框前后插入元素
- 返回的值为类型数字
- 默认精度 `precision=2`

**校验顺序**

- 必填时不为数字，提示：`请输入${label}`
- 大于等于 `lt` 时，提示：`不能大于等于${lt}`
- 小于等于 `gt` 时，提示：`不能小于等于${gt}`
- 大于 `lte` 时，提示：`不能大于${lte}`
- 小于 `gte` 时，提示：`不能小于${gt}`

<code src="./demos/item-number-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
before  | 数字输入框前面元素 | `React.ReactNode` | - |
after  | 数字输入框后面元素 | `React.ReactNode` | - |
lt  | 最大值 | `number` | - |
lte  | 最大值（允许等于） | `number` | - |
gt  | 最小值 | `number` | - |
gte  | 最小值（允许等于） | `number` | - |
inputProps  | 数字输入框的属性 | [`InputNumberProps`](https://ant-design.gitee.io/components/input-number-cn/#API) | - |


### ItemPassword

密码输入框

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- `validated` 为 `true` 时：
  - 验证长度，提示：`${label}为${min}～${max}位`
  - 使用 `util-helpers` [validatePassword] 验证非法字符，提示：`${label}包含无法识别的字符`
  - 验证密码强度，提示：`${label}为大小写字母、数字或符号任意${numMap[level]}者组成`

<code src="./demos/item-password-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
validated  | 开启验证。为 `false` 时则为普通密码框，不验证长度、强度、特殊字符。 | `boolean` \| `{ len: boolean; level: boolean; special: boolean; }` | `true` |
min  | 最小长度 | `number` | `8` |
max  | 最大长度 | `number` | `16` |
level  | 密码强度。可选 `1` `2` `3` | `number` | `2` |
ignoreCase | 忽略大小写。为 `ture` 时，大小写字母视为一种字符 | `boolean` | `false` |
special  | 支持的特殊字符 | `string` | `!@#$%^&*()-=_+[]\|{},./?<>~` |
inputProps  | 密码框配置参数 | [`Input.Password`](https://ant.design/components/input-cn/#Input.Password) | - |


### ItemRadio

单选框

**特点**

- 支持配置全部选项、排除项

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-radio-1.tsx" />

<br/>

```typescript
interface Option {
    name: string;
    value: string | number | boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
    [x: string]: any;
}
```

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
options  | 包含 `value` `name` 的数组 | `Option[]` | `[]` |
optionType  | 用于设置 Radio `options` 类型 | `default` \| `button` | `default` |
all  | 是否显示全部  | `boolean` | `false` |
allValue | 全部的值 | `string` | `""` |
allName | 全部的名称 | `string` | `全部` |
excludeValues | 排除的值 | `any[]` | `[]` |
radioProps  | 单选框配置参数 | [`RadioProps`](https://ant-design.gitee.io/components/radio-cn/#Radio/Radio.Button) | - |
radioGroupProps  | 单选框组合配置参数 | [`RadioGroupProps`](https://ant-design.gitee.io/components/radio-cn/#RadioGroup) | - |


### ItemSelect

下拉选择器

**特点**

- 支持配置全部选项、排除项

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-select-1.tsx" />

<br/>

```typescript
interface Option {
    value: string | number;
    name: string;
    key?: string | number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [x: string]: any;
}
```

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
options  | 包含 `value` `name` 的数组 | `Option[]` | `[]` |
all  | 是否显示全部  | `boolean` | `false` |
allValue | 全部的值 | `string` | `""` |
allName | 全部的名称 | `string` | `全部` |
excludeValues | 排除的值 | `any[]` | `[]` |
selectProps  | 选择器配置参数 | [`SelectProps`](https://ant-design.gitee.io/components/select-cn/#Select-props) | - |



### ItemTextArea

TextArea 输入框

**特点**

- 可配置过滤空格

**校验顺序**

- 必填时为空，提示：`请输入${label}`

<code src="./demos/item-textarea-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
disabledWhiteSpace  | 禁止输入空白符 | `boolean` | `false` |
inputProps  | 输入框的属性 | [`TextAreaProps`](https://ant-design.gitee.io/components/input-cn/#Input.TextArea) | - |


### ItemTime

日期选择框

**特点**

- 支持字符串格式的时间输入
- 输出时自动转换为字符串格式

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-time-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
format  | 设置时间格式 | `string` | `HH:mm:ss` |
pickerProps  | 选择器的属性 | [`TimePickerProps`](https://ant-design.gitee.io/components/time-picker-cn/#API) | - |


### ItemTimeRange

时间区间选择框

**特点**

- 支持字符串格式的日期输入
- 输出时自动转换为字符串格式
- 字段名自动转换拆分

**校验顺序**

- 必填时为空，提示：`请选择${label}`

<code src="./demos/item-timeRange-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
names  | 开始和结束的字段名，配置该值后，原来的 `name` 将失效。如 `['startTime', 'endTime']` | `[NamePath, NamePath]` | - |
format  | 设置日期格式 | `string` | `HH:mm:ss` |
pickerProps  | 选择器的属性 | [`TimeRangePickerProps`](https://ant-design.gitee.io/components/time-picker-cn/#RangePicker) | - |


### ItemUpload

上传

**特点**

- 支持添加文件即上传
- 自动处理上传中和失败状态
- 适用于多种场景，文件/图片/头像/封面图等等

**校验顺序**

- 必填时为空，提示：`请上传${label}`

<code src="./demos/item-upload-1.tsx" />

<br/>

```typescript
type UploadFile = {
  uid: string | number;
  name: string;
  thumbUrl?: string; // 小图（缩略图）
  url?: string; // 大图（预览）
  response?: any; // 加载失败时，鼠标移入提示
  // ...
}
```

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
type  | 上传组件内建类型样式。 | `default` \| `image` \| `avatar` \| `dragger` | `default` |
onUpload  | 上传，添加文件时触发。<br/>内部自动处理上传中和失败状态。<br/>如果返回 `object` 将添加到 `UploadFile` 对象中。 | `(file: UploadFile)=>Promise<object `\|` undefined>` | - |
onGetPreviewUrl  | 获取预览图片，点击预览时触发。<br/>（仅在没有url的情况下生效，执行成功后将预览图放在file.preview，不再触发） | `(file: UploadFile)=>Promise<string>` | - |
maxSize  | 单个文件限制大小，单位 `Byte`。 | `number` | `1024*1024*2` |
maxCount  | 限制上传文件数量。<br/>如果 `type` 为 `avatar` 该参数将失效。 | `number` | - |
accept  | 接受上传的文件类型。<br/>如果 `type` 为 `image` 或 `avatar` ，默认为 `.jpg, .jpeg, .png`  | `string` | - |
fileTypeMessage  | 文件类型错误时提示 | `string` | `只支持上传 ${accept} 文件` |
fileSizeMessage  | 文件超过最大尺寸时提示，包含 `%s` 会自动替换为 `maxFileSizeStr`。 | `string` | `必须小于 ${maxFileSizeStr}！` |
maxCountMessage  | 上传文件超过限制数量时提示 | `string` | `最多上传${maxCount}个文件` |
disabled  | 是否禁用 | `boolean` | `false` |
multiple  | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件 | `boolean` | `false` |
icon  | 图标 | `ReactNode` | - |
title  | 文本 | `ReactNode` | - |
uploadProps  | 上传配置参数 | [`UploadProps`](https://ant-design.gitee.io/components/upload-cn/#API) | - |



[isMobile]: https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile
[isBankCard]: https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard
[isEmail]: https://doly-dev.github.io/util-helpers/module-Validator.html#.isEmail
[isIdCard]: https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard
[validatePassword]: https://doly-dev.github.io/util-helpers/module-Validator.html#.validatePassword

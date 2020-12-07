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

## API

```typescript
import { BizForm } from 'antd-more';
```

### BizForm

除了以下参数，其余和 [`antd Form`](https://ant-design.gitee.io/components/form-cn/#Form) 组件一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
onReset  | 点击重置按钮的回调 | `(e)=>void` | - |
submitter  | 提交、重置按钮相关配置 | `false` | `SubmitterProps` | - |
pressEnterSubmit  | 是否开启回车键提交，注意不要与自定义的 `htmlType='submit'` 的按钮冲突。 | `boolean` | `true` |
ready  | 为 `false` 时，禁止提交/重置表单。<br/>为 `true` 时，会重新设置表单初始值。 | `boolean` | `true` |
loading  | 设置提交、重置的加载/禁止状态 | `boolean` | `false` |

#### SubmitterProps

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
onSubmit  | 点击提交按钮的回调 | `(e)=>void` | - |
onReset  | 点击重置按钮的回调 | `(e)=>void` | - |
submitText  | 提交按钮文本 | `React.ReactNode` | `提交` |
resetText  | 重置按钮文本 | `React.ReactNode` | `重置` |
submitButtonProps  | 提交按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
resetButtonProps  | 重置按钮属性，和 [`antd Button`](https://ant-design.gitee.io/components/button-cn/#API) 一致 | [`ButtonProps`](https://ant-design.gitee.io/components/button-cn/#API) | - |
render  | 自定义操作的渲染 | `false` \| `(props,dom:JSX[])=>ReactNode[]` | - |

### QueryForm

基于 BizForm 扩展布局的查询表单。

```typescript
const { QueryForm } = BizForm;
```

除了以下参数，其余和 BizForm 一样。

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
labelWidth  | label 宽度 | `number` \| `'auto'` | `80` |
submitText  | 提交按钮文本 | `React.ReactNode` | `查询` |
resetText  | 重置按钮文本 | `React.ReactNode` | `重置` |
defaultCollapsed  | 默认状态下是否折叠超出的表单项 | `boolean` | `true` |
defaultColsNumber  | 默认显示的表单控件数量，数量大于等于控件数量则隐藏展开按钮。 | `number` | - |

#### 支持响应式

QueryForm 下的 Col 默认设置 `{ xs: 24, md: 12, lg: 8, xxl: 6 }` ，可以通过 BizForm.Item 的 `colProps` 重置。

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
transform  | 转换该字段值，表单提交时执行。 | `(value)=>any` | - |
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
type Value = [CascaderValue, string | undefined];
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

### ItemBankCard

银行卡号输入框

**特点**

- 自动过滤非数字（如果开启脱敏校验允许输入脱敏符号）
- 支持格式化
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 使用 [util-helpers isBankCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard) 验证，提示：`请输入正确的${label}`

<code src="./demos/item-bankCard-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
security  | 开启脱敏校验。为 `ture` 时，必须传入 `initialValue` 。 | `boolean` | `false` |
symbol  | 脱敏符号 | `string` | `*` |
loose  | 宽松模式校验银行卡号，参考 [util-helpers isBankCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isBankCard) | `boolean` | `true` |
formatting  | 输入显示格式化 | `boolean` | `false` |
divider  | 格式化的分隔符，需配合 `formatting` 使用。 | `string` | `' '` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |


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
check  | 用于检查手机号码或邮箱是否正确，点击按钮时触发。 | `()=>boolean` \| `()=>Promise<boolean>` | `()=>true` |
onGetCaptcha  | 用于请求获取验证码，check 返回 true 时触发。 | `()=>Primise<any>` | `()=>Promise.resolve()` |
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
showTime  | 显示时间选择 | `获取验证码` |
format  | 设置日期格式，默认值会根据 `picker` 调整。 | `string` | `YYYY-MM-DD` |
picker  | 设置选择器类型 | `date` `week` `month` `quarter` `year` | `date` |
pickerProps  | 输入框的属性 | [`DatePickerProps`](https://ant-design.gitee.io/components/date-picker-cn/#API) | - |


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
showTime  | 显示时间选择 | `获取验证码` |
format  | 设置日期格式，默认值会根据 `picker` 调整。 | `string` | `YYYY-MM-DD` |
picker  | 设置选择器类型 | `date` `week` `month` `quarter` `year` | `date` |
pickerProps  | 输入框的属性 | [`DatePickerProps`](https://ant-design.gitee.io/components/date-picker-cn/#API) | - |


### ItemEmail

邮箱输入框

**特点**

- 自动过滤空格
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 使用 [util-helpers isEmail](https://doly-dev.github.io/util-helpers/module-Validator.html#.isEmail) 验证，提示：`请输入正确的${label}`

<code src="./demos/item-email-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
security  | 开启脱敏校验。为 `ture` 时，必须传入 `initialValue` 。 | `boolean` | `false` |
symbol  | 脱敏符号 | `string` | `*` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |


### ItemIdCard

身份证号输入框

**特点**

- 过滤非数字 xX （如果开启脱敏校验允许输入脱敏符号）
- 小写 x 自动转为大写 X
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 使用 [util-helpers isIdCard](https://doly-dev.github.io/util-helpers/module-Validator.html#.isIdCard) 验证，提示：`请输入正确的${label}`

<code src="./demos/item-idCard-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
security  | 开启脱敏校验。为 `ture` 时，必须传入 `initialValue` 。 | `boolean` | `false` |
symbol  | 脱敏符号 | `string` | `*` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |


### ItemInput

Input 输入框

**特点**

- 可配置过滤空格

**校验顺序**

- 必填时为空，提示：`请输入${label}`

<code src="./demos/item-input-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
disabledWhiteSpace  | 禁止输入空白符。 `Password` 组件不支持该项。 | `boolean` | `false` |
inputProps  | 输入框的属性 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#API) | - |


### ItemMobile

手机号码输入框

**特点**

- 过滤非数字（如果开启脱敏校验允许输入脱敏符号）
- 失焦校验
- 开启脱敏校验后，与 `initialValue` 比较

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 开启脱敏校验后，判断是否与初始值相等，相等即 `验证通过`
- 使用 [util-helpers isMobile](https://doly-dev.github.io/util-helpers/module-Validator.html#.isMobile) 验证，提示：`请输入正确的${label}`

<code src="./demos/item-mobile-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
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

**特点**

- 失焦校验

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 验证长度，提示：`${label}为${min}～${max}位`
- 使用 [util-helpers validatePassword](https://doly-dev.github.io/util-helpers/module-Validator.html#.validatePassword) 验证非法字符，提示：`${label}包含无法识别的字符`
- 验证密码强度，提示：`${label}为大小写字母、数字或符号任意${numMap[level]}者组成`

<code src="./demos/item-password-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
min  | 最小长度 | `number` | `8` |
max  | 最大长度 | `number` | `16` |
level  | 密码强度。可选 `1` `2` `3` | `number` | `2` |
ignoreCase | 忽略大小写。为 `ture` 时，大小写字母视为一种字符 | `boolean` | `false` |
special  | 支持的特殊字符 | `string` | `!@#$%^&*()-=_+[]\|{},./?<>~` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |


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


### ItemUserName

用户名输入框

**特点**

- 自动过滤空格
- 失焦校验

**校验顺序**

- 必填时为空，提示：`请输入${label}`
- 验证长度，提示：`${label}为${min}~${max}位`
- 验证非手机号码，提示：`${label}不能为手机号码`
- 验证不包含@符号，提示：`${label}不能包含@符号`

<code src="./demos/item-useName-1.tsx" />

<br/>

参数 | 说明 | 类型 | 默认值 |
------------- | ------------- | ------------- | ------------- |
min  | 最小长度 | `number` | `6` |
max  | 最大长度 | `number` | `32` |
inputProps  | 输入框配置参数 | [`InputProps`](https://ant-design.gitee.io/components/input-cn/#Input) | - |

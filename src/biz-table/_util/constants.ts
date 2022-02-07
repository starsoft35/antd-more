import {
  BizFormItemUpload,
  BizFormItemAddress,
  BizFormItemCaptcha,
  BizFormItemCheckbox,
  BizFormItemColor,
  BizFormItemDate,
  BizFormItemDateRange,
  BizFormItemInput,
  BizFormItemTextArea,
  BizFormItemNumber,
  BizFormItemPassword,
  BizFormItemRadio,
  BizFormItemSelect,
  BizFormItemTime,
  BizFormItemTimeRange,
  BizFormItemSwitch,
  BizFormItemSlider
} from '../../biz-form';

export const ItemTypes = {
  upload: BizFormItemUpload,
  address: BizFormItemAddress,
  captcha: BizFormItemCaptcha,
  checkbox: BizFormItemCheckbox,
  color: BizFormItemColor,
  date: BizFormItemDate,
  dateRange: BizFormItemDateRange,
  input: BizFormItemInput,
  textarea: BizFormItemTextArea,
  number: BizFormItemNumber,
  password: BizFormItemPassword,
  radio: BizFormItemRadio,
  select: BizFormItemSelect,
  time: BizFormItemTime,
  timeRange: BizFormItemTimeRange,
  switch: BizFormItemSwitch,
  slider: BizFormItemSlider
};

export enum ValueTypeToItemType {
  text = 'input',
  money = 'number',
  progress = 'number',
  percent = 'number',
  color = 'color',
  enum = 'select',
  enumTag = 'select',
  enumBadge = 'select',
  date = 'date',
  fromNow = 'date',
  dateWeek = 'date',
  dateMonth = 'date',
  dateQuarter = 'date',
  dateYear = 'date',
  dateRange = 'dateRange',
  dateTime = 'date',
  dateTimeRange = 'dateRange',
  time = 'time',
  timeRange = 'timeRange'
}

export enum DatePickerMap {
  dateWeek = 'week',
  dateMonth = 'month',
  dateQuarter = 'quarter',
  dateYear = 'year'
}

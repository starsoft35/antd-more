import { EnumData } from '../dictionary';

type ValueTypeStr =
  | 'text'
  | 'date'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTime'
  | 'dateTimeRange'
  | 'time'
  | 'timeRange'
  | 'fromNow'
  | 'money'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'enum'
  | 'enumTag'
  | 'enumBadge'
  | 'image'
  | 'color'
  | string;

/**
 * @deprecated 即将不支持，请使用 string
 */
type ValueTypeObj = {
  type: ValueType;
  [x: string]: any;
};

/**
 * @deprecated 即将不支持，请使用 string
 */
type ValueTypeFn = (value?: any) => ValueTypeObj;

export type ValueType = ValueTypeStr | ValueTypeObj | ValueTypeFn;

export type { EnumData };

export interface BizFieldProps<T = any> {
  value: T;
  valueType?: ValueType;
  valueEnum?: EnumData;
  formatValue?: (value: T) => any;
  [x: string]: any;
}

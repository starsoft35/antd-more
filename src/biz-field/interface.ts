import type { EnumData } from '../dictionary';

type ValueType =
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
  | 'color';

export type { EnumData, ValueType };

export interface BizFieldProps<T = any> {
  value: T;
  valueType?: ValueType;
  valueEnum?: EnumData;
  formatValue?: (value: any) => T;
  [x: string]: any;
}

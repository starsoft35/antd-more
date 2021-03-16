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
type ValueTypeObj = {
  type: ValueType;
  [x: string]: any;
};
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

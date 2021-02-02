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

export interface BizFieldProps {
  value: any;
  valueType?: ValueType;
  valueEnum?: EnumData;
  [x: string]: any;
}

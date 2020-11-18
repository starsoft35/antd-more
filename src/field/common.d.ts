import { EnumData } from '../dictionary/common';

export interface FieldProps {
  value: any;
  type?:
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
    | 'fromNow'
    | 'money'
    | 'index'
    | 'indexBorder'
    | 'progress'
    | 'percent'
    | 'rate'
    | 'enum'
    | 'avatar'
    | 'image'
    | 'tag'
    | 'badge'
    | 'default';
  enumType?: 'tag' | 'text' | 'badge';
  fieldProps?: any;
  valueEnum?: EnumData[];
}

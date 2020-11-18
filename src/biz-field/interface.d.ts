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
  | 'fromNow'
  | 'money'
  | 'index'
  | 'indexBorder'
  | 'progress'
  | 'percent'
  | 'enum'
  | 'enumTag'
  | 'enumBadge'
  | 'color'
  | 'default';
type ValueTypeObj = {
  type: ValueType;
  [x: string]: any;
};
type ValueTypeFn = () => ValueTypeObj;

export interface FieldProps {
  value: any;
  valueType?: ValueType | ValueTypeObj | ValueTypeFn;
  valueEnum?: EnumData[];
  [x: string]: any;
}

export interface EnumData {
  name: string;
  value: any;
  badge?: {
    status?: string;
    color?: string;
    [key: string]: any;
  };
  tag?: {
    color?: string;
    [key: string]: any;
  };
  text?: {
    style?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

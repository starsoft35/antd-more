import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

export type ActionType = {
  reload: () => void;
  reset: () => void;
  submit: () => void;
};

export type RecordType = {
  [key: string]: any;
};

export type RequestParamParams = {
  pageSize?: number;
  current?: number;
  [key: string]: any;
};
export interface RequestParamExtra
  extends Pick<TableCurrentDataSource<RecordType>, 'currentDataSource'> {
  action: 'paginate' | 'sort' | 'filter' | 'reload' | 'reset' | 'submit';
}
export type RequestParamFilters = Record<string, (string | number)[] | null>;
export type RequestParamSorter = SorterResult<RecordType> | SorterResult<RecordType>[];

export type Request = (
  params: RequestParamParams,
  filters: RequestParamFilters,
  sorter: RequestParamSorter,
  extra: RequestParamExtra,
) => Promise<{ data: object[]; total?: number; [x: string]: any }>;

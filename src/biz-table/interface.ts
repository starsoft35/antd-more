import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

export interface AsyncFnReturn<D = any> extends Record<string | number, any> {
  data: D[];
  total?: number;
}

export type ActionType = {
  reload: () => void;
  reset: () => void;
  submit: () => void;
};

export interface RequestParams extends Record<string | number, any> {
  pageSize: number;
  current: number;
}
export interface RequestExtra<RecordType = any>
  extends Pick<TableCurrentDataSource<RecordType>, 'currentDataSource'> {
  action: 'paginate' | 'sort' | 'filter' | 'reload' | 'reset' | 'submit';
}
export type RequestFilters = Record<string, (string | number | boolean)[] | null>;
export type RequestSorter<RecordType> = SorterResult<RecordType> | SorterResult<RecordType>[];

export type BizTableRequest<RecordType = any> = (
  params: RequestParams,
  filters: RequestFilters,
  sorter: RequestSorter<RecordType>,
  extra: RequestExtra<RecordType>,
) => Promise<AsyncFnReturn<RecordType>>;

/**
 * @deprecated Please use `BizTableRequest` instead.
 */
export type Request<RecordType = any> = BizTableRequest<RecordType>;

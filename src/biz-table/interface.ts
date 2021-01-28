import * as React from 'react';
import { ColumnType } from 'antd/es/table';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { FormInstance } from 'antd/es/form';
import { ValueType, EnumData } from '../biz-field';
import { BizFormItemProps } from '../biz-form';
import { ItemTypes } from './_util/constants';

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

export interface SearchProps<RecordType = any>
  extends Partial<Pick<ColumnType<RecordType>, 'dataIndex' | 'title'>>,
    Partial<BizFormItemProps>,
    Record<string | number, any> {
  valueType?: ValueType;
  valueEnum?: EnumData;
  itemType?: keyof typeof ItemTypes;
  order?: number;
  render?: (
    originItem: BizColumnType<RecordType>,
    dom: JSX.Element, // eslint-disable-line
    form: FormInstance,
  ) => JSX.Element | React.ReactNode; // eslint-disable-line
}

export type BizColumnType<RecordType = any> = (ColumnType<RecordType> & {
  valueType?: ValueType;
  valueEnum?: EnumData;
  tooltip?: string;
  nowrap?: boolean;
  search?: boolean | SearchProps<RecordType>; // 显示搜索 或 搜索配置
  table?: boolean; // 是否显示在表格列中，部分设置列可能只为了设置 search
  order?: number; // 用于search表单排序，数字越大越靠前
})[];

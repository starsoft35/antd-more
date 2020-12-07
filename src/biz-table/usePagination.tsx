import { useState, useEffect, useCallback, useRef } from 'react';
import { useAsync } from 'rc-hooks';
import { AsyncParams, AsyncResult } from 'rc-hooks/types/useAsync';
import actionCache from './actionCache';
import {
  RequestParamParams,
  RequestParamFilters,
  RequestParamSorter,
  RequestParamExtra,
} from './interface';

interface ParamsRef {
  params: Record<string, any>;
  filters: RequestParamFilters;
  sorter: RequestParamSorter;
  extra: RequestParamExtra;
}

type showTotalFn = (num: number | string) => string;

interface Options extends AsyncParams<any, any[] | undefined> {
  defaultPageSize?: number;
  actionCacheKey?: string;
}

interface ReturnValues extends AsyncResult {
  onTableChange: (
    params: RequestParamParams,
    filters: RequestParamFilters,
    sorter: RequestParamSorter,
    extra: RequestParamExtra,
  ) => Promise<any>;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
    showTotal: showTotalFn;
    showSizeChanger: true;
  };
}

type UsePagination = (asyncFn: (...args: any) => Promise<any>, options?: Options) => ReturnValues;

// 显示数据总量
const showTotal = (num) => `共 ${num} 条数据`;

const usePagination: UsePagination = (
  asyncFn,
  { defaultPageSize = 10, actionCacheKey = '', autoRun, onSuccess = () => {}, ...restOptions },
) => {
  const [data, setData] = useState([]);

  const pageRef = useRef({
    current: 1,
    pageSize: defaultPageSize || 10,
    total: 0,
  }); // 分页
  const paramsRef = useRef<ParamsRef>({
    params: {},
    filters: {},
    sorter: {},
    extra: {
      currentDataSource: [],
      action: 'submit',
    },
  }); // 请求参数，这里不使用 useAsync 缓存params，因为里面可能包含了分页数据

  const request = useAsync(asyncFn, {
    ...restOptions,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res?.total || 0;
      setData(res.data || []);

      if (typeof onSuccess === 'function') {
        onSuccess(res, params);
      }
    },
  });

  const run = useCallback(
    (params?: any) => {
      // 如果查询参数变化，重置参数和分页
      if (params) {
        paramsRef.current.params = params;
        pageRef.current.current = 1;
      }
      const { pageSize, current } = pageRef.current;
      const { params: paramsRet, filters, sorter, extra } = paramsRef.current;
      const action = actionCacheKey ? actionCache[actionCacheKey] : extra.action;

      // 2. 传入参数，发起请求
      return request.run({ ...paramsRet, pageSize, current }, filters, sorter, {
        currentDataSource: data,
        action,
      });
    },
    [data],
  );

  const refresh = useCallback(() => {
    return run();
  }, []);

  // 修改分页、筛选、排序
  const onTableChange = useCallback((pagination, filters, sorter, extra) => {
    pageRef.current = {
      ...pageRef.current,
      ...pagination,
    };
    paramsRef.current = {
      ...paramsRef.current,
      filters,
      sorter,
      extra,
    };
    if (actionCacheKey) {
      actionCache[actionCacheKey] = extra.action;
    }
    return run();
  }, []);

  useEffect(() => {
    if (typeof autoRun === 'undefined' || autoRun) {
      run();
    }
  }, []);

  return {
    ...request,
    run,
    refresh,
    data,
    onTableChange,
    pagination: {
      showTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      ...pageRef.current,
    },
  };
};

export default usePagination;

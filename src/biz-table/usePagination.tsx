import { useState, useEffect, useCallback, useRef } from 'react';
import { useAsync } from 'rc-hooks';
import actionCache from './actionCache';
import {
  RequestParamParams,
  RequestParamFilters,
  RequestParamSorter,
  RequestParamExtra,
} from './interface';

interface ParamsRef {
  params: RequestParamParams;
  filters: RequestParamFilters;
  sorter: RequestParamSorter;
  extra: RequestParamExtra;
}

// 显示数据总量
const showTotal = (num) => `共 ${num} 条数据`;

const usePagination = (asyncFn, options) => {
  const [data, setData] = useState([]);

  const pageRef = useRef({
    current: 1,
    pageSize: options?.defaultPageSize || 10,
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
    ...options,
    autoRun: false,
    onSuccess: (res, params) => {
      // 1. 设置分页和数据
      pageRef.current.total = res?.total || 0;
      setData(res.data || []);

      if (options.onSuccess) {
        options.onSuccess(res, params);
      }
    },
  });

  const run = useCallback((params?: any) => {
    // 如果查询参数变化，重置参数和分页
    if (params) {
      paramsRef.current.params = params;
      pageRef.current.current = 1;
    }
    const { pageSize, current } = pageRef.current;
    const { params: paramsRet, filters, sorter, extra } = paramsRef.current;
    const action = options?.actionCacheKey ? actionCache[options.actionCacheKey] : extra.action;

    // 2. 传入参数，发起请求
    return request.run({ ...paramsRet, pageSize, current }, filters, sorter, { ...extra, action });
  }, []);

  const refresh = useCallback(() => {
    return run();
  }, []);

  // 修改分页
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
    if (options?.actionCacheKey) {
      actionCache[options?.actionCacheKey] = extra.action;
    }
    return run();
  }, []);

  useEffect(() => {
    if (typeof options.autoRun === 'undefined' || options.autoRun) {
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

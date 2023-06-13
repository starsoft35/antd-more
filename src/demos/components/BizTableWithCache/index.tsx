import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { FormInstance } from 'antd';
import type { BizTableActionType, BizTableProps, BizTableRequest } from 'antd-more';
import { BizTable } from 'antd-more';
import { omit } from 'ut2';
import dayjs from 'dayjs';
import { memoryCache } from './storage';

const dateTypes = ['dateRange', 'timeRange'];

interface BizTableWithCacheProps extends Omit<BizTableProps, 'formRef'> {
  cacheKey: string;
  formRef?: React.MutableRefObject<FormInstance | undefined>;
  pageParamsField?: string[];
}

const BizTableWithCache: React.FC<BizTableWithCacheProps> = ({
  cacheKey,
  request,
  pagination,
  autoRequest,
  actionRef: outerActionRef,
  formRef: outerFormRef,
  columns = [],
  pageParamsField = ['current', 'pageSize'],
  ...restProps
}) => {
  const cache = memoryCache.get(cacheKey);
  const innerFormRef = useRef<FormInstance>();
  const formRef = outerFormRef ? outerFormRef : innerFormRef;
  const innerActionRef = useRef<BizTableActionType>();
  const actionRef = outerActionRef ? outerActionRef : innerActionRef;
  const internalRequest: BizTableRequest = async (params, ...args) => {
    memoryCache.set(cacheKey, params);
    return request?.(params, ...args);
  };

  const cacheTransformInfo = useMemo(() => {
    const result: Record<string, { type: string; names: any[]; }> = {};
    columns.forEach((item) => {
      if (typeof item.search === 'object' && Array.isArray(item.search.names)) {
        const type = item.search.itemType || item.search.valueType || item.valueType || '';
        const name = item.search.name || item.search.dataIndex || (item as any).dataIndex;
        result[name] = {
          type,
          names: item.search.names
        };
      }
    });
    return result;
  }, [columns]);

  useEffect(() => {
    const formValues = memoryCache.get(cacheKey);
    if (autoRequest !== false || formValues) {
      if (typeof cacheTransformInfo === 'object' && formValues) {
        Object.keys(cacheTransformInfo).forEach((key) => {
          const { type, names } = cacheTransformInfo[key];
          if (Array.isArray(names) && names.length > 0) {
            formValues[key] = names.map((field) => {
              let val = formValues[field];
              if (dateTypes.includes(type)) {
                val = dayjs(val);
              }
              delete formValues[field];
              return val;
            }).filter(item => item !== null && item !== undefined);
          }
        });
        formRef.current?.setFieldsValue({ ...omit(formValues, pageParamsField) });
      }
      actionRef.current?.submitAndCurrent(formValues?.current || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRequest]);

  return (
    <BizTable
      request={internalRequest}
      autoRequest={false}
      pagination={pagination !== false ? { pageSize: cache?.pageSize, ...pagination } : false}
      formRef={formRef}
      actionRef={actionRef}
      columns={columns}
      {...restProps}
    />
  );
};

export default BizTableWithCache;

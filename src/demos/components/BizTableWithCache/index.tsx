import * as React from 'react';
import type { FormInstance } from 'antd';
import type { BizTableActionType, BizTableProps, BizTableRequest } from 'antd-more';
import { BizTable } from 'antd-more';
import { omit } from 'lodash';
import { useEffect, useRef } from 'react';
import { memoryCache } from './storage';

interface BizTableWithCacheProps extends Omit<BizTableProps, 'formRef'> {
  cacheKey: string;
  cacheTransformNames?: Record<string, [string, string]>;
}

const BizTableWithCache: React.FC<BizTableWithCacheProps> = ({
  cacheKey,
  cacheTransformNames,
  request,
  pagination,
  autoRequest,
  ...restProps
}) => {
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<BizTableActionType>();
  const cache = memoryCache.get(cacheKey);
  const internalRequest: BizTableRequest = async (params, ...args) => {
    memoryCache.set(cacheKey, params);
    return request?.(params, ...args);
  };

  useEffect(() => {
    const formValues = memoryCache.get(cacheKey);
    if (autoRequest !== false || formValues) {
      if (typeof cacheTransformNames === 'object' && formValues) {
        Object.keys(cacheTransformNames).forEach((key) => {
          if (Array.isArray(cacheTransformNames[key]) && cacheTransformNames[key].length > 0) {
            formValues[key] = cacheTransformNames[key].map((field) => {
              const val = formValues[field];
              delete formValues[field];
              return val;
            });
          }
        });
      }
      formRef.current?.setFieldsValue({ ...omit(formValues, ['current', 'pageSize']) });
      actionRef.current?.submitAndCurrent(formValues?.current || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRequest]);

  return (
    <BizTable
      request={internalRequest}
      autoRequest={false}
      pagination={{ pageSize: cache?.pageSize, ...pagination }}
      formRef={formRef}
      actionRef={actionRef}
      {...restProps}
    />
  );
};

export default BizTableWithCache;

import * as React from 'react';
import { Table, Card, Space } from 'antd';
import { TableProps, ColumnType, ColumnGroupType } from 'antd/es/table';
import { SpaceProps } from 'antd/es/space';
import { CardProps } from 'antd/es/card';
import { FormInstance } from 'antd/es/form';
import { ValueType } from '../biz-field/interface';
import { EnumData } from '../dictionary';
import SearchForm, { SearchFormProps } from './SearchForm';
import { QueryFormProps } from '../biz-form/components/QueryForm';
import usePagination from './usePagination';
import BizField from '../biz-field';
import actionCache, { createActionCacheKey } from './actionCache';
import { Request, RecordType, ActionType } from './interface';

export declare type BizColumns = ((ColumnGroupType<any> | ColumnType<any>) & {
  valueType?: ValueType;
  valueEnum?: EnumData;
})[];

export declare interface BizTableInnerProps
  extends TableProps<RecordType>,
    Pick<SearchFormProps, 'formItems'> {
  formRef?:
    | React.MutableRefObject<FormInstance | undefined>
    | ((instance: FormInstance<any>) => void);
  ref?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);
  columns?: BizColumns;
  ready?: boolean;
  autoRequest?: boolean;
  request?: Request;
  form?: QueryFormProps;
  spaceProps?: SpaceProps;
  formCardProps?: CardProps;
  tableCardProps?: CardProps;
  toolbar?: React.ReactNode;
  extra?: React.ReactNode;
}

const BizTableInner: React.FC<BizTableInnerProps> = React.forwardRef(
  (
    {
      formItems,
      formRef,
      form,

      spaceProps,
      formCardProps,
      tableCardProps,

      toolbar,
      extra,

      request,
      ready = true,
      autoRequest = true,

      columns,
      pagination,
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const actionCacheKey = React.useMemo(() => createActionCacheKey(), []);

    const innerFormRef =
      (formRef as React.MutableRefObject<FormInstance | undefined>) ||
      React.useRef<FormInstance | undefined>();

    const { data, loading, run, onTableChange, pagination: paginationRet } = usePagination(
      request,
      {
        autoRun: false,
        defaultPageSize: (pagination && pagination?.pageSize) || 10,
        actionCacheKey,
      },
    );

    const handleChange = React.useCallback((page, filters, sorter, extra) => {
      onTableChange(page, filters, sorter, extra);
      typeof onChange === 'function' && onChange(page, filters, sorter, extra);
    }, []);

    const handleReload = React.useCallback(() => {
      actionCache[actionCacheKey] = 'reload';
      run();
    }, [run]);

    const handleReset = React.useCallback(() => {
      actionCache[actionCacheKey] = 'reset';
      if (formItems) {
        innerFormRef.current.resetFields();
        innerFormRef.current?.submit();
      } else {
        run({}); // 触发修改分页
        actionCache[actionCacheKey] = '';
      }
    }, [run, innerFormRef.current]);

    const handleSubmit = React.useCallback(() => {
      actionCache[actionCacheKey] = 'submit';
      if (formItems) {
        innerFormRef.current?.submit();
      } else {
        run({}); // 触发修改分页
      }
    }, [run, innerFormRef.current]);

    // 默认 onReset 中已经重置表单，这里只需触发请求
    const handleDefaultReset = React.useCallback(() => {
      actionCache[actionCacheKey] = 'reset';
      if (formItems) {
        innerFormRef.current?.submit();
      } else {
        run({}); // 触发修改分页
        actionCache[actionCacheKey] = '';
      }
    }, [run, innerFormRef.current]);

    const handleFinish = React.useCallback(
      (values) => {
        if (actionCache[actionCacheKey] !== 'reset') {
          actionCache[actionCacheKey] = 'submit';
        }
        run(values);
        if (actionCache[actionCacheKey] === 'reset') {
          actionCache[actionCacheKey] = '';
        }
      },
      [run],
    );

    const currentColumns = React.useMemo(
      () =>
        columns.map(({ valueType, valueEnum, ...restItem }) => {
          const newItem = {
            ...restItem,
          };
          if (valueType && !newItem.render) {
            if (valueType === 'index' || valueType === 'indexBorder') {
              newItem.render = (text, record, index) => (
                <BizField value={index} valueType={valueType} valueEnum={valueEnum} />
              );
            } else {
              newItem.render = (text) => (
                <BizField value={text} valueType={valueType} valueEnum={valueEnum} />
              );
            }
          }
          return newItem;
        }),
      [columns],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        reload: handleReload,
        reset: handleReset,
        submit: handleSubmit,
      }),
      [],
    );

    React.useEffect(() => {
      if (ready && autoRequest) {
        if (formItems) {
          innerFormRef.current?.submit();
        } else {
          run();
        }
      }
    }, [ready]);

    // 删除缓存 action
    React.useEffect(() => {
      return () => {
        delete actionCache[actionCacheKey];
      };
    }, []);

    const tableCardStyle = React.useMemo(
      () => ({ padding: !formItems && !toolbar ? 0 : '16px 24px 0' }),
      [formItems, toolbar],
    );

    return (
      <Space
        direction="vertical"
        size={16}
        {...spaceProps}
        style={{ display: 'flex', width: '100%', ...spaceProps?.style }}
      >
        <SearchForm
          formItems={formItems}
          ref={innerFormRef}
          loading={loading}
          onFinish={handleFinish}
          onReset={handleDefaultReset}
          ready={ready}
          cardProps={formCardProps}
          {...form}
        />
        {extra}
        <Card
          bordered={false}
          {...tableCardProps}
          bodyStyle={{ ...tableCardStyle, ...tableCardProps?.bodyStyle }}
        >
          {toolbar && <div style={{ padding: '0 0 16px' }}>{toolbar}</div>}
          <Table
            loading={loading}
            columns={currentColumns}
            dataSource={data}
            pagination={
              typeof pagination !== 'boolean' || pagination
                ? { ...paginationRet, ...pagination }
                : false
            }
            onChange={handleChange}
            {...restProps}
          />
        </Card>
      </Space>
    );
  },
);

export interface BizTableProps extends Omit<BizTableInnerProps, 'ref'> {
  actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);
}

const BizTable: React.FC<BizTableProps> = ({ actionRef, ...restProps }) => {
  const innerActionRef =
    (actionRef as React.MutableRefObject<ActionType | undefined>) ||
    React.useRef<ActionType | undefined>();

  return <BizTableInner {...restProps} ref={innerActionRef} />;
};

export default BizTable;

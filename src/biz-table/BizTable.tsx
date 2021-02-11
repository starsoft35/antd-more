import * as React from 'react';
import { Table, Card, Space } from 'antd';
import { TableProps } from 'antd/es/table';
import { SpaceProps } from 'antd/es/space';
import { CardProps } from 'antd/es/card';
import { FormInstance } from 'antd/es/form';
import classnames from 'classnames';
import SearchForm, { SearchFormProps } from './SearchForm';
import { QueryFormProps } from '../biz-form';
import usePagination from './usePagination';
import BizField from '../biz-field';
import WithTooltip from '../biz-descriptions/WithTooltip';
import actionCache, { createActionCacheKey } from './_util/actionCache';
import { BizTableRequest, ActionType, BizColumnType } from './interface';

const prefixCls = 'antd-more-table';

export declare interface BizTableProps<RecordType = any>
  extends Omit<TableProps<RecordType>, 'columns'>,
    Pick<SearchFormProps, 'formItems'> {
  formRef?:
    | React.MutableRefObject<FormInstance | undefined>
    | ((instance: FormInstance<any>) => void);
  actionRef?: React.MutableRefObject<ActionType | undefined> | ((actionRef: ActionType) => void);
  columns?: BizColumnType<RecordType>;
  ready?: boolean;
  autoRequest?: boolean;
  nowrap?: boolean;
  request?: BizTableRequest<RecordType>;
  form?: QueryFormProps;
  spaceProps?: SpaceProps;
  formCardProps?: CardProps;
  tableCardProps?: CardProps;
  toolbar?: React.ReactNode;
  extra?: React.ReactNode;
}

function BizTable<RecordType extends object = any>(props: BizTableProps<RecordType>) {
  const {
    formItems,
    formRef,
    form,

    spaceProps,
    formCardProps,
    tableCardProps,

    toolbar,
    extra,
    actionRef,

    request,
    ready = true,
    autoRequest = true,
    nowrap = true,

    columns,
    pagination,
    onChange,
    ...restProps
  } = props;

  const actionCacheKey = React.useMemo(() => createActionCacheKey(), []);

  const innerFormRef =
    (formRef as React.MutableRefObject<FormInstance | undefined>) ||
    React.useRef<FormInstance | undefined>();

  const searchItems = React.useMemo(() => {
    if (!Array.isArray(columns) || columns.length <= 0) {
      return [];
    }

    const ret = [];

    columns.forEach((item) => {
      const { dataIndex, title, valueType, valueEnum, order, search } = item;
      if (search) {
        ret.push({
          dataIndex,
          title,
          valueType,
          valueEnum,
          order,
          search,
          originItem: item,
        });
      }
    });

    return ret;
  }, [columns]);

  const hasSearch = React.useMemo(() => {
    return (
      (Array.isArray(searchItems) && searchItems.length > 0) ||
      (Array.isArray(formItems) && formItems.length > 0)
    );
  }, [searchItems, formItems]);

  const currentColumns = React.useMemo(() => {
    if (!Array.isArray(columns) || columns.length <= 0) {
      return [];
    }

    return columns
      .map(
        ({
          valueType,
          valueEnum,
          tooltip,
          title,
          className,
          nowrap: cellNowrap,
          search,
          order,
          ...restItem
        }) => {
          const newItem = {
            title: title && tooltip ? <WithTooltip label={title} tooltip={tooltip} /> : title,
            className: classnames(
              { [`${prefixCls}-cell-wrap`]: nowrap && cellNowrap === false },
              className,
            ),
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
        },
      )
      .filter((columnItem) => columnItem.table !== false);
  }, [columns]);

  const innerActionRef = React.useRef<ActionType | undefined>();

  const { data, loading, run, onTableChange, pagination: pageRet } = usePagination<RecordType>(
    request,
    {
      autoRun: false,
      defaultPageSize: (pagination && pagination?.pageSize) || 10,
      actionCacheKey,
    },
  );

  const handleChange = React.useCallback((page, filters, sorter, extraInfo) => {
    onTableChange(page, filters, sorter, extraInfo);
    typeof onChange === 'function' && onChange(page, filters, sorter, extraInfo);
  }, []);

  const handleReload = React.useCallback(() => {
    actionCache[actionCacheKey] = 'reload';
    run();
  }, [run]);

  const handleReset = React.useCallback(() => {
    actionCache[actionCacheKey] = 'reset';
    if (hasSearch) {
      innerFormRef.current?.resetFields();
      Promise.resolve().then(() => {
        innerFormRef.current?.submit();
      });
    } else {
      run({}); // 触发修改分页
      actionCache[actionCacheKey] = '';
    }
  }, [run, innerFormRef.current, hasSearch]);

  const handleSubmit = React.useCallback(() => {
    actionCache[actionCacheKey] = 'submit';
    if (hasSearch) {
      innerFormRef.current?.submit();
    } else {
      run({}); // 触发修改分页
    }
  }, [run, innerFormRef.current, hasSearch]);

  // 默认 onReset 中已经重置表单，这里只需触发请求
  const handleDefaultReset = React.useCallback(() => {
    actionCache[actionCacheKey] = 'reset';
    if (hasSearch) {
      innerFormRef.current?.submit();
    } else {
      run({}); // 触发修改分页
      actionCache[actionCacheKey] = '';
    }
  }, [run, innerFormRef.current, hasSearch]);

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

  React.useImperativeHandle(actionRef || innerActionRef, () => ({
    reload: handleReload,
    reset: handleReset,
    submit: handleSubmit,
  }));

  React.useEffect(() => {
    if (ready && autoRequest) {
      if (hasSearch) {
        Promise.resolve().then(() => {
          innerFormRef.current?.submit();
        });
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
    () => ({ padding: !hasSearch && !toolbar ? 0 : '16px 24px 0' }),
    [hasSearch, toolbar],
  );

  return (
    <Space
      direction="vertical"
      size={16}
      {...spaceProps}
      className={classnames(prefixCls, { [`${prefixCls}-nowrap`]: nowrap }, spaceProps?.className)}
      style={{ display: 'flex', width: '100%', ...spaceProps?.style }}
    >
      <SearchForm
        formItems={formItems}
        searchItems={searchItems}
        ref={innerFormRef}
        loading={loading}
        onFinish={handleFinish}
        onReset={handleDefaultReset}
        cardProps={formCardProps}
        ready={ready}
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
          pagination={pagination !== false ? { ...pageRet, ...pagination } : false}
          onChange={handleChange}
          {...restProps}
          scroll={{ ...(nowrap ? { x: true } : {}), ...restProps?.scroll }}
        />
      </Card>
    </Space>
  );
}

export default BizTable;

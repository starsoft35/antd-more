import * as React from 'react';
import { Table, Card, Space } from 'antd';
import { TableProps } from 'antd/es/table';
import { SpaceProps } from 'antd/es/space';
import { CardProps } from 'antd/es/card';
import { FormInstance } from 'antd/es/form';
import classnames from 'classnames';
import { useUpdateEffect } from 'rc-hooks';
import SearchForm, { SearchFormProps } from './SearchForm';
import { QueryFormProps } from '../biz-form';
import usePagination from './usePagination';
import BizField from '../biz-field';
import WithTooltip from '../biz-descriptions/WithTooltip';
import actionCache, { createActionCacheKey } from './_util/actionCache';
import { BizTableRequest, ActionType, BizColumnType } from './interface';
import { createFormItem } from './_util/createFormItems';
import getRowKey from './_util/getRowKey';

const prefixCls = 'antd-more-table';

export declare interface BizTableProps<RecordType = any>
  extends Omit<TableProps<RecordType>, 'columns'>,
    Pick<SearchFormProps, 'formItems'> {
  formRef?: React.MutableRefObject<FormInstance | undefined>;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
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
  tableRender?: (
    props: BizTableProps<RecordType>,
    dom: JSX.Element,
  ) => JSX.Element | React.ReactNode;

  // 以下供 EditableBizTable 使用
  editableKeys?: (string | number)[];
  editableForm?: FormInstance;
  editableKeyMapRef?: React.MutableRefObject<object>;
  onDataSourceChange?: (newData: RecordType[]) => void;
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
    tableRender,

    request,
    ready = true,
    autoRequest = true,
    nowrap = true,
    editableKeys = [],
    editableForm,
    editableKeyMapRef,
    onDataSourceChange,

    rowKey,
    columns,
    pagination,
    onChange,
    ...restProps
  } = props;

  const actionCacheKey = React.useMemo(() => createActionCacheKey(), []);
  const editableKeyMap = React.useRef({}); // 可编辑项的namePath映射

  const innerFormRef =
    (formRef as React.MutableRefObject<FormInstance | undefined>) ||
    React.useRef<FormInstance | undefined>();

  const { searchItems, columns: currentColumns } = React.useMemo(() => {
    const ret = {
      searchItems: [],
      columns: [],
    };

    editableKeyMap.current = {}; // 重置

    if (!Array.isArray(columns) || columns.length <= 0) {
      return ret;
    }

    function processColumns(columnConfig) {
      return columnConfig
        .filter((item) => !!item)
        .map((item) => {
          const {
            dataIndex,
            valueType,
            valueEnum,
            tooltip,
            title,
            className,
            nowrap: cellNowrap,
            field,
            search,
            editable,
            order,
            render,
            ...restItem
          } = item;

          // 处理查询表单
          if (search) {
            ret.searchItems.push({
              dataIndex,
              title,
              valueType,
              valueEnum,
              order,
              search,
              originItem: item,
            });
          }

          // 处理列数据
          const newItem = {
            dataIndex,
            title: title && tooltip ? <WithTooltip label={title} tooltip={tooltip} /> : title,
            className: classnames(
              { [`${prefixCls}-cell-wrap`]: nowrap && cellNowrap === false },
              className,
            ),
            ...restItem,
          };

          if (Array.isArray(newItem.children) && newItem.children.length > 0) {
            newItem.children = processColumns(newItem.children);
          } else {
            newItem.render = (text, record, index) => {
              const currentRowKey = getRowKey(rowKey)(record, index);
              const realEditable =
                typeof editable === 'function' ? editable(text, record, index) : editable;
              const enabledEdit = realEditable !== false;

              const currentNamePath = [
                currentRowKey,
                ...(Array.isArray(dataIndex) ? dataIndex : [dataIndex]),
              ];

              // 缓存namePath
              if (enabledEdit && dataIndex) {
                if (!editableKeyMap.current[currentRowKey]) {
                  editableKeyMap.current[currentRowKey] = {
                    nameList: [],
                    dataIndexs: [],
                    record,
                    index,
                    rowKey: currentRowKey,
                  };
                }

                if (!editableKeyMap.current[currentRowKey].dataIndexs.includes(dataIndex)) {
                  editableKeyMap.current[currentRowKey].dataIndexs.push(dataIndex);
                  editableKeyMap.current[currentRowKey].nameList.push(currentNamePath);
                }
              }

              // 编辑状态
              if (
                enabledEdit &&
                dataIndex &&
                editableKeys.length > 0 &&
                editableKeys.indexOf(currentRowKey) > -1
              ) {
                return createFormItem(
                  {
                    dataIndex: currentNamePath,
                    title,
                    valueType,
                    valueEnum,
                    search: {
                      initialValue: text,
                      ...(typeof realEditable === 'object' ? realEditable : {}),
                      style: { marginTop: -5, marginBottom: -5, ...realEditable?.style },
                    },
                    originItem: item,
                  },
                  editableForm,
                );
              }

              // 展示状态
              if (typeof render === 'function') {
                return render(text, record, index);
              }

              const retValue = valueType === 'index' || valueType === 'indexBorder' ? index : text;
              const fieldProps = typeof field === 'function' ? field(text, record, index) : field;
              return (
                <BizField
                  value={retValue}
                  valueType={valueType}
                  valueEnum={valueEnum}
                  {...fieldProps}
                />
              );
            };
          }

          return newItem;
        })
        .filter((columnItem) => columnItem.table !== false);
    }
    ret.columns = processColumns(columns);
    return ret;
  }, [rowKey, columns, editableKeys.join(','), editableForm]);

  React.useImperativeHandle(editableKeyMapRef, () => editableKeyMap.current);

  const hasSearch = React.useMemo(() => {
    return (
      (Array.isArray(searchItems) && searchItems.length > 0) ||
      (Array.isArray(formItems) && formItems.length > 0)
    );
  }, [searchItems, formItems]);

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

  React.useImperativeHandle(actionRef, () => ({
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

  useUpdateEffect(() => {
    onDataSourceChange?.(data);
  }, [data]);

  const tableCardStyle = React.useMemo(
    () => ({ padding: !hasSearch && !extra ? 0 : '16px 24px 0' }),
    [hasSearch, extra],
  );

  const tableDom = (
    <Card
      bordered={false}
      {...tableCardProps}
      bodyStyle={{ ...tableCardStyle, ...tableCardProps?.bodyStyle }}
    >
      {toolbar && <div style={{ padding: '0 0 16px' }}>{toolbar}</div>}
      <Table
        loading={loading}
        rowKey={rowKey}
        columns={currentColumns}
        dataSource={data}
        pagination={pagination !== false ? { ...pageRet, ...pagination } : false}
        onChange={handleChange}
        {...restProps}
        scroll={{ ...(nowrap ? { x: true } : {}), ...restProps?.scroll }}
      />
    </Card>
  );

  const renderTable = () => (tableRender ? tableRender(props, tableDom) : tableDom);

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
      {renderTable()}
    </Space>
  );
}

export default BizTable;

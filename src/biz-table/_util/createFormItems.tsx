import * as React from 'react';
import { FormInstance } from 'antd/es/form';
import BizForm from '../../biz-form';
import { BizFormItemProps } from '../../biz-form/components/Item';
import { SearchProps } from '../interface';
import parseValueType from '../../biz-field/_util/parseValueType';
import { DateFormat } from '../../biz-field/_util/dateUtil';
import { ItemTypes, ValueTypeToItemType, DatePickerMap } from './constants';

function compare(a, b) {
  const o1 = a.order || 0;
  const o2 = b.order || 0;
  if (o1 > o2) {
    return 1;
  } else if (o1 < o2) {
    return -1;
  } else {
    return 0;
  }
}

export function createFormItem({ search, ...restProps }: SearchProps, form: FormInstance) {
  let options = restProps;

  if (typeof search === 'object') {
    options = {
      ...options,
      ...search,
    };
  }

  const {
    render,
    itemType,
    valueType,
    valueEnum,
    label,
    name,
    title,
    dataIndex,
    originItem,
    ...restOptions
  } = options;

  let type: string = '';

  if (itemType) {
    type = itemType;
  } else if (valueType) {
    type = parseValueType(valueType).type; // eslint-disable-line prefer-destructuring
  }

  const formItemType = ValueTypeToItemType[type]
    ? ItemTypes[ValueTypeToItemType[type]]
    : ItemTypes[type] || 'ItemInput';
  const pickerProps = DatePickerMap[type] ? { picker: DatePickerMap[type] } : {};
  const formatProps = DateFormat[type] ? { format: DateFormat[type] } : {};
  const showTimeProps = type === 'dateTime' || type === 'dateTimeRange' ? { showTime: true } : {};

  const Comp: React.FC<BizFormItemProps & Record<number | string, any>> = BizForm[formItemType];

  const dom = (
    <Comp
      label={label || title}
      name={name || dataIndex}
      options={valueEnum}
      {...showTimeProps}
      {...formatProps}
      {...pickerProps}
      {...restOptions}
    />
  );

  if (typeof render === 'function') {
    return render(originItem, dom, form);
  }

  return dom;
}

function createFormItems(options: SearchProps[], form: FormInstance) {
  if (!Array.isArray(options) || options.length <= 0) {
    return null;
  }

  return options
    .sort(compare)
    .map(({ order, ...restItem }, index) =>
      createFormItem(
        { key: restItem.dataIndex || restItem.name || index.toString(), ...restItem },
        form,
      ),
    );
}

export default createFormItems;

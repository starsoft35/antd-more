import * as React from 'react';
import { Select } from 'antd';
import type { SelectProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import FieldContext from '../FieldContext';
import getLabel from '../_util/getLabel';

export interface BizFormItemSelectProps<ValueType = any> extends BizFormItemProps, Pick<SelectProps<ValueType>, 'allowClear' | 'placeholder' | 'options' | 'fieldNames' | 'filterOption'> {
  all?: boolean;
  allValue?: any;
  allLabel?: React.ReactNode;
  excludeValues?: ((options: Required<SelectProps<ValueType>>['options']) => any[]) | any[];
  selectProps?: SelectProps<ValueType>;
}

const BizFormItemSelect: React.FC<BizFormItemSelectProps> = ({
  placeholder = "请选择",
  allowClear = false,
  fieldNames,
  filterOption = true,

  all = false,
  allValue = '',
  allLabel = '全部',
  excludeValues = [],
  options: outOptions = [],
  selectProps = {},
  required = false,
  ...restProps
}) => {
  const { getPopupContainer } = React.useContext(FieldContext);
  const options = React.useMemo(
    () => selectProps.options || outOptions,
    [outOptions, selectProps.options]
  );
  const opts = useFilterOptions<BizFormItemSelectProps['options']>({
    options,
    excludeValues,
    all,
    allValue,
    allName: allLabel,
    fieldNames: selectProps?.fieldNames
  });

  const { value: valueKey } = React.useMemo(
    () => ({
      value: 'value',
      ...selectProps?.fieldNames
    }),
    [selectProps?.fieldNames]
  );

  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            const hasOptValue = options.find((item) => item[valueKey] === value);
            if (
              (!value && !hasOptValue && !(all && allValue === value)) ||
              ((selectProps?.mode === 'multiple' || selectProps?.mode === 'tags') && value && value.length <= 0)
            ) {
              errMsg = required ? `请选择${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      {...restProps}
    >
      <Select
        placeholder={placeholder}
        allowClear={allowClear}
        fieldNames={fieldNames}
        filterOption={filterOption}
        getPopupContainer={getPopupContainer}
        {...selectProps}
        options={opts}
      />
    </BizFormItem>
  );
};

export default BizFormItemSelect;

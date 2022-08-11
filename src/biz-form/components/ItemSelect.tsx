import * as React from 'react';
import { Select } from 'antd';
import type { SelectProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import FieldContext from '../FieldContext';
import getLabel from '../_util/getLabel';

export interface BizFormItemSelectProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  allLabel?: React.ReactNode;
  excludeValues?: ((options: Required<SelectProps<any>>['options']) => any[]) | any[];
  options?: SelectProps<any>['options'];
  selectProps?: SelectProps<any>;
}

const BizFormItemSelect: React.FC<BizFormItemSelectProps> = ({
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
        placeholder="请选择"
        getPopupContainer={getPopupContainer}
        {...selectProps}
        options={opts}
      />
    </BizFormItem>
  );
};

export default BizFormItemSelect;

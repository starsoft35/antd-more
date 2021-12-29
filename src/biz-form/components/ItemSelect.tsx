import * as React from 'react';
import { Select } from 'antd';
import type { SelectProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export interface FormItemSelectProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  /**
   * @deprecated Please use 'allLabel'
   */
  allName?: string;
  allLabel?: string;
  excludeValues?: any[];
  options?: SelectProps<any>['options'];
  selectProps?: SelectProps<any>;
}

const FormItemSelect: React.FC<FormItemSelectProps> = ({
  all = false,
  allValue = '',
  allName,
  allLabel = '全部',
  excludeValues = [],
  options = [],
  selectProps = {},
  required = false,
  ...restProps
}) => {
  const opts = useFilterOptions<FormItemSelectProps['options']>({
    options,
    excludeValues,
    all,
    allValue,
    allName: allName || allLabel
  });

  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            const hasOptValue = options.find((item) => item.value === value);
            if (!value && !hasOptValue && !(all && allValue === value)) {
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
      <Select placeholder="请选择" options={opts} {...selectProps} />
    </BizFormItem>
  );
};

export default FormItemSelect;

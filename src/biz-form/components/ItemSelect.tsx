import * as React from 'react';
import { Select } from 'antd';
import type { SelectProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export interface BizFormItemSelectProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  allLabel?: React.ReactNode;
  excludeValues?: any[];
  options?: SelectProps<any>['options'];
  selectProps?: SelectProps<any>;
}

const BizFormItemSelect: React.FC<BizFormItemSelectProps> = ({
  all = false,
  allValue = '',
  allLabel = '全部',
  excludeValues = [],
  options = [],
  selectProps = {},
  required = false,
  ...restProps
}) => {
  const opts = useFilterOptions<BizFormItemSelectProps['options']>({
    options,
    excludeValues,
    all,
    allValue,
    allName: allLabel
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

export default BizFormItemSelect;

import * as React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OptionCoreData, OptionGroupData } from 'rc-select/es/interface';
import useFilterOptions from '../_util/useFilterOptions';
import BizFormItem, { BizFormItemProps } from './Item';

const { Option, OptGroup } = Select;

interface OptionDataExtend extends Omit<OptionCoreData, 'children' | 'title' | 'label'> {
  name: string;
  [x: string]: any;
}

interface OptionGroupDataExtend extends OptionGroupData {
  options: OptionDataExtend[];
}

type OptionType = (OptionDataExtend | OptionGroupDataExtend)[];

export interface FormItemSelectProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  allName?: string;
  excludeValues?: any[];
  options?: OptionType;
  selectProps?: SelectProps<any>;
}

const FormItemSelect: React.FC<FormItemSelectProps> = ({
  all = false,
  allValue = '',
  allName = '全部',
  excludeValues = [],
  options = [],
  selectProps = {},
  label,
  required = false,
  ...restProps
}) => {
  const opts = useFilterOptions({ options, excludeValues, all, allValue, allName });

  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            const hasOptValue = options.find((item) => item.value === value);
            if (!value && !hasOptValue && !(all && allValue === value)) {
              errMsg = required ? `请选择${label}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      {...restProps}
    >
      <Select
        placeholder="请选择"
        // allowClear={!required && !all}
        {...selectProps}
      >
        {opts.map(({ options: itemOpts, ...restOpts }: OptionGroupDataExtend) => {
          if (itemOpts) {
            return (
              <OptGroup key={restOpts.key || restOpts.label || restOpts.value} {...restOpts}>
                {itemOpts.map(({ name, label, ...restSubOpts }: OptionDataExtend) => (
                  <Option key={restSubOpts.key || restSubOpts.value || name} {...restSubOpts}>
                    {name}
                  </Option>
                ))}
              </OptGroup>
            );
          } else {
            const { name, label, ...rest } = restOpts as OptionDataExtend;
            return (
              <Option key={rest.key || rest.value || name} {...rest}>
                {name}
              </Option>
            );
          }
        })}
      </Select>
    </BizFormItem>
  );
};

export default FormItemSelect;

import * as React from 'react';
import { Form, Select } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { SelectProps } from 'antd/es/select';
import { OptionCoreData, OptionGroupData } from 'rc-select/es/interface';
import getLabel from '../_util/getLabel';

const { Option, OptGroup } = Select;

interface OptionDataExtend extends Omit<OptionCoreData, 'children'> {
  name?: string;
  [x: string]: any;
}

interface OptionGroupDataExtend extends OptionGroupData {
  options: OptionDataExtend[];
}

type OptionType = (OptionDataExtend | OptionGroupDataExtend)[];

export interface FormItemSelectProps extends FormItemProps {
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
  const labelText = React.useMemo(() => getLabel(label), [label]);
  const opts = React.useMemo(() => {
    const ret = [...options];
    if (all) {
      ret.unshift({ value: allValue, name: allName });
    }
    if (excludeValues && excludeValues.length > 0) {
      return ret.filter((item) => {
        const { options: itemOpts, ...restOpts } = item as OptionGroupDataExtend;
        if (itemOpts) {
          const subOpts = itemOpts.filter((subItem: OptionDataExtend) => excludeValues.indexOf(subItem.value) === -1);
          (item as OptionGroupDataExtend).options = subOpts;
          return subOpts.length > 0;
        } else {
          // eslint-disabled-next-line
          const { value } = restOpts as OptionDataExtend;
          return excludeValues.indexOf(value) === -1;
        }
      });
    }
    return ret;
  }, [options, excludeValues, all, allValue, allName]);

  return (
    <Form.Item
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${labelText}` : '';
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
        {
          opts.map(({ options: itemOpts, ...restOpts }: OptionGroupDataExtend) => {
            if (itemOpts) {
              return (
                <OptGroup key={restOpts.key || restOpts.label || restOpts.title || restOpts.value} {...restOpts}>
                  {
                    itemOpts.map(({ title, name, label, ...restSubOpts }: OptionDataExtend) => (
                      <Option key={restSubOpts.key || restSubOpts.value || title || name} {...restSubOpts}>{title || name || label}</Option>
                    ))
                  }
                </OptGroup>
              )
            } else {
              const { title, name, label, ...rest } = restOpts as OptionDataExtend;
              return <Option key={rest.key || rest.value || title || name} {...rest}>{title || name || label}</Option>
            }
          })
        }
      </Select>
    </Form.Item>
  );
};

export default FormItemSelect;

import * as React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps, CheckboxGroupProps } from 'antd/es/checkbox';
import { CheckboxOptionType } from 'antd/es/checkbox/Group';
import useFilterOptions from '../_util/useFilterOptions';
import BizFormItem, { BizFormItemProps } from './Item';

export interface CheckboxWrapperProps {
  value?: any;
  onChange?: (checkValue: any) => void;
  all?: boolean;
  allName?: string;
  excludeValues?: any[];
  options?: OptionData[];
  checkboxProps?: CheckboxProps;
  checkboxGroupProps?: CheckboxGroupProps;
}

const CheckboxWrapper: React.FC<CheckboxWrapperProps> = ({
  value,
  onChange = () => {},
  all = false,
  allName = '全部',
  excludeValues = [],
  options = [],
  checkboxProps = {},
  checkboxGroupProps = {},
}) => {
  const opts = useFilterOptions({ options, excludeValues, all: false, allName });

  const [indeterminate, setIndeterminate] = React.useState(
    () => !!value && !!value.length && value.length < opts.length,
  );
  const [checkAll, setCheckAll] = React.useState(() => !!value && value.length === opts.length);

  const onChangeValue = (list) => {
    onChange(list);
    setIndeterminate(!!list.length && list.length < opts.length);
    setCheckAll(list.length === opts.length);
  };

  const onCheckAllChange = (e) => {
    onChange(e.target.checked ? opts.map((item) => item.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const allDom = all ? (
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      {allName}
    </Checkbox>
  ) : null;

  return (
    <>
      {allDom}
      <Checkbox.Group {...checkboxGroupProps} value={value} onChange={onChangeValue}>
        {opts.map(({ value: internalValue, name, ...restOpts }, index) => (
          <Checkbox
            {...checkboxProps}
            key={internalValue + index.toString()}
            value={internalValue}
            {...restOpts}
          >
            {name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </>
  );
};

interface OptionData extends Omit<CheckboxOptionType, 'label'> {
  name: string;
  [x: string]: any;
}

export interface FormItemCheckboxProps extends BizFormItemProps, CheckboxWrapperProps {}

const FormItemCheckbox: React.FC<FormItemCheckboxProps> = ({
  all = false,
  allName = '全部',
  excludeValues = [],
  options = [],
  checkboxProps = {},
  checkboxGroupProps = {},
  label,
  required = false,
  ...restProps
}) => {
  const checkboxWrapperProps = React.useMemo(
    () => ({ all, allName, excludeValues, options, checkboxProps, checkboxGroupProps }),
    [all, allName, excludeValues, options, checkboxProps, checkboxGroupProps],
  );

  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value || (Array.isArray(value) && value.length === 0)) {
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
      <CheckboxWrapper {...checkboxWrapperProps} />
    </BizFormItem>
  );
};

export default FormItemCheckbox;

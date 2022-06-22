import * as React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxOptionType, CheckboxGroupProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export interface CheckboxWrapperProps {
  value?: any;
  onChange?: (checkValue: any) => void;
  all?: boolean;
  allLabel?: React.ReactNode;
  excludeValues?: ((options: CheckboxOptionType[]) => any[]) | any[];
  options?: CheckboxOptionType[];
  checkboxGroupProps?: Omit<CheckboxGroupProps, 'options'> & { options?: CheckboxOptionType[] };
}

const CheckboxWrapper: React.FC<CheckboxWrapperProps> = ({
  value,
  onChange,
  all = false,
  allLabel = '全部',
  excludeValues = [],
  options: outOptions = [],
  checkboxGroupProps = {}
}) => {
  const options = React.useMemo(
    () => checkboxGroupProps.options || outOptions,
    [checkboxGroupProps.options, outOptions]
  );
  const opts = useFilterOptions<CheckboxOptionType[]>({
    options,
    excludeValues,
    all: false
  });

  const [indeterminate, setIndeterminate] = React.useState(
    () => !!value && !!value.length && value.length < opts.length
  );
  const [checkAll, setCheckAll] = React.useState(() => !!value && value.length === opts.length);

  const onChangeValue = (list) => {
    onChange?.(list);
    setIndeterminate(!!list.length && list.length < opts.length);
    setCheckAll(list.length === opts.length);
  };

  const onCheckAllChange = (e) => {
    onChange?.(e.target.checked ? opts.map((item) => item.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const allDom = all ? (
    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      {allLabel}
    </Checkbox>
  ) : null;

  return (
    <>
      {allDom}
      <Checkbox.Group
        value={value}
        onChange={onChangeValue}
        {...checkboxGroupProps}
        options={opts}
      />
    </>
  );
};

export interface BizFormItemCheckboxProps extends BizFormItemProps, CheckboxWrapperProps {}

const BizFormItemCheckbox: React.FC<BizFormItemCheckboxProps> = ({
  all = false,
  allLabel = '全部',
  excludeValues = [],
  options = [],
  checkboxGroupProps = {},
  required = false,
  ...restProps
}) => {
  const checkboxWrapperProps = React.useMemo(
    () => ({ all, allName: allLabel, excludeValues, options, checkboxGroupProps }),
    [all, allLabel, excludeValues, options, checkboxGroupProps]
  );

  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value || (Array.isArray(value) && value.length === 0)) {
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
      <CheckboxWrapper {...checkboxWrapperProps} />
    </BizFormItem>
  );
};

export default BizFormItemCheckbox;

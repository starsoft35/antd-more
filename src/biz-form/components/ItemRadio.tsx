import * as React from 'react';
import { Radio } from 'antd';
import type { CheckboxOptionType, RadioGroupProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import BizFormItem from './Item';
import type { BizFormItemProps } from './Item';
import getLabel from '../_util/getLabel';

export interface FormItemRadioProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  /**
   * @deprecated Please use 'allLabel'
   */
  allName?: string;
  allLabel?: string;
  excludeValues?: any[];
  options?: CheckboxOptionType[];
  optionType?: RadioGroupProps['optionType'];
  radioGroupProps?: RadioGroupProps;
}

const FormItemRadio: React.FC<FormItemRadioProps> = ({
  all = false,
  allValue = '',
  allName,
  allLabel = '全部',
  excludeValues = [],
  options = [],
  optionType = 'default',
  radioGroupProps = {},
  required = false,
  ...restProps
}) => {
  const opts = useFilterOptions<FormItemRadioProps['options']>({
    options,
    excludeValues,
    all,
    allValue,
    allName: allName || allLabel,
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
          },
        },
      ]}
      {...restProps}
    >
      <Radio.Group optionType={optionType} options={opts} {...radioGroupProps} />
    </BizFormItem>
  );
};

export default FormItemRadio;

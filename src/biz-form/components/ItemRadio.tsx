import * as React from 'react';
import { Radio } from 'antd';
import type { CheckboxOptionType, RadioGroupProps } from './antd.interface';
import useFilterOptions from '../_util/useFilterOptions';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export interface BizFormItemRadioProps extends BizFormItemProps {
  all?: boolean;
  allValue?: any;
  allLabel?: React.ReactNode;
  excludeValues?: any[];
  options?: CheckboxOptionType[];
  optionType?: RadioGroupProps['optionType'];
  radioGroupProps?: RadioGroupProps;
}

const BizFormItemRadio: React.FC<BizFormItemRadioProps> = ({
  all = false,
  allValue = '',
  allLabel = '全部',
  excludeValues = [],
  options = [],
  optionType = 'default',
  radioGroupProps = {},
  required = false,
  ...restProps
}) => {
  const opts = useFilterOptions<BizFormItemRadioProps['options']>({
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
      <Radio.Group optionType={optionType} options={opts} {...radioGroupProps} />
    </BizFormItem>
  );
};

export default BizFormItemRadio;

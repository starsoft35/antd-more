import * as React from 'react';
import type { BizFormItemProps } from 'antd-more';
import { BizFormItem } from 'antd-more';
import type { WrapperDateRangeProps } from './WrapperDateRange';
import WrapperDateRange from './WrapperDateRange';

export interface ItemDateRangeDefineProps extends BizFormItemProps, Pick<WrapperDateRangeProps, 'longTermValue' | 'longTermLabel' | 'format'> { }

const ItemDateRangeDefine: React.FC<ItemDateRangeDefineProps> = ({
  longTermValue,
  longTermLabel,
  format,

  label,
  name,
  required,
  ...restProps
}) => {
  return (
    <BizFormItem
      label={label}
      name={name}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (required && (!Array.isArray(value) || value.length !== 2 || value[0] === void 0 || value[1] === void 0)) {
              errMsg = `请选择${label}`;
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
      <WrapperDateRange format={format} longTermValue={longTermValue} longTermLabel={longTermLabel} />
    </BizFormItem>
  );
};

export default ItemDateRangeDefine;

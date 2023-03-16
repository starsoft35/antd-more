import * as React from 'react';
import type { BizFormItemProps } from 'antd-more';
import { BizFormItem } from 'antd-more';
import type { InputNumberFeeProps } from './InputNumberFee';
import InputNumberFee from './InputNumberFee';
import isValidNumber from '../../../utils/isValidNumber';

interface ItemInputNumberFeeProps
  extends BizFormItemProps,
  Pick<InputNumberFeeProps, 'beforeValue' | 'forceRenderInitialValue'> {
  inputProps?: InputNumberFeeProps;
  gte?: number;
  lte?: number;
}

const ItemInputNumberFee: React.FC<ItemInputNumberFeeProps> = ({
  beforeValue,
  forceRenderInitialValue,
  lte,
  gte,
  inputProps,
  label,
  messageVariables,
  required,
  ...restProps
}) => {
  return (
    <BizFormItem
      required={required}
      label={label}
      messageVariables={messageVariables}
      validateFirst
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!isValidNumber(value)) {
              errMsg = required ? `请输入${messageVariables?.label || label}` : '';
            } else if (isValidNumber(gte) && value < gte) {
              errMsg = `不能小于${gte}`;
            } else if (isValidNumber(lte) && value > lte) {
              errMsg = `不能大于${lte}`;
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
      <InputNumberFee
        beforeValue={beforeValue}
        forceRenderInitialValue={forceRenderInitialValue}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default ItemInputNumberFee;

import * as React from 'react';
import { Input } from 'antd';
import { isIdCard } from 'util-helpers';
import { InputProps } from 'antd/es/input';
import BizFormItem, { BizFormItemProps } from './Item';
import { normalizeIdCard } from '../_util/normalize';

export interface FormItemIdCardProps extends BizFormItemProps {
  security?: boolean; // 脱敏。 为 true 时，必须传入 initialValue
  symbol?: string; // 脱敏符号
  inputProps?: InputProps;
}

const FormItemIdCard: React.FC<FormItemIdCardProps> = ({
  security = false,
  symbol = '*',
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  const handleNormalize = React.useCallback(
    (val: string | undefined) => {
      return normalizeIdCard(val, { symbol: security ? symbol : '' });
    },
    [security, symbol],
  );

  return (
    <BizFormItem
      label={label}
      normalize={handleNormalize}
      validateTrigger="onBlur"
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${label}` : '';
            } else if (security && restProps && restProps.initialValue === value) {
              // 脱敏校验
              errMsg = '';
            } else if (!isIdCard(value)) {
              errMsg = `请输入正确的${label}`;
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
      <Input placeholder="请输入" maxLength={18} allowClear autoComplete="off" {...inputProps} />
    </BizFormItem>
  );
};

export default FormItemIdCard;

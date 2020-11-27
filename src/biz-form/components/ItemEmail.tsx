import * as React from 'react';
import { Input } from 'antd';
import { isEmail } from 'util-helpers';
import { InputProps } from 'antd/es/input';
import BizFormItem, { BizFormItemProps } from './Item';
import { normalizeWhiteSpace } from '../_util/normalize';

export interface FormItemEmailProps extends BizFormItemProps {
  security?: boolean; // 脱敏。 为 true 时，必须传入 initialValue
  symbol?: string; // 脱敏符号
  inputProps?: InputProps;
}

const FormItemEmail: React.FC<FormItemEmailProps> = ({
  security = false,
  symbol = '*',
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  return (
    <BizFormItem
      label={label}
      normalize={normalizeWhiteSpace}
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
            } else if (!isEmail(value)) {
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
      <Input placeholder="请输入" allowClear autoComplete="off" {...inputProps} />
    </BizFormItem>
  );
};

export default FormItemEmail;

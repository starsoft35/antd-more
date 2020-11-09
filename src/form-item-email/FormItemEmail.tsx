import * as React from 'react';
import { Form, Input } from 'antd';
import { isEmail } from 'util-helpers';
import { FormItemProps } from 'antd/es/form';
import { InputProps } from 'antd/es/input';

export interface FormItemEmailProps extends FormItemProps {
  security?: boolean; // 脱敏。 为 true 时，必须传入 initialValue
  symbol?: string; // 脱敏符号
  inputProps?: InputProps;
}

const FormItemEmail: React.FC<FormItemEmailProps> = ({
  security = false,
  symbol = '*',
  inputProps = {},
  label = '邮箱',
  name = 'email',
  validateTrigger = 'onBlur',
  required = false,
  ...restProps
}) => {
  const handleNormalize = React.useCallback(
    (value: string | undefined) => {
      return typeof value === 'string' ? value.replace(/\s/g, '') : value;
    },
    [security, symbol],
  );

  return (
    <Form.Item
      label={label}
      name={name}
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
    </Form.Item>
  );
};

export default FormItemEmail;

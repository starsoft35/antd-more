import * as React from 'react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { PasswordProps } from 'antd/es/input';

export interface FormItemPasswordProps extends FormItemProps {
  inputProps?: PasswordProps;
}

const FormItemPassword: React.FC<FormItemPasswordProps> = ({
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  return (
    <Form.Item
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${label}` : '';
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
      <Input.Password placeholder="请输入" autoComplete="off" {...inputProps} />
    </Form.Item>
  );
};

export default FormItemPassword;

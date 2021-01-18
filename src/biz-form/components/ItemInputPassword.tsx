import * as React from 'react';
import { Input } from 'antd';
import { PasswordProps } from 'antd/es/input';
import BizFormItem, { BizFormItemProps } from './Item';

export interface FormItemPasswordProps extends BizFormItemProps {
  inputProps?: PasswordProps;
}

const FormItemPassword: React.FC<FormItemPasswordProps> = ({
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  return (
    <BizFormItem
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
    </BizFormItem>
  );
};

export default FormItemPassword;

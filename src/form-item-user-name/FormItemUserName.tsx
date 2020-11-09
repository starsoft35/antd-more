import * as React from 'react';
import { Form, Input } from 'antd';
import { isMobile } from 'util-helpers';
import { FormItemProps } from 'antd/es/form';
import { InputProps } from 'antd/es/input';

export interface FormItemUserNameProps extends FormItemProps {
  min?: number;
  max?: number;
  inputProps?: InputProps;
}

const FormItemUserName: React.FC<FormItemUserNameProps> = ({
  min = 6,
  max = 32,
  inputProps = {},
  label = '用户名',
  name = 'userName',
  validateTrigger = 'onBlur',
  required = false,
  ...restProps
}) => {
  const handleNormalize = React.useCallback((value: string | undefined) => {
    return typeof value === 'string' ? value.replace(/\s/g, '') : value;
  }, []);

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
            } else if (value.length < min || value.length > max) {
              errMsg = `${label}为${min}~${max}位`;
            } else if (isMobile(value)) {
              errMsg = `${label}不能为手机号码`;
            } else if (value.indexOf('@') > -1) {
              errMsg = `${label}不能包含@符号`;
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
      <Input placeholder="请输入" maxLength={max} allowClear autoComplete="off" {...inputProps} />
    </Form.Item>
  );
};

export default FormItemUserName;

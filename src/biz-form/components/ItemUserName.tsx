import * as React from 'react';
import { Input } from 'antd';
import { isMobile } from 'util-helpers';
import { InputProps } from 'antd/es/input';
import { normalizeWhiteSpace } from '../_util/normalize';
import BizFormItem, { BizFormItemProps } from './Item';

export interface FormItemUserNameProps extends BizFormItemProps {
  min?: number;
  max?: number;
  inputProps?: InputProps;
}

const FormItemUserName: React.FC<FormItemUserNameProps> = ({
  min = 6,
  max = 32,
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
    </BizFormItem>
  );
};

export default FormItemUserName;

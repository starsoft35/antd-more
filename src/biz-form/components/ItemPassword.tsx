import * as React from 'react';
import { Input } from 'antd';
import { validatePassword } from 'util-helpers';
import { PasswordProps } from 'antd/es/input';
import BizFormItem, { BizFormItemProps } from './Item';

type Validated = {
  len?: boolean;
  level?: boolean;
  special?: boolean;
};

export interface FormItemPasswordProps extends BizFormItemProps {
  level?: 1 | 2 | 3;
  min?: number;
  max?: number;
  ignoreCase?: boolean;
  special?: string;
  inputProps?: PasswordProps;

  validated?: boolean | Validated;
  // validateMessages?: {
  //   len?: string;
  //   level?: string;
  //   special?: string;
  // }
}

// 数字
const numMap = ['零', '一', '两', '三'];

const FormItemPassword: React.FC<FormItemPasswordProps> = ({
  level = 2,
  min = 8,
  max = 16,
  ignoreCase = false,
  special = '\\x21-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7B-\\x7E',
  validated = true,
  // validateMessages,

  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  const validateObj: Validated = React.useMemo(() => {
    let ret: Validated = {
      len: true,
      level: true,
      special: true,
    };
    if (typeof validated === 'boolean') {
      if (!validated) {
        ret = {};
      }
    } else {
      ret = {
        ...ret,
        ...validated,
      };
    }
    return ret;
  }, [validated]);

  return (
    <BizFormItem
      label={label}
      validateTrigger={validated ? 'onBlur' : 'onChange'}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';

            if (!value) {
              errMsg = required ? `请输入${label}` : '';
            } else if (validated) {
              if (validateObj.len && (value.length < min || value.length > max)) {
                errMsg = `${label}为${min}～${max}位`;
              } else {
                const result = validatePassword(value, { ignoreCase, level, special });
                if (validateObj.special && result.containes.unallowableCharacter) {
                  errMsg = `${label}包含无法识别的字符`;
                } else if (validateObj.level && !result.validated) {
                  errMsg = `${label}为大小写字母、数字或符号任意${numMap[level]}者组成`;
                }
              }
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
      <Input.Password placeholder="请输入" autoComplete="off" allowClear {...inputProps} />
    </BizFormItem>
  );
};

export default FormItemPassword;

import * as React from 'react';
import { isBankCard, isEmail, isIdCard, isMobile } from 'util-helpers';
import {
  normalizeWhiteSpace,
  normalizeBankCard,
  normalizeIdCard,
  normalizeMobile,
} from '../_util/normalize';
import { transformBankCard } from '../_util/transform';
import ItemTextArea from './ItemTextArea';
import ItemInputPassword from './ItemInputPassword';
import BizFormItem, { BizFormItemProps } from './Item';
import InputWrapper, { InputWrapperProps } from './form/InputWrapper';

type InputType = 'bankCard' | 'email' | 'idCard' | 'mobile' | 'userName';

const validateUserName = (value, { label }) => {
  const ret = {
    validated: true,
    message: '',
  };
  if (isMobile(value)) {
    ret.message = `${label}不能为手机号码`;
  } else if (value.indexOf('@') > -1) {
    ret.message = `${label}不能包含@符号`;
  }
  if (ret.message) {
    ret.validated = false;
  }
  return ret;
};

const validateMethod = {
  bankCard: (val) => isBankCard(val, { loose: true }),
  email: isEmail,
  idCard: isIdCard,
  mobile: isMobile,
};

const maxLengthConfig = {
  idCard: 18,
  mobile: 11,
};

export interface FormItemInputProps
  extends BizFormItemProps,
    Pick<InputWrapperProps, 'before' | 'after'> {
  security?: boolean; // 脱敏。 为 true 时，必须传入 initialValue
  symbol?: string; // 脱敏符号
  type?: InputType;
  disabledWhiteSpace?: boolean;
  inputProps?: Omit<InputWrapperProps, 'initialTransform'>;
}

const FormItemInput: React.FC<FormItemInputProps> & {
  /**
   * @deprecated Please use `ItemTextArea`
   */
  TextArea: typeof ItemTextArea;

  /**
   * @deprecated Please use `ItemPassword` validated=false
   */
  Password: typeof ItemInputPassword;
} = ({
  type,
  before,
  after,
  security = false,
  symbol = '*',
  disabledWhiteSpace = false,
  inputProps = {},
  required = false,
  label,
  transform,
  normalize,
  ...restProps
}) => {
  const handleNormalize = React.useCallback(
    (value, prevValue, allValues) => {
      if (normalize) {
        return normalize(value, prevValue, allValues);
      }

      if (type === 'bankCard') {
        return normalizeBankCard(value, { symbol: security ? symbol : '' });
      }
      if (type === 'idCard') {
        return normalizeIdCard(value, { symbol: security ? symbol : '' });
      }
      if (type === 'mobile') {
        return normalizeMobile(value, { symbol: security ? symbol : '' });
      }
      if (disabledWhiteSpace || type === 'email' || type === 'userName') {
        return normalizeWhiteSpace(value);
      }
      return value;
    },
    [disabledWhiteSpace, type, symbol, security],
  );
  const handleTransform = React.useCallback(
    (val) => {
      if (transform) {
        return transform;
      }
      if (type === 'bankCard') {
        return transformBankCard(val);
      }
      return val;
    },
    [transform],
  );

  const defaultInputProps = React.useMemo(() => {
    if (maxLengthConfig[type]) {
      return {
        maxLength: maxLengthConfig[type],
      };
    }
    return {};
  }, [type]);

  return (
    <BizFormItem
      label={label}
      required={required}
      normalize={handleNormalize}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${label}` : '';
            } else if (security && restProps?.initialValue === value) {
              // 脱敏校验
              errMsg = '';
            } else if (type === 'userName') {
              errMsg = validateUserName(value, { label }).message;
            } else if (validateMethod[type] && !validateMethod[type](value)) {
              errMsg = `请输入正确的${label}`;
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
          transform: handleTransform,
        },
      ]}
      transform={handleTransform}
      validateTrigger={type ? 'onBlur' : 'onChange'}
      {...restProps}
    >
      <InputWrapper
        placeholder="请输入"
        allowClear
        autoComplete="off"
        before={before}
        after={after}
        initialTransform={normalize || type ? handleNormalize : false}
        {...defaultInputProps}
        {...inputProps}
      />
    </BizFormItem>
  );
};

FormItemInput.TextArea = ItemTextArea;
FormItemInput.Password = ItemInputPassword;

export default FormItemInput;

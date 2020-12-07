import * as React from 'react';
import { Input } from 'antd';
import { isBankCard } from 'util-helpers';
import { InputProps } from 'antd/es/input';
import { InternalFieldProps } from 'rc-field-form/es/Field'; // eslint-disable-line import/no-extraneous-dependencies
import { normalizeBankCard } from '../_util/normalize';
import { transformBankCard } from '../_util/transform';
import BizFormItem, { BizFormItemProps } from './Item';

interface BankCardInputProps extends InputProps, Pick<InternalFieldProps<any>, 'normalize'> {
  symbol?: string; // 脱敏符号
  formatting?: boolean;
  divider?: string;
}

const BankCardInput: React.FC<BankCardInputProps> = ({
  value,
  onChange,
  normalize,
  formatting = false,
  symbol,
  divider,
  ...restProps
}) => {
  const handleNormalize = React.useCallback(
    (val) => {
      return normalize ? val : normalizeBankCard(val, { symbol, char: formatting ? divider : '' });
    },
    [normalize, formatting, divider, symbol],
  );
  const handleChange = React.useCallback(
    (e) => {
      const val = e.target.value;
      const realVal = handleNormalize(val);
      onChange(realVal);
    },
    [onChange],
  );

  React.useEffect(() => {
    // 处理格默认值的式化
    if (value && formatting) {
      const realVal = handleNormalize(value);
      setTimeout(() => {
        onChange(realVal);
      }, 0);
    }
  }, []);
  return (
    <Input
      placeholder="请输入"
      allowClear
      autoComplete="off"
      value={value}
      onChange={handleChange}
      {...restProps}
    />
  );
};

export interface FormItemBankCardProps extends BizFormItemProps {
  security?: boolean; // 脱敏。 为 true 时，必须传入 initialValue
  symbol?: string; // 脱敏符号
  loose?: boolean; // 宽松模式校验
  formatting?: boolean; // 格式化
  divider?: string; // 分隔符
  inputProps?: InputProps;
}

const FormItemBankCard: React.FC<FormItemBankCardProps> = ({
  security = false,
  symbol = '*',
  loose = true,
  formatting = false,
  divider = ' ',
  inputProps = {},
  label,
  normalize,
  transform,
  required = false,
  ...restProps
}) => {
  const handleTransform = React.useCallback(
    (val) => (transform ? transform(val) : transformBankCard(val, formatting ? divider : '')),
    [formatting, divider, transform],
  );

  return (
    <BizFormItem
      label={label}
      normalize={normalize}
      validateTrigger="onBlur"
      required={required}
      rules={[
        {
          transform: handleTransform,
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${label}` : '';
            } else if (security && restProps && restProps.initialValue === value) {
              // 脱敏校验
              errMsg = '';
            } else if (!isBankCard(value, { loose })) {
              errMsg = `请输入正确的${label}`;
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      transform={handleTransform}
      {...restProps}
    >
      <BankCardInput
        formatting={formatting}
        normalize={normalize}
        divider={divider}
        symbol={security ? symbol : ''}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default FormItemBankCard;

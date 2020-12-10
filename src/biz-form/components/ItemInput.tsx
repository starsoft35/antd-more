import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';
import { normalizeWhiteSpace } from '../_util/normalize';
import ItemInputTextArea from './ItemInputTextArea';
import ItemInputPassword from './ItemInputPassword';
import BizFormItem, { BizFormItemProps } from './Item';

const prefixCls = 'antd-more-input';

interface InputWrapperProps extends InputProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ after, before, ...restProps }) => {
  return (
    <div className={prefixCls}>
      {before && <div style={{ marginRight: 8 }}>{before}</div>}
      <Input {...restProps} />
      {after && <div style={{ marginLeft: 8 }}>{after}</div>}
    </div>
  );
};

export interface FormItemInputProps extends BizFormItemProps {
  disabledWhiteSpace?: boolean;
  inputProps?: InputWrapperProps;
}

const FormItemInput: React.FC<FormItemInputProps> & {
  TextArea: typeof ItemInputTextArea;
  Password: typeof ItemInputPassword;
} = ({ disabledWhiteSpace = false, inputProps = {}, required = false, label, ...restProps }) => {
  const handleNormalize = React.useCallback(
    (val) => {
      if (disabledWhiteSpace) {
        return normalizeWhiteSpace(val);
      }
      return val;
    },
    [disabledWhiteSpace],
  );

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
      <InputWrapper placeholder="请输入" allowClear autoComplete="off" {...inputProps} />
    </BizFormItem>
  );
};

FormItemInput.TextArea = ItemInputTextArea;
FormItemInput.Password = ItemInputPassword;

export default FormItemInput;

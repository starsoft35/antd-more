import * as React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { normalizeWhiteSpace } from '../_util/normalize';
import BizFormItem, { BizFormItemProps } from './Item';

export interface FormItemTextAreaProps extends BizFormItemProps {
  disabledWhiteSpace?: boolean;
  inputProps?: TextAreaProps;
}

const FormItemTextArea: React.FC<FormItemTextAreaProps> = ({
  disabledWhiteSpace = false,
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
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
      <Input.TextArea
        placeholder="请输入"
        autoComplete="off"
        autoSize={{ minRows: 4, maxRows: 6 }}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default FormItemTextArea;

import * as React from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from './antd.interface';
import { normalizeWhiteSpace } from '../_util/normalize';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

// 兼容 antd v4
import 'antd/es/input/style';

export interface BizFormItemTextAreaProps extends BizFormItemProps, Pick<TextAreaProps, 'placeholder' | 'allowClear' | 'maxLength' | 'showCount'> {
  disabledWhiteSpace?: boolean;
  inputProps?: TextAreaProps;
}

const BizFormItemTextArea: React.FC<BizFormItemTextAreaProps> = ({
  placeholder = "请输入",
  allowClear = false,
  maxLength,
  showCount = false,
  disabledWhiteSpace = false,
  inputProps = {},
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
    [disabledWhiteSpace]
  );

  return (
    <BizFormItem
      required={required}
      normalize={handleNormalize}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请输入${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      {...restProps}
    >
      <Input.TextArea
        placeholder={placeholder}
        allowClear={allowClear}
        maxLength={maxLength}
        showCount={showCount}
        autoComplete="off"
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default BizFormItemTextArea;

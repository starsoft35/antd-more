import * as React from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from './antd.interface';
import { normalizeWhiteSpace } from '../_util/normalize';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import getLabel from '../_util/getLabel';

export interface BizFormItemTextAreaProps extends BizFormItemProps {
  disabledWhiteSpace?: boolean;
  inputProps?: TextAreaProps;
}

const BizFormItemTextArea: React.FC<BizFormItemTextAreaProps> = ({
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
      <Input.TextArea placeholder="请输入" autoComplete="off" {...inputProps} />
    </BizFormItem>
  );
};

export default BizFormItemTextArea;

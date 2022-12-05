import * as React from 'react';
import type { AutoCompleteProps } from "antd";
import { AutoComplete } from "antd";
import type { BizFormItemProps } from "./Item";
import BizFormItem from "./Item";
import getLabel from '../_util/getLabel';

// 兼容 antd v4
import 'antd/es/select/style';

export interface BizFormItemAutoCompleteProps extends BizFormItemProps, Pick<AutoCompleteProps, 'allowClear' | 'placeholder' | 'maxLength' | 'onSearch' | 'onFocus' | 'onBlur' | 'options'> {
  autoCompleteProps?: AutoCompleteProps;
}

const ItemAutoComplete: React.FC<BizFormItemAutoCompleteProps> = ({
  allowClear = true,
  placeholder = '请输入',
  maxLength,
  onSearch,
  onFocus,
  onBlur,
  options,
  autoCompleteProps,

  required,
  ...restProps
}) => {

  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rules, value) {
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
      <AutoComplete
        allowClear={allowClear}
        placeholder={placeholder}
        maxLength={maxLength}
        onSearch={onSearch}
        onFocus={onFocus}
        onBlur={onBlur}
        options={options}
        {...autoCompleteProps}
      />
    </BizFormItem>
  );
}

export default ItemAutoComplete;

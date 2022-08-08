import * as React from 'react';
import type { AutoCompleteProps } from "antd";
import { AutoComplete } from "antd";
import type { BizFormItemProps } from "./Item";
import BizFormItem from "./Item";
import getLabel from '../_util/getLabel';


export interface BizFormItemAutoCompleteProps extends BizFormItemProps, Pick<AutoCompleteProps, 'allowClear' | 'placeholder' | 'onSearch' | 'options'> {
  autoCompleteProps?: AutoCompleteProps;
}

const ItemAutoComplete: React.FC<BizFormItemAutoCompleteProps> = ({
  allowClear = true,
  placeholder = '请输入',
  onSearch,
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
        onSearch={onSearch}
        options={options}
        {...autoCompleteProps}
      />
    </BizFormItem>
  );
}

export default ItemAutoComplete;

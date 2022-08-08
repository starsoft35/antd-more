import * as React from 'react';
import type { BizFormItemAutoCompleteProps } from "antd-more";
import { BizFormItemAutoComplete } from "antd-more";
import { useState } from "react";
import { isEmail } from "util-helpers";

// 邮箱后缀
const EmailSuffix = ['@qq.com', '@126.com', '@163.com', '@sina.com', '@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com'];

const ItemAutoCompleteEmail: React.FC<BizFormItemAutoCompleteProps> = ({ extendRules = [], ...restProps }) => {
  const [options, setOptions] = useState<BizFormItemAutoCompleteProps['options']>([]);
  const handleSearch = (searchText: string) => {
    setOptions(EmailSuffix.map(suffix => ({
      label: searchText + suffix,
      value: searchText + suffix
    })));
  };

  return (
    <BizFormItemAutoComplete
      validateTrigger='onBlur'
      extendRules={[
        {
          validator(rule, value) {
            if (value && !isEmail(value)) {
              return Promise.reject('请输入正确的邮箱地址');
            }
            return Promise.resolve();
          }
        },
        ...extendRules
      ]}
      options={options}
      onSearch={handleSearch}
      {...restProps}
    />
  );
}

export default ItemAutoCompleteEmail;

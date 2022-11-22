import * as React from 'react';
import type { BizFormItemProps } from 'antd-more';
import { BizFormItem, BizForm } from 'antd-more';
import WrapperDateRange from './WrapperDateRange';

const ItemDateRangeDefine: React.FC<BizFormItemProps> = ({
  label,
  name,
  required,
  ...restProps
}) => {
  const form = BizForm.useFormInstance();

  // 触发表单校验
  const triggeValidate = React.useCallback(() => {
    form.validateFields([name]);
  }, [form, name]);

  return (
    <BizFormItem
      label={label}
      name={name}
      validateTrigger={false}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (
              !required &&
              (!value ||
                !value?.date ||
                (value?.date?.[0] === undefined &&
                  value?.date?.[1] === undefined &&
                  !value?.infinite))
            ) {
              return Promise.resolve();
            }
            if (
              !Array.isArray(value?.date) ||
              value.date.length !== 2 ||
              !value.date[0] ||
              (!value.date[1] && !value.infinite)
            ) {
              errMsg = `请选择${label}`;
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
      <WrapperDateRange internalTrigger={triggeValidate} />
    </BizFormItem>
  );
};

export default ItemDateRangeDefine;

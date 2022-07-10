import * as React from 'react';
import type { BizFormItemProps } from 'antd-more';
import { BizFormItem } from 'antd-more';
import FieldContext from 'antd-more/es/biz-form/FieldContext';
import ListFieldContext from 'antd-more/es/biz-form/ListFieldContext';
import getNamePaths from 'antd-more/es/biz-form/_util/getNamePaths';
import WrapperDateRange from './WrapperDateRange';

const ItemDateRangeDefine: React.FC<BizFormItemProps> = ({
  label,
  name,
  required,
  ...restProps
}) => {
  const { parentListName } = React.useContext(ListFieldContext);
  const { form } = React.useContext(FieldContext);

  // 触发表单校验
  const triggeValidate = React.useCallback(() => {
    const namePath =
      Array.isArray(parentListName) && parentListName.length > 0
        ? getNamePaths(name, parentListName)
        : name;
    form.validateFields([namePath]);
  }, [form, name, parentListName]);

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

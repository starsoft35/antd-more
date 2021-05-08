import * as React from 'react';
import BizFormItem, { BizFormItemProps } from './Item';
import InputNumberWrapper, { InputNumberWrapperProps } from './form/InputNumberWrapper';
import getLabel from '../_util/getLabel';

export interface FormItemNumberProps
  extends BizFormItemProps,
    Pick<InputNumberWrapperProps, 'before' | 'after' | 'precision'> {
  lt?: number;
  gt?: number;
  lte?: number;
  gte?: number;
  inputProps?: InputNumberWrapperProps;
}

const FormItemNumber: React.FC<FormItemNumberProps> = ({
  before,
  after,
  lt,
  gt,
  lte,
  gte,
  inputProps = {},
  precision,

  required = false,
  ...restProps
}) => {
  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (typeof value !== 'number') {
              errMsg = required ? `请输入${getLabel(restProps)}` : '';
            } else if (typeof lt === 'number' && value >= lt) {
              errMsg = `不能大于等于${lt}`;
            } else if (typeof gt === 'number' && value <= gt) {
              errMsg = `不能小于等于${gt}`;
            } else if (typeof lte === 'number' && value > lte) {
              errMsg = `不能大于${lte}`;
            } else if (typeof gte === 'number' && value < gte) {
              errMsg = `不能小于${gte}`;
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
      <InputNumberWrapper
        placeholder="请输入"
        precision={precision}
        before={before}
        after={after}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default FormItemNumber;

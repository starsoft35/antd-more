import * as React from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/es/input-number';
import BizFormItem, { BizFormItemProps } from './Item';

const prefixCls = 'antd-more-input';

interface InputNumberWrapperProps extends InputNumberProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const InputNumberWrapper: React.FC<InputNumberWrapperProps> = ({ after, before, ...restProps }) => {
  return (
    <div className={prefixCls}>
      {before && <div style={{ margin: '0 8px' }}>{before}</div>}
      <InputNumber {...restProps} />
      {after && <div style={{ margin: '0 8px' }}>{after}</div>}
    </div>
  );
};

export interface FormItemNumberProps extends BizFormItemProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  lt?: number;
  gt?: number;
  lte?: number;
  gte?: number;
  inputProps?: InputNumberProps;
}

const FormItemNumber: React.FC<FormItemNumberProps> = ({
  before,
  after,
  lt,
  gt,
  lte,
  gte,
  inputProps = {},
  label,
  required = false,
  ...restProps
}) => {
  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (typeof value !== 'number') {
              errMsg = required ? `请输入${label}` : '';
            } else {
              if (typeof lt === 'number' && value >= lt) {
                errMsg = `不能大于等于${lt}`;
              }
              if (typeof gt === 'number' && value <= gt) {
                errMsg = `不能小于等于${gt}`;
              }
              if (typeof lte === 'number' && value > lte) {
                errMsg = `不能大于${lte}`;
              }
              if (typeof gte === 'number' && value < gte) {
                errMsg = `不能小于${gte}`;
              }
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
        precision={2}
        before={before}
        after={after}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default FormItemNumber;

import * as React from 'react';
import { InputNumber } from 'antd';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import type { InputNumberProps } from './antd.interface';
import getLabel from '../_util/getLabel';

// 兼容 antd v4
import 'antd/es/input-number/style';

export interface BizFormItemNumberProps
  extends BizFormItemProps,
  Pick<InputNumberProps, 'precision' | 'placeholder' | 'step' | 'min' | 'max' | 'formatter'> {
  lt?: number;
  gt?: number;
  lte?: number;
  gte?: number;
  inputProps?: InputNumberProps;
}

const BizFormItemNumber: React.FC<BizFormItemNumberProps> = ({
  lt,
  gt,
  lte,
  gte,
  inputProps = {},
  precision,
  placeholder = "请输入",
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  formatter,

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
          }
        }
      ]}
      {...restProps}
    >
      <InputNumber
        placeholder={placeholder}
        precision={precision}
        // 需要显式指定最大最小值，并且不设置 parser ，否则输入过大数值会转换为科学记数法，最终导致错误的结果。
        max={max}
        min={min}
        step={step}
        formatter={formatter}
        {...inputProps}
      />
    </BizFormItem>
  );
};

export default BizFormItemNumber;

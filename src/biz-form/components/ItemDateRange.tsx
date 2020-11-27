import * as React from 'react';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import { RangePickerProps } from 'antd/es/date-picker';
import { TimePickerProps } from 'antd/es/time-picker';
import {
  MomentScale,
  DateUnit,
  createDisabledDate,
  transformMomentValue,
  getDateFormat,
  Picker,
} from '../_util/dateUtil';
import BizFormItem, { BizFormItemProps } from './Item';
import { transformDate } from '../_util/transform';

const DateRangePickerWrapper: React.FC<RangePickerProps> = ({ value, ...restProps }) => {
  return <DatePicker.RangePicker value={transformMomentValue(value)} {...restProps} />;
};

export interface FormItemDateRangeProps extends BizFormItemProps {
  disabledDateBefore?: number;
  disabledDateAfter?: number;
  maxRange?: number; // 最大可选范围值，根据当前 picker 为单位。
  showTime?: TimePickerProps | boolean;
  format?: string;
  picker?: Picker;
  pickerProps?: RangePickerProps;
}

const prefixCls = 'antd-more-form-item-date';

const FormItemDateRange: React.FC<FormItemDateRangeProps | any> = ({
  disabledDateBefore,
  disabledDateAfter,
  maxRange,
  showTime = false,
  format,
  picker = 'date',
  pickerProps = {},
  label,
  required = false,
  className,
  transform,
  ...restProps
}) => {
  const currentPicker = React.useMemo(() => pickerProps.picker || picker, [
    pickerProps.picker,
    picker,
  ]);
  const currentFormat = React.useMemo(() => {
    return getDateFormat(
      pickerProps.format || format,
      currentPicker,
      pickerProps.showTime || showTime,
    );
  }, [format, pickerProps.format, currentPicker, pickerProps.showTime, showTime]);
  const disabledDate = React.useMemo(
    () => createDisabledDate(currentPicker, { disabledDateBefore, disabledDateAfter }),
    [disabledDateBefore, disabledDateAfter, currentPicker],
  );
  const handleTransform = React.useCallback(
    (val) => {
      if (typeof transform === 'function') {
        return transform(val);
      }
      return transformDate(val, currentFormat);
    },
    [currentFormat],
  );

  return (
    <BizFormItem
      label={label}
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${label}` : '';
            } else if (maxRange > 0) {
              const [t1, t2] = value;
              const range = currentPicker === 'quarter' ? maxRange * 3 : maxRange;

              if (t2.diff(t1, MomentScale[currentPicker]) > range) {
                errMsg = `时间跨度不能超过${maxRange}${DateUnit[currentPicker]}`;
              }
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          },
        },
      ]}
      className={classNames(prefixCls, className)}
      transform={handleTransform}
      {...restProps}
    >
      <DateRangePickerWrapper
        disabledDate={disabledDate}
        format={currentFormat}
        showTime={showTime}
        {...pickerProps}
      />
    </BizFormItem>
  );
};

export default FormItemDateRange;

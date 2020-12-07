import * as React from 'react';
import { DatePicker } from 'antd';
import classNames from 'classnames';
import { Moment } from 'moment';
import { RangePickerProps } from 'antd/es/date-picker';
import { RangePickerDateProps } from 'antd/es/date-picker/generatePicker';
import {
  MomentScale,
  DateUnit,
  createDisabledDate,
  transformMomentValue,
  getDateFormat,
  Picker,
} from '../_util/dateUtil';
import BizFormItem, { BizFormItemProps } from './Item';
import { transformDate, invalidDateRangeNameValue } from '../_util/transform';

const DateRangePickerWrapper: React.FC<RangePickerProps> = ({ value, ...restProps }) => {
  return <DatePicker.RangePicker value={transformMomentValue(value)} {...restProps} />;
};

export interface FormItemDateRangeProps
  extends BizFormItemProps,
    Pick<RangePickerDateProps<Moment>, 'showTime'> {
  disabledDateBefore?: number;
  disabledDateAfter?: number;
  maxRange?: number; // 最大可选范围值，根据当前 picker 为单位。
  // showTime?: Pick<RangePickerDateProps<Moment>, 'showTime'>;
  format?: string;
  picker?: Picker;
  pickerProps?: RangePickerProps & Pick<RangePickerDateProps<Moment>, 'showTime'>;
  names?: [string, string];
}

const prefixCls = 'antd-more-form-item-date';

const FormItemDateRange: React.FC<FormItemDateRangeProps> = ({
  disabledDateBefore,
  disabledDateAfter,
  maxRange,
  showTime = false,
  format,
  picker = 'date',
  names = [],
  pickerProps = {},
  label,
  name,
  required = false,
  className,
  transform,
  ...restProps
}) => {
  const currentName = React.useMemo(() => name || `${names[0]}_${names[1]}`, [name, names]);
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
    (val, currentPathValues) => {
      let transValue;
      if (typeof transform === 'function') {
        transValue = transform(val);
      } else {
        transValue = transformDate(val, currentFormat);
      }

      if (Array.isArray(names) && names.length === 2 && currentPathValues) {
        // eslint-disable-next-line no-param-reassign
        currentPathValues[names[0]] = Array.isArray(transValue) ? transValue[0] : undefined;
        // eslint-disable-next-line no-param-reassign
        currentPathValues[names[1]] = Array.isArray(transValue) ? transValue[1] : undefined;
        return invalidDateRangeNameValue;
      } else {
        return transValue;
      }
    },
    [currentFormat, currentName],
  );

  return (
    <BizFormItem
      label={label}
      name={currentName}
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

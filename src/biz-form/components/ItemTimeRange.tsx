import * as React from 'react';
import { TimePicker } from 'antd';
import classNames from 'classnames';
import { TimeRangePickerProps } from 'antd/es/time-picker';
import BizFormItem, { BizFormItemProps } from './Item';
import { transformMomentTime } from '../_util/dateUtil';
import { transformDate, invalidDateRangeNameValue } from '../_util/transform';

const prefixCls = 'antd-more-form-item-date';

const { RangePicker } = TimePicker;

const TimePickerRangeWrapper: React.FC<TimeRangePickerProps> = ({
  value,
  format = 'HH:mm:ss',
  ...restProps
}) => {
  return (
    <RangePicker
      value={transformMomentTime(value, format as string)}
      format={format}
      {...restProps}
    />
  );
};

export interface FormItemTimeRangeProps
  extends BizFormItemProps,
    Pick<TimeRangePickerProps, 'format'> {
  pickerProps?: TimeRangePickerProps;
  names?: [string, string];
}

const FormItemTimeRange: React.FC<FormItemTimeRangeProps> = ({
  format,
  pickerProps,
  names = [],

  label,
  name,
  required,
  className,
  transform,
  ...restProps
}) => {
  const currentName = React.useMemo(() => name || `${names[0]}_${names[1]}`, [name, names]);
  const currentFormat = React.useMemo(() => {
    if (format) {
      return format;
    }
    return pickerProps?.use12Hours ? 'h:mm:ss a' : 'HH:mm:ss';
  }, [format, pickerProps?.use12Hours]);

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
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${label}` : '';
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
      <TimePickerRangeWrapper format={currentFormat} {...pickerProps} />
    </BizFormItem>
  );
};

export default FormItemTimeRange;

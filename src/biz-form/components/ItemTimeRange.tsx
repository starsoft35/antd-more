import * as React from 'react';
import { TimePicker } from 'antd';
import classNames from 'classnames';
import type { TimeRangePickerProps } from './antd.interface';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import { transformDayjsTime } from '../_util/dateUtil';
import { transformDate, InvalidFieldValue } from '../_util/transform';
import getLabel from '../_util/getLabel';
import uniqueId from '../_util/uniqueId';

const prefixCls = 'antd-more-form-item-date';

const { RangePicker } = TimePicker;

const TimePickerRangeWrapper: React.FC<TimeRangePickerProps> = ({
  value,
  format,
  ...restProps
}) => {
  return (
    <RangePicker
      value={transformDayjsTime(value, format as string)}
      format={format}
      {...restProps}
    />
  );
};

export interface BizFormItemTimeRangeProps extends BizFormItemProps {
  format?: string;
  pickerProps?: TimeRangePickerProps;
  names?: [string, string];
}

const BizFormItemTimeRange: React.FC<BizFormItemTimeRangeProps> = ({
  format,
  pickerProps,
  names = [],

  name,
  required,
  className,
  transform,
  ...restProps
}) => {
  const hasNames = React.useMemo(() => Array.isArray(names) && names.length > 0, [names]);
  const currentName = React.useMemo(
    () => name || (hasNames ? uniqueId('cascader') : name),
    [hasNames, name]
  );
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
        currentPathValues[names[0]] = Array.isArray(transValue) ? transValue[0] : undefined;
        currentPathValues[names[1]] = Array.isArray(transValue) ? transValue[1] : undefined;
        return InvalidFieldValue;
      } else {
        return transValue;
      }
    },
    [currentFormat, names, transform]
  );

  return (
    <BizFormItem
      name={currentName}
      required={required}
      rules={[
        {
          validator(rules, value) {
            let errMsg = '';
            if (!value) {
              errMsg = required ? `请选择${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      className={classNames(prefixCls, className)}
      transform={handleTransform}
      {...restProps}
    >
      <TimePickerRangeWrapper format={currentFormat} {...pickerProps} />
    </BizFormItem>
  );
};

export default BizFormItemTimeRange;

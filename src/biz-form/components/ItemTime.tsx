import * as React from 'react';
import { TimePicker } from 'antd';
import classNames from 'classnames';
import type { TimePickerProps } from './antd.interface';
import BizFormItem from './Item';
import type { BizFormItemProps } from './Item';
import { transformMomentTime } from '../_util/dateUtil';
import { transformDate } from '../_util/transform';
import getLabel from '../_util/getLabel';

const prefixCls = 'antd-more-form-item-date';

const TimePickerWrapper: React.FC<TimePickerProps> = ({
  value,
  format = 'HH:mm:ss',
  ...restProps
}) => {
  return (
    <TimePicker
      value={transformMomentTime(value, format as string)}
      format={format}
      {...restProps}
    />
  );
};

export interface FormItemTimeProps extends BizFormItemProps, Pick<TimePickerProps, 'format'> {
  pickerProps?: TimePickerProps;
}

const FormItemTime: React.FC<FormItemTimeProps> = ({
  format,
  pickerProps,

  name,
  required,
  className,
  transform,
  ...restProps
}) => {
  const currentFormat = React.useMemo(() => {
    if (format) {
      return format;
    }
    return pickerProps?.use12Hours ? 'h:mm:ss a' : 'HH:mm:ss';
  }, [format, pickerProps?.use12Hours]);

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
      name={name}
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
          },
        },
      ]}
      className={classNames(prefixCls, className)}
      transform={handleTransform}
      {...restProps}
    >
      <TimePickerWrapper format={currentFormat} {...pickerProps} />
    </BizFormItem>
  );
};

export default FormItemTime;

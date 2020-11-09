import * as React from 'react';
import { Form, DatePicker } from 'antd';
import classNames from 'classnames';
import { FormItemProps } from 'antd/es/form';
import { DatePickerProps, MonthPickerProps, WeekPickerProps } from 'antd/es/date-picker';
import FormItemDateRange from './FormItemDateRange';
import { createDisabledDate } from './util';

export interface FormItemDateProps extends FormItemProps {
  disabledDateBefore?: number;
  disabledDateAfter?: number;
  pickerProps?: DatePickerProps | MonthPickerProps | WeekPickerProps | any;
}

const prefixCls = 'antd-more-form-item-date';

class FormItemDate extends React.Component<FormItemDateProps> {
  static defaultProps = {
    pickerProps: {},
    label: '日期',
    name: 'date',
    required: false,
  };

  static Range: typeof FormItemDateRange;

  disabledDate() {
    const { disabledDateBefore, disabledDateAfter, pickerProps } = this.props;
    const picker = pickerProps && pickerProps.picker ? pickerProps.picker : 'date';
    return createDisabledDate(picker, { disabledDateBefore, disabledDateAfter });
  }

  render() {
    const {
      disabledDateBefore,
      disabledDateAfter,
      pickerProps,
      className,
      label,
      name,
      required,
      ...restProps
    } = this.props;

    return (
      <Form.Item
        label={label}
        name={name}
        required={required}
        rules={[
          {
            validator(rule, value) {
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
        {...restProps}
      >
        <DatePicker disabledDate={this.disabledDate()} {...pickerProps} />
      </Form.Item>
    );
  }
}

export default FormItemDate;

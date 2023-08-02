import React, { useMemo } from 'react';
import { Space } from "antd";
import type { BizFormItemProps } from "antd-more";
import { BizForm, BizFormItem, BizFormItemDate } from "antd-more";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { DatePickerEndProps } from "./DatePickerEnd";
import DatePickerEnd from "./DatePickerEnd";

type ItemDateRangeDefineProps = Omit<BizFormItemProps, 'name'> & Pick<DatePickerEndProps, 'longTermLabel' | 'longTermValue' | 'hideOnLongTerm' | 'format' | 'disabled'> & {
  labels: [BizFormItemProps['label'], BizFormItemProps['label']],
  names: [BizFormItemProps['name'], BizFormItemProps['name']],
  formItemProps?: [BizFormItemProps, BizFormItemProps];
  strict?: boolean;
};

const ItemDateRangeDefine: React.FC<ItemDateRangeDefineProps> = ({
  longTermValue = '9999-12-31',
  longTermLabel = '长期',
  hideOnLongTerm = true,
  format = 'YYYY-MM-DD',
  strict = false,
  labels,
  names,
  formItemProps = [],
  required = true,
  disabled,

  style,
  ...restProps
}) => {
  const form = BizForm.useFormInstance();
  const startDate = BizForm.useWatch(names[0]!, form);
  const endDate = BizForm.useWatch(names[1]!, form);

  const endDateIsLongTerm = useMemo(() => {
    const fmtEndDate = dayjs.isDayjs(endDate) ? endDate.format(format as string) : endDate;
    return fmtEndDate === longTermValue;
  }, [endDate, format, longTermValue])

  const disabledStartDate = (currentDate: Dayjs) => {
    if (strict && currentDate > dayjs().endOf('day')) {
      return true;
    }
    if (endDate && !endDateIsLongTerm) {
      return currentDate > dayjs(endDate).endOf('day');
    }
    return false;
  }

  const disabledEndDate = (currentDate: Dayjs) => {
    if (strict && currentDate < dayjs().startOf('day')) {
      return true;
    }
    if (startDate) {
      return currentDate < dayjs(startDate).startOf('day');
    }
    return false;
  }

  const transform = (val: any) => {
    if (val) {
      return dayjs(val).format(format as string);
    }
    return val;
  }

  return (
    <BizFormItem required={required} style={{ marginBottom: 0, ...style }} {...restProps}>
      <Space align="start">
        <BizFormItemDate
          label={labels[0]}
          name={names[0]}
          required={required}
          hideLabel
          pickerProps={{
            disabledDate: disabledStartDate,
            disabled
          }}
          transform={transform}
          {...formItemProps[0]}
        />
        <span style={{ display: 'inline-block', lineHeight: '32px' }}>-</span>
        <BizFormItem
          label={labels[1]}
          name={names[1]}
          required={required}
          hideLabel
          transform={transform}
          rules={[
            {
              validator(rule, value) {
                let errMsg = '';
                if (!value) {
                  errMsg = required ? `请选择${labels[1]}` : '';
                }
                if (errMsg) {
                  return Promise.reject(errMsg);
                }
                return Promise.resolve();
              }
            }
          ]}
          {...formItemProps[1]}
        >
          <DatePickerEnd
            longTermLabel={longTermLabel}
            longTermValue={longTermValue}
            hideOnLongTerm={hideOnLongTerm}
            format={format}
            disabledDate={disabledEndDate}
            disabled={disabled}
          />
        </BizFormItem>
      </Space>
    </BizFormItem>
  );
}

export default ItemDateRangeDefine;

import React, { useMemo } from 'react';
import { Space } from "antd";
import type { BizFormItemProps } from "antd-more";
import { BizForm, BizFormItem, BizFormItemDate } from "antd-more";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { DatePickerEndProps } from "./DatePickerEnd";
import DatePickerEnd from "./DatePickerEnd";

const unit = 'day';

type ItemDateRangeDefineProps = Omit<BizFormItemProps, 'name'> & Pick<DatePickerEndProps, 'infinityLabel' | 'infinityValue' | 'hideOnInfinity' | 'format' | 'disabled'> & {
  labels: [BizFormItemProps['label'], BizFormItemProps['label']],
  names: [BizFormItemProps['name'], BizFormItemProps['name']],
  formItemProps?: [BizFormItemProps, BizFormItemProps];
  strict?: boolean;
};

const ItemDateRangeDefine: React.FC<ItemDateRangeDefineProps> = ({
  infinityValue = '9999-12-31',
  infinityLabel = '长期',
  hideOnInfinity = true,
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

  const endDateIsInfinity = useMemo(() => {
    const fmtEndDate = dayjs.isDayjs(endDate) ? endDate.format(format as string) : endDate;
    return fmtEndDate === infinityValue;
  }, [endDate, format, infinityValue])

  const disabledStartDate = (currentDate: Dayjs) => {
    if (strict && currentDate > dayjs().endOf(unit)) {
      return true;
    }
    if (endDate && !endDateIsInfinity) {
      return currentDate > dayjs(endDate).endOf(unit);
    }
    return false;
  }

  const disabledEndDate = (currentDate: Dayjs) => {
    if (strict && currentDate < dayjs().startOf(unit)) {
      return true;
    }
    if (startDate) {
      return currentDate < dayjs(startDate).startOf(unit);
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
          dependencies={[names[0]]}
          required={required}
          hideLabel
          transform={transform}
          rules={[
            {
              validator(rule, value) {
                let errMsg = '';
                if (!value) {
                  errMsg = required ? `请选择${labels[1]}` : '';
                } else {
                  // 避免通过 setFieldValue 赋值导致结束日期小雨开始日期
                  const startDate = form.getFieldValue(names[0]);
                  if (startDate && dayjs(value).startOf(unit).diff(dayjs(startDate).startOf(unit), unit) < 0) {
                    errMsg = '不能小于开始日期';
                  }
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
            infinityLabel={infinityLabel}
            infinityValue={infinityValue}
            hideOnInfinity={hideOnInfinity}
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

import React, { useMemo, useRef } from "react";
import dayjs from "dayjs";
import { Checkbox, DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";


export type DatePickerEndProps = DatePickerProps & {
  longTermValue?: string;
  longTermLabel?: string;
  hideOnLongTerm?: boolean;
}

const DatePickerEnd: React.FC<DatePickerEndProps> = ({
  longTermValue = '9999-12-31',
  longTermLabel = '长期',
  hideOnLongTerm = true,
  format = 'YYYY-MM-DD',
  value,
  onChange,
  disabled,
  ...restProps
}) => {
  const datePickerRef = useRef<any>();
  const valueIsLongTerm = useMemo(() => {
    const fmtValue = dayjs.isDayjs(value) ? value.format(format as string) : value;
    return fmtValue === longTermValue;
  }, [value, format, longTermValue]);

  const handleChangeChecked = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onChange?.(dayjs(longTermValue), longTermValue);
    } else {
      onChange?.(null, '');
      setTimeout(() => {
        datePickerRef.current?.focus();
      })
    }
  }

  return (
    <Space>
      {
        (!hideOnLongTerm || !valueIsLongTerm) && (
          <DatePicker
            value={!valueIsLongTerm ? (value && !dayjs.isDayjs(value) ? dayjs(value) : value) : undefined}
            disabled={valueIsLongTerm || disabled}
            onChange={onChange}
            ref={datePickerRef}
            {...restProps}
          />
        )
      }
      <Checkbox
        style={{ marginTop: 5, marginBottom: 5, whiteSpace: 'nowrap' }}
        checked={valueIsLongTerm}
        onChange={handleChangeChecked}
        disabled={disabled}
      >
        {longTermLabel}
      </Checkbox>
    </Space>
  );
}

export default DatePickerEnd;

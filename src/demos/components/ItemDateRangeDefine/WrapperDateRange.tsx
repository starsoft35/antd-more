import * as React from 'react';
import type { Dayjs } from 'dayjs';
import { Checkbox, DatePicker, Space } from 'antd';
import { useControllableValue } from 'rc-hooks';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';

type DateValue = string | undefined;
type ValueType = [DateValue, DateValue] | [];

export interface WrapperDateRangeProps {
  defaultValue?: ValueType;
  value?: ValueType;
  onChange?: (value: ValueType) => void;
  longTermValue?: string;
  longTermLabel?: React.ReactNode;
  format?: string;
}

const WrapperDateRange: React.FC<WrapperDateRangeProps> = ({
  longTermValue = '9999-12-31',
  longTermLabel = '长期',
  format = 'YYYY-MM-DD',
  ...restProps
}) => {
  const [state, setState] = useControllableValue<ValueType>(restProps, {
    defaultValue: []
  });
  const [startDateOpened, setStartDateOpened] = React.useState(false);
  const [endDateOpened, setEndDateOpened] = React.useState(false);
  const startDatePickerRef = React.useRef<any>();
  const endDatePickerRef = React.useRef<any>();

  const disabledStartDate = (currentDate: Dayjs) => {
    if (state?.[1] && state[1] !== longTermValue) {
      return currentDate > dayjs(state[1]);
    }
    return false;
  };

  const disabledEndDate = (currentDate: Dayjs) => {
    if (state?.[0]) {
      return currentDate < dayjs(state[0]);
    }
    return false;
  };

  const changeStartDate = (date: Dayjs | null) => {
    setState([date ? date.format(format) : undefined, state?.[1]]);
    if (date && !state?.[1]) {
      setStartDateOpened(false);
      setEndDateOpened(true);
      endDatePickerRef.current?.focus();
    }
  };

  const changeEndDate = (date: Dayjs | null) => {
    setState([state?.[0], date ? date.format(format) : undefined]);
    if (date && !state?.[0]) {
      setStartDateOpened(true);
      setEndDateOpened(false);
      startDatePickerRef.current?.focus();
    }
  };

  const changeChecked = (e: CheckboxChangeEvent) => {
    setState([state?.[0], e.target.checked ? longTermValue : undefined]);
    if (e.target.checked && !state?.[0]) {
      setStartDateOpened(true);
      startDatePickerRef.current?.focus();
    } else if (!e.target.checked && state?.[0]) {
      setTimeout(() => {
        setEndDateOpened(true);
        endDatePickerRef.current?.focus();
      });
    }
  };

  return (
    <Space>
      <DatePicker
        disabledDate={disabledStartDate}
        value={state?.[0] ? dayjs(state[0]) : undefined}
        onChange={changeStartDate}
        open={startDateOpened}
        onOpenChange={setStartDateOpened}
        ref={startDatePickerRef}
      />
      -
      <DatePicker
        disabledDate={disabledEndDate}
        value={state?.[1] && state?.[1] !== longTermValue ? dayjs(state[1]) : undefined}
        onChange={changeEndDate}
        disabled={state?.[1] === longTermValue}
        open={endDateOpened}
        onOpenChange={setEndDateOpened}
        ref={endDatePickerRef}
      />
      <Checkbox checked={state?.[1] === longTermValue} onChange={changeChecked}>
        {longTermLabel}
      </Checkbox>
    </Space>
  );
};

export default WrapperDateRange;

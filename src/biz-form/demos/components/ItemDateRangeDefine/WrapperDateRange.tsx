import * as React from 'react';
import type { Moment } from 'moment';
import { Checkbox, DatePicker } from 'antd';
import { useControllableValue } from 'rc-hooks';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';

type DateValue = Moment | undefined;
type DateValues = [DateValue, DateValue] | [] | undefined;

type ValueType = {
  date?: DateValues;
  infinite: boolean;
};

interface WrapperDateRangeProps {
  defaultValue?: ValueType;
  value?: ValueType;
  internalTrigger?: () => void;
  onChange?: (value: ValueType) => void;
}

const WrapperDateRange: React.FC<WrapperDateRangeProps> = ({ internalTrigger, ...restProps }) => {
  const [state, setState] = useControllableValue<ValueType>(restProps, {
    defaultValue: {
      date: [],
      infinite: false
    }
  });
  const [startDateOpened, setStartDateOpened] = React.useState(false);
  const [endDateOpened, setEndDateOpened] = React.useState(false);
  const startDatePickerRef = React.useRef<any>();
  const endDatePickerRef = React.useRef<any>();

  const disabledStartDate = (currentDate: Moment) => {
    if (state?.date[1]) {
      return currentDate >= state?.date[1];
    }
    return false;
  };

  const disabledEndDate = (currentDate: Moment) => {
    if (state?.date[0]) {
      return currentDate <= state?.date[0];
    }
    return false;
  };

  const changeStartDate = (date: Moment) => {
    setState({ ...state, date: [date, state?.date[1]] });
    if (!state?.infinite) {
      setStartDateOpened(false);
      setEndDateOpened(true);
      endDatePickerRef.current?.focus();
    } else {
      internalTrigger?.();
    }
  };

  const changeEndDate = (date: Moment) => {
    setState({ ...state, date: [state?.date[0], date] });
    if (!state?.date[0]) {
      setStartDateOpened(true);
      setEndDateOpened(false);
      startDatePickerRef.current.focus();
    } else {
      internalTrigger?.();
    }
  };

  const changeChecked = (e: CheckboxChangeEvent) => {
    setState({ date: [state?.date[0], undefined], infinite: e.target.checked });
    internalTrigger?.();
  };

  return (
    <>
      <DatePicker
        disabledDate={disabledStartDate}
        value={state?.date[0]}
        onChange={changeStartDate}
        open={startDateOpened}
        onOpenChange={setStartDateOpened}
      />
      {' - '}
      <DatePicker
        disabledDate={disabledEndDate}
        value={state?.date[1]}
        onChange={changeEndDate}
        disabled={state?.infinite}
        open={endDateOpened}
        onOpenChange={setEndDateOpened}
        ref={endDatePickerRef}
      />
      <Checkbox checked={state?.infinite} onChange={changeChecked} style={{ marginLeft: 8 }}>
        永久
      </Checkbox>
    </>
  );
};

export default WrapperDateRange;

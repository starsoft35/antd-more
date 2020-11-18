import * as React from 'react';
import moment from 'moment';
import { FieldProps } from './common';

const formatConfig = {
  date: 'YYYY-MM-DD',
  dateWeek: 'YYYY-wo',
  dateMonth: 'YYYY-MM',
  dateQuarter: 'YYYY-QQ',
  dateYear: 'YYYY',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
};

const FieldDate: React.FC<FieldProps> = ({ value, type = 'date', fieldProps = {} }) => {
  let str = '';

  if (formatConfig[type]) {
    str = moment(value).format(formatConfig[type]);
  }

  if (type === 'dateRange' || type === 'dateTimeRange') {
    const format = type === 'dateRange' ? formatConfig.date : formatConfig.dateTime;
    const [startDate, endDate] = Array.isArray(value) ? value : [];
    const startText = startDate ? moment(startDate).format(format) : '';
    const endText = endDate ? moment(endDate).format(format) : '';
    str = `${startText} - ${endText}`;
  }

  if (type === 'fromNow') {
    str = moment(value).fromNow();
  }

  return <span {...fieldProps}>{str}</span>;
};

export default FieldDate;

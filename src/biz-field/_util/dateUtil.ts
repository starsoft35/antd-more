import moment from 'moment';

export enum DateFormat {
  date = 'YYYY-MM-DD',
  dateWeek = 'YYYY-wo',
  dateMonth = 'YYYY-MM',
  dateQuarter = 'YYYY-\\QQ',
  dateYear = 'YYYY',
  dateTime = 'YYYY-MM-DD HH:mm:ss',
  time = 'HH:mm:ss',
}

export function getDateStr(value, type) {
  let str = '';

  if (DateFormat[type]) {
    str = moment(value).format(DateFormat[type]);
  } else if (type === 'dateRange' || type === 'dateTimeRange') {
    const format = type === 'dateRange' ? DateFormat.date : DateFormat.dateTime;
    const [startDate, endDate] = Array.isArray(value) ? value : [];
    const startText = startDate ? moment(startDate).format(format) : '';
    const endText = endDate ? moment(endDate).format(format) : '';
    str = `${startText} ~ ${endText}`;
  } else if (type === 'fromNow') {
    str = moment(value).fromNow();
  }

  return str;
}

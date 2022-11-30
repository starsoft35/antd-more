// import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

// dayjs.locale('zh-cn');

dayjs.extend(relativeTime);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

const InternalQuarterFormat = 'YYYY-qQ';

// 格式化，年-季
export function formatQuarter(value: string | Dayjs) {
  return dayjs(value).format(InternalQuarterFormat).toUpperCase();
}

// 年-季字符串转换为Dayjs
export function transformQuarter(value: string | Dayjs) {
  if (dayjs.isDayjs(value)) {
    return value;
  }
  return dayjs((value || '').replace('Q', ''), 'YYYY-Q');
}

export default dayjs;
export type { Dayjs };

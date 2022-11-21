import 'dayjs/locale/zh-cn';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

// @ts-ignore
window.dayjs = dayjs;

dayjs.locale('zh-cn');

dayjs.extend(relativeTime);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);

export default dayjs;
export type { Dayjs };

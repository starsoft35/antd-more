import * as React from 'react';
import { BizFieldProps } from '../interface';

function getColor(value) {
  if (value === 0) {
    return '#595959';
  }
  return value > 0 ? '#ff4d4f' : '#52c41a';
}

function getSymbol(value) {
  if (value <= 0) {
    return '';
  }
  return '+';
}

const Percent: React.FC<BizFieldProps> = React.memo(
  ({ value, style, precision = 2, showColor = false, showSymbol = false, suffix = '%' }) => {
    const realValue =
      typeof value === 'string' && (value as string).includes('%')
        ? parseFloat((value as string).replace('%', ''))
        : parseFloat(value);
    const color = getColor(realValue);
    const styles = showColor && color ? { color, ...style } : {};
    const symbol = showSymbol ? getSymbol(realValue) : '';

    const ret = symbol + realValue.toFixed(precision) + suffix;

    return <span style={styles}>{ret}</span>;
  },
);

export default Percent;

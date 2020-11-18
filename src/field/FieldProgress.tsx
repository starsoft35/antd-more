import * as React from 'react';
import { Progress } from 'antd';
import { FieldProps } from './common';

function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active' {
  if (typeof text !== 'number') {
    return 'exception';
  }
  if (text === 100) {
    return 'success';
  }
  if (text < 0) {
    return 'exception';
  }
  if (text < 100) {
    return 'active';
  }

  return 'normal';
}

const FieldProgress: React.FC<FieldProps> = ({ value, fieldProps = {} }) => {
  const realValue = React.useMemo(
    () =>
      typeof value === 'string' && (value as string).includes('%')
        ? Number((value as string).replace('%', ''))
        : Number(value),
    [value],
  );
  const status = React.useMemo(() => getProgressStatus(realValue), [realValue]);

  return (
    <Progress
      size="small"
      style={{ minWidth: 100, maxWidth: 320 }}
      percent={realValue}
      status={status}
      {...fieldProps}
    />
  );
};

export default FieldProgress;

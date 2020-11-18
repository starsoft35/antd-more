import * as React from 'react';
import { Progress } from 'antd';
import { ProgressProps } from 'antd/es/progress';

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

const FieldProgress: React.FC<ProgressProps & { value: any }> = ({
  value,
  style,
  ...restProps
}) => {
  const realValue = React.useMemo(
    () =>
      typeof value === 'string' && (value as string).includes('%')
        ? parseFloat((value as string).replace('%', ''))
        : parseFloat(value),
    [value],
  );
  const status = React.useMemo(() => getProgressStatus(realValue), [realValue]);

  return (
    <Progress
      size="small"
      style={{ minWidth: 100, maxWidth: 320, ...style }}
      percent={realValue}
      status={status}
      {...restProps}
    />
  );
};

export default FieldProgress;

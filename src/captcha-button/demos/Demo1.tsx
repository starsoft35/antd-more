/**
 * title: 基础用法
 */

import React, { useCallback, useState } from 'react';
import { CaptchaButton } from 'antd-more';

export default () => {
  const [start, setStart] = useState(false);

  const handleClick = useCallback(() => {
    setStart(true);
  }, []);
  const handleEnd = useCallback(() => {
    setStart(false);
  }, []);

  return <CaptchaButton start={start} second={15} onClick={handleClick} onEnd={handleEnd} />;
};

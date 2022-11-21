import * as React from 'react';
import { InputIcon, InputIconsMap } from 'antd-more';

const Demo = () => {
  const [value, setValue] = React.useState<string>('');

  const hasIcon = value && InputIconsMap.has(value);
  const IconComp = InputIconsMap.get(value);

  return (
    <>
      <p>
        当前选择的图标：
        {hasIcon ? <IconComp /> : '-'}
      </p>
      <InputIcon iconData={InputIconsMap} onChange={setValue} column={4} />
    </>
  );
};

export default Demo;

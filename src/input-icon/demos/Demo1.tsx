import * as React from 'react';
import { InputIcon } from 'antd-more';
import icons from 'antd-more/es/input-icon/icons';

const Demo: React.FC = () => {
  const [value, setValue] = React.useState<string>('');

  const hasIcon = value && icons.has(value);
  const IconComp = icons.get(value);

  return (
    <>
      <p>
        当前选择的图标：
        {
          hasIcon ? <IconComp /> : '-'
        }
      </p>
      <InputIcon iconData={icons} onChange={setValue} column={4} />
    </>
  );
}

export default Demo;
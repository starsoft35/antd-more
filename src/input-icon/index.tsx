import * as React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd/lib/input';
import classnames from 'classnames';
import type { IconProp } from './icons';
import SelectPopover from './components/SelectPopover';
import useControllableValue from './useControllableValue';

import './index.less';

const prefixCls = 'antd-more-input-icon';

export interface InputIconProps extends Omit<InputProps, 'onChange'> {
  iconData: Map<IconProp[0], IconProp[1]>;
  showSearch?: boolean;
  column?: number;
  onChange?: (iconName: string) => void;
}

const InputIcon: React.FC<InputIconProps> = (props) => {
  const {
    iconData: icons = new Map([]),
    showSearch = true,
    column,
    onChange,
    ...restProps
  } = props;
  const [state, setState] = useControllableValue(props);

  const handleSelect = React.useCallback(
    (icon: IconProp) => {
      const hasChange = icon?.[0] !== state;
      if (hasChange) {
        setState(icon?.[0] as any);
      }
    },
    [state],
  );

  const handleChange = React.useCallback(
    (e) => {
      // 清空 或 输入无效值时
      if (!e.target.value || (!state && !icons.has(e.target.value))) {
        setState('');
      }
    },
    [icons, state],
  );

  const IconComp = state && icons.has(state) ? icons.get(state) : null;

  return (
    <SelectPopover
      onSelect={handleSelect}
      options={[...icons]}
      showSearch={showSearch}
      column={column}
    >
      <div
        className={classnames(`${prefixCls}-input`, {
          [`${prefixCls}-input-no-empty`]: state,
        })}
      >
        <Input
          readOnly
          prefix={IconComp ? <IconComp /> : null}
          value={state}
          placeholder="点击选择图标"
          allowClear
          onChange={handleChange}
          autoComplete="off"
          {...restProps}
        />
      </div>
    </SelectPopover>
  );
};

export default InputIcon;

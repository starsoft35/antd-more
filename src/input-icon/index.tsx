import * as React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import classnames from 'classnames';
import type { IconProp } from './icons';
import SelectPopover from './SelectPopover';

const prefixCls = 'antd-more-input-icon';

export interface InputIconProps extends Omit<InputProps, 'onChange'> {
  iconData: Map<IconProp[0], IconProp[1]>;
  showSearch?: boolean;
  column?: number;
  onChange?: (iconName: string) => void;
}

const InputIcon: React.FC<InputIconProps> = ({
  iconData: icons = new Map([]),
  showSearch = true,
  onChange,
  value,
  column,
  ...restProps
}) => {
  const [currentIcon, setCurrentIcon] = React.useState<IconProp>();
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);

    if (value) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [k, v] of icons) {
        if (k === value) {
          setCurrentIcon([k, v]);
        }
      }
    }
  }, [value]);

  const changeValue = React.useCallback(
    (e) => {
      const realValue = e?.target ? e.target.value : e;

      onChange?.(realValue);

      if (!value) {
        setInternalValue(realValue);
      }
    },
    [onChange, value],
  );

  const handleSelect = React.useCallback(
    (icon: IconProp) => {
      const hasChange = icon?.[0] !== internalValue;
      if (hasChange) {
        setCurrentIcon(icon);
        changeValue(icon?.[0] as any);
      }
    },
    [internalValue],
  );

  const handleChange = React.useCallback((e) => {
    const realValue = e.target.value.trim();

    if (!realValue) {
      // 清空
      setCurrentIcon(undefined);
      changeValue(e);
    } else if (!icons.has(realValue)) {
      // 输入时恢复原值
      changeValue(undefined as any);
    }
  }, []);

  const IconComp = currentIcon?.[0] ? currentIcon[1] : null;

  return (
    <SelectPopover
      onSelect={handleSelect}
      options={[...icons]}
      showSearch={showSearch}
      column={column}
    >
      <div
        className={classnames(`${prefixCls}-input`, {
          [`${prefixCls}-input-no-empty`]: internalValue,
        })}
      >
        <Input
          // readOnly
          prefix={IconComp ? <IconComp /> : null}
          value={internalValue}
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

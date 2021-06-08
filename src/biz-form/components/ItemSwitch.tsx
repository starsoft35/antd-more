import * as React from 'react';
import { Switch } from 'antd';
import type { SwitchProps } from './antd.interface';
import BizFormItem from './Item';
import type { BizFormItemProps } from './Item';

export interface FormItemSwitchProps
  extends BizFormItemProps,
    Pick<SwitchProps, 'checkedChildren' | 'unCheckedChildren'> {
  switchProps?: SwitchProps;
}

const FormItemSwitch: React.FC<FormItemSwitchProps> = ({
  checkedChildren,
  unCheckedChildren,
  switchProps = {},
  ...restProps
}) => {
  return (
    <BizFormItem valuePropName="checked" {...restProps}>
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        {...switchProps}
      />
    </BizFormItem>
  );
};

export default FormItemSwitch;

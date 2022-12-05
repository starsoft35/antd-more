import * as React from 'react';
import { Switch } from 'antd';
import type { SwitchProps } from './antd.interface';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';

// 兼容 antd v4
import 'antd/es/switch/style';

export interface BizFormItemSwitchProps
  extends BizFormItemProps,
  Pick<SwitchProps, 'checkedChildren' | 'unCheckedChildren'> {
  switchProps?: SwitchProps;
}

const BizFormItemSwitch: React.FC<BizFormItemSwitchProps> = ({
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

export default BizFormItemSwitch;

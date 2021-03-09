import * as React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/es/switch';
import BizFormItem, { BizFormItemProps } from './Item';

export interface FormItemSwitchProps extends BizFormItemProps {
  switchProps?: SwitchProps;
}

const FormItemSwitch: React.FC<FormItemSwitchProps> = ({ switchProps = {}, ...restProps }) => {
  return (
    <BizFormItem valuePropName="checked" {...restProps}>
      <Switch {...switchProps} />
    </BizFormItem>
  );
};

export default FormItemSwitch;

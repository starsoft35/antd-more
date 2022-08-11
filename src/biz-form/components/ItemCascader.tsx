import * as React from 'react';
import { Cascader } from 'antd';
import type { CascaderProps } from './antd.interface';
import type { BizFormItemProps } from './Item';
import BizFormItem from './Item';
import FieldContext from '../FieldContext';
import getLabel from '../_util/getLabel';
import { InvalidFieldValue } from '../_util/transform';
import uniqueId from '../_util/uniqueId';

export interface BizFormItemCascaderProps extends BizFormItemProps {
  options?: CascaderProps<any>['options'];
  names?: string[];
  cascaderProps?: CascaderProps<any>;
}

const BizFormItemCascader: React.FC<BizFormItemCascaderProps> = ({
  options = [],
  names,
  name,
  cascaderProps = {},
  required = false,
  transform,
  ...restProps
}) => {
  const hasNames = React.useMemo(() => Array.isArray(names) && names.length > 0, [names]);
  const currentName = React.useMemo(
    () => name || (hasNames ? uniqueId('cascader') : name),
    [hasNames, name]
  );
  const { getPopupContainer } = React.useContext(FieldContext);
  const handleTransform = React.useCallback(
    (val, currentPathValues) => {
      const transVal = typeof transform === 'function' ? transform(val) : val;

      if (Array.isArray(names) && names.length > 0 && currentPathValues) {
        names.forEach((item, index) => {
          currentPathValues[item] = Array.isArray(transVal) ? transVal[index] : undefined;
        });
        return InvalidFieldValue;
      } else {
        return transVal;
      }
    },
    [names, transform]
  );

  return (
    <BizFormItem
      required={required}
      rules={[
        {
          validator(rule, value) {
            let errMsg = '';
            if (!value || (cascaderProps?.multiple && value.length <= 0)) {
              errMsg = required ? `请选择${getLabel(restProps)}` : '';
            }
            if (errMsg) {
              return Promise.reject(errMsg);
            }
            return Promise.resolve();
          }
        }
      ]}
      name={currentName}
      transform={handleTransform}
      {...restProps}
    >
      <Cascader
        placeholder="请选择"
        getPopupContainer={getPopupContainer}
        {...cascaderProps}
        options={options}
      />
    </BizFormItem>
  );
};

export default BizFormItemCascader;

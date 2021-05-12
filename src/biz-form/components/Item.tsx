import * as React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { Rule } from 'rc-field-form/es/interface'; // eslint-disable-line import/no-extraneous-dependencies
import { ColProps } from 'antd/lib/grid';
import FieldContext from '../FieldContext';
import ListFieldContext from '../ListFieldContext';

// 初始值（可能脱敏）->格式化->验证（转换再验证）
// 输入->格式化->验证（转换再验证）
// 提交->验证（转换再验证）->转换后的值

type TransformFn<T = any> = (value: T, currentPathValues?: any) => T | any;

export interface BizFormItemProps extends FormItemProps {
  transform?: TransformFn;
  colProps?: ColProps;
  extendRules?: Rule[];
  labelWidth?: number | 'auto';
  hideLabel?: boolean;
  renderField?: (dom: JSX.Element) => JSX.Element;
}

const BizFormItem: React.FC<BizFormItemProps> = ({
  children,
  transform,
  renderField,
  name,
  colProps,
  rules = [],
  extendRules = [],
  labelWidth,
  hideLabel,
  labelCol,
  ...restProps
}) => {
  const {
    setFieldTransform,
    layout,
    hideLabel: formHideLabel,
    labelCol: formLabelCol,
  } = React.useContext(FieldContext);
  const { parentListName } = React.useContext(ListFieldContext);

  const labelColProps = React.useMemo(() => {
    const { flex: formLabelFlex, style: formLabelStyle, ...restFormLabelCol } = formLabelCol || {};
    const formLabelColFlex = formLabelFlex && labelWidth !== 'auto' ? { flex: formLabelFlex } : {};
    const labelFlex =
      layout !== 'vertical' && labelWidth && labelWidth !== 'auto'
        ? { flex: `0 0 ${labelWidth}px` }
        : formLabelColFlex;
    const labelStyle = {
      style: {
        ...formLabelStyle,
        ...(formHideLabel && hideLabel === false ? { display: 'block' } : {}),
        ...(hideLabel ? { display: 'none' } : {}),
        ...labelCol?.style,
      },
    };
    return {
      ...restFormLabelCol,
      ...labelFlex,
      ...labelCol,
      ...labelStyle,
    };
  }, [layout, labelWidth, hideLabel, labelCol, formHideLabel, formLabelCol]);

  React.useEffect(() => {
    if (name && transform && setFieldTransform) {
      setFieldTransform(name, transform, parentListName);
    }
  }, []);

  return (
    <Form.Item
      name={name}
      validateFirst
      rules={[...rules, ...extendRules]}
      labelCol={labelColProps}
      {...restProps}
    >
      {renderField ? renderField(children as JSX.Element) : children}
    </Form.Item>
  );
};

export default BizFormItem;

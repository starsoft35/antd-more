import * as React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { Rule } from 'rc-field-form/es/interface'; // eslint-disable-line import/no-extraneous-dependencies
import { ColProps } from 'antd/es/grid';
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
}

const BizFormItem: React.FC<BizFormItemProps> = ({
  children,
  transform,
  name,
  colProps,
  rules = [],
  extendRules = [],
  ...restProps
}) => {
  const { setFieldTransform } = React.useContext(FieldContext);
  const { parentListName } = React.useContext(ListFieldContext);

  React.useEffect(() => {
    if (name && transform && setFieldTransform) {
      setFieldTransform(name, transform, parentListName);
    }
  }, []);

  return (
    <Form.Item name={name} validateFirst rules={[...rules, ...extendRules]} {...restProps}>
      {children}
    </Form.Item>
  );
};

export default BizFormItem;

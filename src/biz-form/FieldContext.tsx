import React from 'react';
import { NamePath } from 'antd/es/form/interface';
import { FormProps } from 'antd/es/form';

export type TransformFn<T = any> = (value: T) => T | any;

export interface FiledContextProps extends Pick<FormProps, 'layout' | 'labelCol'> {
  setFieldTransform?: (
    name: NamePath,
    transform?: TransformFn | undefined,
    parentList?: NamePath[],
  ) => void;
  hideLabel?: boolean;
}

const FieldContext = React.createContext<FiledContextProps>({
  setFieldTransform: () => {},
  hideLabel: false,
});

export default FieldContext;

// 挂着标识到 formItem 上，每个 formItem 设置 name 时，获取标识。
// 如果有多级 List，兼容多层级嵌套
// 需要在 transform 中，添加一个参数用来记录嵌套List的标识

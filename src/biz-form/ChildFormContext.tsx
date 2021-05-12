import * as React from 'react';
import { FormInstance } from 'antd/lib/form';

// 解决Form嵌套Form，提交校验问题
// 提供注册/解除子form引用
type ChildFormContextType = {
  regChildForm: (name: string, formRef: FormInstance) => void;
  unregChildForm: (name: string) => void;
};

export default React.createContext<ChildFormContextType | undefined>(undefined);

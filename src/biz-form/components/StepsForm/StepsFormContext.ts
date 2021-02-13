import * as React from 'react';
import { FormInstance } from 'antd/es/form';
import SyncMemoryStore from '../../_util/SyncMemoryStore';

export interface StepsFormContextProps {
  formArrayRef: React.MutableRefObject<FormInstance[]>; // 每个form的ref
  next: () => void; // 下一步
  prev: () => void; // 上一步
  submit: () => void; // 提交
  onFormFinish: (name: string, value: object) => void; // 每个步骤表单提交时，用于存储值

  // 单个表单可能有异步校验
  loading: boolean;
  setLoading: (loading: boolean) => void;

  actionCache: InstanceType<typeof SyncMemoryStore>;
  forgetUpdate: () => void;
}

export default React.createContext<StepsFormContextProps | undefined>(undefined);

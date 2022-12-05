/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { isPromiseLike } from 'util-helpers';
import { Form } from 'antd';
import type { StepProps } from '../antd.interface';
import type { BaseFormProps } from '../BaseForm';
import BaseForm from '../BaseForm';
import StepsFormContext from './StepsFormContext';
import type { StepsFormSubmitterProps } from './StepsSubmitter';

// 兼容 antd v4
import 'antd/es/form/style';

export interface StepFormProps<Values = any>
  extends Omit<BaseFormProps<Values>, 'title' | 'onReset' | 'contentRender' | 'submitter' | 'ready'>,
  Pick<StepProps, 'title' | 'icon' | 'subTitle' | 'description'> {
  stepProps?: StepProps;
  submitter?: Omit<StepsFormSubmitterProps, 'total' | 'current' | 'form'> | false;
  readonly step?: number;
}

function StepForm<Values = any>({
  name,
  onFinish,
  form: formProp,
  submitter,

  step,

  title,
  icon,
  subTitle,
  description,
  stepProps,

  ...restProps
}: StepFormProps<Values>) {
  const ctx = React.useContext(StepsFormContext);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (ctx && ctx?.formArrayRef) {
      ctx.formArrayRef.current[step] = formProp || form;
    }
    // modal 可能未加载时拿不到 form
    ctx?.forgetUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseForm<Values>
      name={name}
      form={formProp || form}
      onFinish={async (values) => {
        let ret = typeof onFinish === 'function' ? onFinish(values) : true;
        if (isPromiseLike(ret)) {
          ctx?.setLoading(true);
          try {
            ret = await ret;
          } catch (err) {
            console.error(err); // eslint-disable-line
            ret = false;
          } finally {
            ctx?.setLoading(false);
          }
        }
        if (ret !== false) {
          ctx?.onFormFinish(name, values);

          const currentAction = ctx?.actionCache.get();
          if (currentAction === 'next' || currentAction === 'submit') {
            ctx?.[currentAction]();
          }
        }
      }}
      {...restProps}
    />
  );
}

export default StepForm;

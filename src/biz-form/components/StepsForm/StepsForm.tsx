import * as React from 'react';
import { Steps, Form } from 'antd';
import classNames from 'classnames';
import { isPromiseLike } from 'util-helpers';
import { StepsProps, StepProps } from 'antd/es/steps';
import StepsFormContext from './StepsFormContext';
import { BaseFormProps } from '../BaseForm';
import StepForm, { StepFormProps } from './StepForm';
import StepsSubmitter, { StepsSubmitterProps } from './StepsSubmitter';
import SyncMemoryStore from '../../_util/SyncMemoryStore';

const prefixCls = 'antd-more-steps-form';
const formItemHideLabelClass = 'antd-more-form-item-hide-label';

export type ActionType = {
  prev: () => void; // 返回上一步
  next: (submitted: boolean) => void; // 触发当前表单校验（可选，部分中间步骤提交后，可直接进入下一步），校验成功则跳转下一步
  submit: () => void; // 触发当前表单校验，并提交所有表单值
  reset: () => void; // 重置所有表单和值，将步骤恢复初始步骤
};

export interface StepsFormProps {
  current?: number;
  onCurrentChange?: (current: number) => void;
  ready?: boolean;
  stepsProps?: Omit<StepsProps, 'current' | 'onChange'>;
  formProps?: Omit<BaseFormProps, 'title' | 'onReset' | 'contentRender'>;
  onFinish?: (values) => void | Promise<any>;
  submitter?: Omit<StepsSubmitterProps, 'total' | 'current' | 'form'> | false;
  actionRef?: React.MutableRefObject<ActionType | undefined>;
  // 自定义步骤条渲染
  stepsRender?: (stepsProps: StepProps[], stepsDom: React.ReactNode) => React.ReactNode;
  // 自定义单个表单渲染
  stepFormRender?: (formDom: React.ReactNode) => React.ReactNode;
  // 自定义整个表单渲染
  stepsFormRender?: (
    stepsDom: React.ReactNode,
    formDom: React.ReactNode,
    submitterDom: React.ReactNode,
  ) => React.ReactNode;
}

const StepsForm: React.FC<StepsFormProps> & {
  StepForm: typeof StepForm;
} = ({
  current = 0,
  onCurrentChange,
  ready = true,
  stepsProps,
  formProps,
  submitter,
  actionRef,
  children,
  onFinish,
  stepsRender,
  stepFormRender,
  stepsFormRender,
}) => {
  const [step, setStep] = React.useState(current);
  const [loading, setLoading] = React.useState(false);
  const [stepsConfig, setStepsConfig] = React.useState([]);
  const [submitterConfig, setSubmitterConfig] = React.useState([]);
  const formArrayRef = React.useRef([]);
  const formSubmitterRef = React.useRef([]);
  const formDataRef = React.useRef({});

  const [updateCount, updateState] = React.useState(0);
  const forgetUpdate = () => {
    setTimeout(() => updateState((c) => c + 1));
  };

  const actionCache = React.useMemo(() => SyncMemoryStore.create<'prev' | 'next' | 'submit'>(), []); // 记录当前操作

  const childs = React.Children.toArray(children);

  const next = () => {
    if (step < childs.length - 1) {
      const currStep = step + 1;
      setStep(currStep);
      onCurrentChange?.(currStep);
    }
  };
  const prev = () => {
    if (step > 0) {
      const currStep = step - 1;
      setStep(currStep);
      onCurrentChange?.(currStep);
    }
  };
  const submit = async () => {
    if (typeof onFinish === 'function') {
      const values = Object.values<typeof formDataRef.current>(formDataRef.current).reduce(
        (pre, cur) => ({ ...pre, ...cur }),
        {},
      );
      const ret = onFinish(values);
      if (isPromiseLike(ret)) {
        setLoading(true);
        try {
          await ret;
        } catch (err) {
          console.error(err); // eslint-disable-line
        } finally {
          setLoading(false);
        }
      }
    }
  };
  const onFormFinish = (name, values) => {
    formDataRef.current[name] = values;
    // // 不能直接使用最后一步提交，可能中间某个步骤就要提交。最后一步仅是显示结果或完成
    // if (step === childs.length - 1 && typeof onFinish === 'function') {
    //   const values = Object.values<typeof formDataRef.current>(formDataRef.current).reduce(
    //     (prev, curr) => ({ ...prev, ...curr }),
    //     {},
    //   );
    //   onFinish(values);
    // }
  };

  const innerActionRef = React.useRef<ActionType | undefined>();

  React.useImperativeHandle(actionRef || innerActionRef, () => ({
    prev: () => {
      if (!ready) {
        return;
      }

      actionCache.set('prev');
      prev();
      const currentSubmitter = submitterConfig[step];
      currentSubmitter && currentSubmitter?.onPrev();
    },
    // 是否触发当前表单提交验证
    // 部分情况下第二步提交，第三步为结果。提交之后无需再次触发当前表单提交校验
    next: (submitted = true) => {
      if (!ready) {
        return;
      }

      actionCache.set('next');
      if (submitted) {
        formArrayRef.current[step].submit();
      } else {
        next();
      }
      const currentSubmitter = submitterConfig[step];
      currentSubmitter && currentSubmitter?.onNext?.();
    },
    submit: () => {
      if (!ready) {
        return;
      }
      actionCache.set('submit');
      formArrayRef.current[step].submit();
      const currentSubmitter = submitterConfig[step];
      currentSubmitter && currentSubmitter?.onSubmit?.();
    },
    reset: () => {
      if (!ready) {
        return;
      }
      setStep(current);
      formDataRef.current = {};
      formArrayRef.current.forEach((item) => {
        item?.resetFields();
      });
    },
  }));

  const stepsDom = React.useMemo(() => {
    if (!Array.isArray(stepsConfig) || stepsConfig.length <= 0) {
      return null;
    }

    const dom = (
      <Steps {...stepsProps} current={step}>
        {stepsConfig.map((item) => (
          <Steps.Step {...item} />
        ))}
      </Steps>
    );

    return stepsRender ? stepsRender(stepsConfig, dom) : dom;
  }, [step, stepsConfig, stepsProps, stepsRender]);

  const renderSubmitter = () => {
    if (!Array.isArray(submitterConfig) || submitterConfig.length <= 0) {
      return null;
    }

    const currentSubmitter = submitterConfig[step];

    if (currentSubmitter === false) {
      return null;
    }

    const { render, ...restCurrentSubmitter } = currentSubmitter || {};

    const internalProps = {
      prevButtonProps: {
        disabled: loading || !ready,
        ...currentSubmitter?.prevButtonProps,
      },
      nextButtonProps: {
        loading,
        disabled: !ready,
        ...currentSubmitter?.nextButtonProps,
      },
      submitButtonProps: {
        loading,
        disabled: !ready,
        ...currentSubmitter?.submitButtonProps,
      },
      onPrev: (e) => {
        actionCache.set('prev');
        prev();
        currentSubmitter?.onPrev?.(e);
      },
      onNext: (e) => {
        actionCache.set('next');
        currentSubmitter?.onNext?.(e);
      },
      onSubmit: (e) => {
        actionCache.set('submit');
        currentSubmitter?.onSubmit?.(e);
      },
    };

    const dom = (
      <StepsSubmitter
        total={stepsConfig.length}
        current={step}
        {...restCurrentSubmitter}
        form={formArrayRef.current[step]}
        {...internalProps}
      />
    );

    return typeof render === 'function'
      ? render({ ...restCurrentSubmitter, ...internalProps }, dom)
      : dom;
  };

  const submitterDom = renderSubmitter();

  const formDom = childs.map((item: any, index) => {
    const isCurrentIndex = step === index;
    formSubmitterRef.current[index] = item.props?.submitter;
    const name = item.props?.name || `${actionCache.key}${index}`;

    const config = {
      submitter: false,
      contentRender: (items) => (
        <>
          {stepFormRender ? stepFormRender(items) : items}
          {!stepsFormRender && isCurrentIndex ? (
            <Form.Item label=" " colon={false} className={formItemHideLabelClass}>
              {submitterDom}
            </Form.Item>
          ) : null}
        </>
      ),
    };

    return (
      <div
        className={classNames(`${prefixCls}-item`, { [`${prefixCls}-active`]: isCurrentIndex })}
        key={index.toString()}
      >
        {React.cloneElement(item, {
          ...item.props,
          ...formProps,
          ...config,
          step: index,
          name,
        })}
      </div>
    );
  });

  React.useEffect(() => {
    const steps = childs.map((item: any, index) => {
      const { stepProps, title, subTitle, icon, description } = item.props as StepFormProps;
      return {
        title,
        subTitle,
        icon,
        description,
        key: `${index}`,
        ...stepProps,
      };
    });
    setStepsConfig(steps);

    const submitters = formSubmitterRef.current.map((item) => {
      if (item === false || item === null) {
        return false;
      }
      if (typeof item === 'object') {
        return submitter ? { ...submitter, ...item } : item;
      }
      return submitter;
    });
    setSubmitterConfig(submitters);

    return () => {
      actionCache.clear();
    };
  }, []);

  return (
    <div className={prefixCls}>
      <StepsFormContext.Provider
        value={{
          loading,
          setLoading,
          formArrayRef,
          next,
          prev,
          submit,
          onFormFinish,
          actionCache,
          forgetUpdate,
        }}
      >
        {stepsFormRender ? (
          stepsFormRender(
            stepsDom,
            <div className={`${prefixCls}-container`}>{formDom}</div>,
            submitterDom,
          )
        ) : (
          <>
            {stepsDom}
            <div className={`${prefixCls}-container`}>{formDom}</div>
          </>
        )}
      </StepsFormContext.Provider>
    </div>
  );
};

StepsForm.StepForm = StepForm;

export default StepsForm;

import * as React from 'react';
import { Button, Space } from 'antd';
import { ButtonProps } from 'antd/es/button';
import { FormInstance } from 'antd/es/form';
import omit from '../_util/omit';

export interface SubmitterProps<T = {}> {
  resetText?: React.ReactNode;
  resetButtonProps?: ButtonProps & { preventDefault?: boolean };
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
  noReset?: boolean;

  submitText?: React.ReactNode;
  submitButtonProps?: ButtonProps & { preventDefault?: boolean };
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;

  form?: FormInstance;
  render?:
    | ((
        props: SubmitterProps & T,
        dom: JSX.Element[], // eslint-disable-line
      ) => React.ReactNode[] | React.ReactNode | false)
    | false;
}

const Submitter: React.FC<SubmitterProps> = (props) => {
  const {
    onSubmit = () => {},
    onReset = () => {},
    submitText = '提交',
    resetText = '重置',
    submitButtonProps = {},
    resetButtonProps = {},
    noReset = false,
    form,
    render,
  } = props;
  const handleReset = (e) => {
    form?.resetFields();
    // 由于刚重置表单，使用异步可防止立即触发提交操作，导致数据过时而提交失败。
    // refs: https://github.com/ant-design/ant-design/issues/26747
    Promise.resolve().then(() => {
      onReset?.(e);
    });
  };
  const handleSubmit = (e) => {
    form?.submit();
    onSubmit?.(e);
  };

  const dom = React.useMemo(() => {
    const ret = [
      <Button
        key="submit"
        type="primary"
        {...omit(submitButtonProps, ['preventDefault'])}
        onClick={(e) => {
          if (!submitButtonProps?.preventDefault) handleSubmit(e);
          submitButtonProps?.onClick?.(e);
        }}
      >
        {submitText}
      </Button>,
      <Button
        key="reset"
        {...omit(resetButtonProps, ['preventDefault'])}
        onClick={(e) => {
          if (!resetButtonProps?.preventDefault) handleReset(e);
          resetButtonProps?.onClick?.(e);
        }}
      >
        {resetText}
      </Button>,
    ];
    if (noReset) {
      return ret.slice(0, 1);
    }
    return ret;
  }, [resetButtonProps, submitButtonProps, form, onSubmit, submitText, resetText, noReset]);

  const renderDom = render ? render(props, dom) : dom;

  if (!renderDom) {
    return null;
  }
  if (Array.isArray(renderDom)) {
    if (renderDom?.length < 1) {
      return null;
    }
    if (renderDom.length === 1) {
      return renderDom[0];
    }
    return <Space>{renderDom}</Space>;
  }

  return renderDom as React.ReactElement;
};

export default Submitter;

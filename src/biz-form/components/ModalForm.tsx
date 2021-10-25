import * as React from 'react';
import { Modal, Form } from 'antd';
import { useUpdateEffect } from 'rc-hooks';
import { isPromiseLike } from 'util-helpers';
import type { ModalProps } from './antd.interface';
import BaseForm from './BaseForm';
import type { BaseFormProps } from './BaseForm';

export interface ModalFormProps extends Omit<BaseFormProps, 'title'> {
  title?: React.ReactNode;
  width?: ModalProps['width'];
  trigger?: React.ReactElement;
  modalProps?: Omit<ModalProps, 'visible' | 'footer'>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  title,
  width,
  trigger,
  modalProps,
  visible: outVisible,
  onVisibleChange = () => {},
  children,
  submitter,
  onFinish,
  form: formProp,
  ...restProps
}) => {
  const [visible, setVisible] = React.useState(outVisible || false);
  const [form] = Form.useForm();
  const formRef = React.useRef(formProp || form);

  // 受控时，外部的visible改变后，内部改变visible值
  // 非受控时，内部的visible改变后，执行onVisibleChange
  useUpdateEffect(() => {
    if (typeof outVisible === 'undefined') {
      onVisibleChange?.(visible);
    } else {
      setVisible(outVisible);
    }
  }, [visible, outVisible]);

  React.useEffect(() => {
    if (!visible && modalProps?.destroyOnClose) {
      formRef.current.resetFields();
    }
  }, [visible, modalProps?.destroyOnClose]);

  const changeVisible = (isVisible) => {
    if (typeof outVisible !== 'undefined') {
      onVisibleChange?.(isVisible);
    } else {
      setVisible(isVisible);
    }
  };

  return (
    <>
      <BaseForm
        {...restProps}
        form={formProp || form}
        onFinish={async (values) => {
          let ret = typeof onFinish === 'function' ? onFinish(values) : true;
          if (isPromiseLike(ret)) {
            ret = await ret;
          }
          if (ret !== false) {
            changeVisible(false);
            formRef.current.resetFields();
          }
        }}
        submitter={{
          submitText: modalProps?.okText || '确认',
          resetText: modalProps?.cancelText || '取消',
          submitButtonProps: {
            type: (modalProps?.okType as 'text') || 'primary',
          },
          ...submitter,
          resetButtonProps: {
            preventDefault: true,
            ...(submitter ? submitter?.resetButtonProps : {}),
            onClick: (e) => {
              modalProps?.onCancel?.(e);
              changeVisible(false);
              submitter && submitter?.resetButtonProps?.onClick?.(e);
            },
          },
          render: (submitterProps, submitterDom) => {
            if (submitter && typeof submitter?.render === 'function') {
              return submitter.render(submitterProps, submitterDom.reverse());
            }
            return submitterDom.reverse();
          },
        }}
        formRender={(formDom, submitterDom) => (
          <Modal
            title={title}
            width={width || 600}
            centered
            {...modalProps}
            visible={visible}
            footer={submitterDom}
            onCancel={(e) => {
              changeVisible(false);
              modalProps?.onCancel?.(e);
            }}
          >
            {formDom}
          </Modal>
        )}
        {...restProps}
      >
        {children}
      </BaseForm>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: (e) => {
            changeVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default ModalForm;

import * as React from 'react';
import { Modal, Form } from 'antd';
import { ModalProps } from 'antd/es/modal';
import { isPromiseLike } from 'util-helpers';
import BaseForm, { BaseFormProps } from './BaseForm';

export interface ModalFormProps extends Omit<BaseFormProps, 'title'> {
  title?: React.ReactNode;
  width?: ModalProps['width'];
  trigger?: JSX.Element;
  modalProps?: Omit<ModalProps, 'visible' | 'footer'>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  title,
  width,
  trigger,
  modalProps,
  visible: outVisible = false,
  onVisibleChange = () => {},
  children,
  submitter,
  onFinish,
  form: formProp,
  ...restProps
}) => {
  const [visible, setVisible] = React.useState(outVisible);
  const [form] = Form.useForm();
  const formRef = React.useRef(formProp || form);

  React.useEffect(() => {
    onVisibleChange(visible);
  }, [visible]);

  React.useEffect(() => {
    if (!visible && modalProps?.destroyOnClose) {
      formRef.current.resetFields();
    }
  }, [visible, modalProps?.destroyOnClose]);

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
            setVisible(false);
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
              setVisible(false);
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
        contentRender={(formDom, submitterDom) => (
          <Modal
            title={title}
            width={width || 800}
            centered
            {...modalProps}
            visible={visible}
            footer={submitterDom}
            onCancel={(e) => {
              setVisible(false);
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
            setVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default ModalForm;

import * as React from 'react';
import { Drawer, Form } from 'antd';
import { useUpdateEffect } from 'rc-hooks';
import { isPromiseLike } from 'util-helpers';
import type { DrawerProps } from './antd.interface';
import type { BaseFormProps } from './BaseForm';
import BaseForm from './BaseForm';

export interface DrawerFormProps extends Omit<BaseFormProps, 'title'> {
  title?: React.ReactNode;
  width?: DrawerProps['width'];
  trigger?: React.ReactElement;
  drawerProps?: Omit<DrawerProps, 'visible' | 'footer'>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  width,
  trigger,
  drawerProps,
  visible: outVisible,
  onVisibleChange,
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
    if (!visible && drawerProps?.destroyOnClose) {
      formRef.current.resetFields();
    }
  }, [visible, drawerProps?.destroyOnClose]);

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
        formComponentType="DrawerForm"
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
        submitter={typeof submitter === 'undefined' || submitter ? {
          submitText: '确认',
          resetText: '取消',
          ...submitter,
          resetButtonProps: {
            preventDefault: true,
            ...(submitter ? submitter?.resetButtonProps : {}),
            onClick: (e: any) => {
              drawerProps?.onClose?.(e);
              changeVisible(false);
              submitter && submitter?.resetButtonProps?.onClick?.(e);
            }
          },
          render: (submitterProps, submitterDom) => {
            if (submitter && typeof submitter?.render === 'function') {
              return submitter.render(submitterProps, submitterDom.reverse());
            }
            return submitterDom.reverse();
          }
        } : submitter}
        formRender={(formDom, submitterDom) => (
          <Drawer
            title={title}
            width={width || 600}
            {...drawerProps}
            visible={visible}
            footer={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                {submitterDom}
              </div>
            }
            onClose={(e) => {
              changeVisible(false);
              drawerProps?.onClose?.(e);
            }}
          >
            {formDom}
          </Drawer>
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
          }
        })}
    </>
  );
};

export default DrawerForm;

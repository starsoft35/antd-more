import * as React from 'react';
import { Drawer, Form } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { isPromiseLike } from 'util-helpers';
import BaseForm, { BaseFormProps } from './BaseForm';

export interface DrawerFormProps extends Omit<BaseFormProps, 'title'> {
  title?: React.ReactNode;
  width?: DrawerProps['width'];
  trigger?: JSX.Element;
  drawerProps?: Omit<DrawerProps, 'visible' | 'footer'>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  title,
  width,
  trigger,
  drawerProps,
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
    if (!visible && drawerProps?.destroyOnClose) {
      formRef.current.resetFields();
    }
  }, [visible, drawerProps?.destroyOnClose]);

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
          submitText: '确认',
          resetText: '取消',
          ...submitter,
          resetButtonProps: {
            preventDefault: true,
            ...(submitter ? submitter?.resetButtonProps : {}),
            onClick: (e: any) => {
              drawerProps?.onClose?.(e);
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
          <Drawer
            title={title}
            width={width || 600}
            {...drawerProps}
            visible={visible}
            footer={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {submitterDom}
              </div>
            }
            onClose={(e) => {
              setVisible(false);
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
            setVisible(true);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default DrawerForm;

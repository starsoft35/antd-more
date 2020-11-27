import * as React from 'react';
import { Form } from 'antd';
import { FormProps, FormInstance } from 'antd/es/form';
import namePathSet from 'rc-util/lib/utils/set'; // eslint-disable-line import/no-extraneous-dependencies
import { transformFormValues } from '../_util/transform';
import FieldContext, { TransformFn } from '../FieldContext';
import Submitter, { SubmitterProps } from './Submitter';

export interface BaseFormProps extends FormProps {
  contentRender?: (
    items: React.ReactNode[],
    submitter: React.ReactElement<Omit<SubmitterProps, 'form'>> | undefined,
  ) => React.ReactNode;
  loading?: boolean;
  submitter?: false | undefined | null | Omit<SubmitterProps, 'form'>;
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
  pressEnterSubmit?: boolean;
  children?: React.ReactNode;
}

const BaseForm: React.FC<BaseFormProps> = ({
  contentRender,
  form: formProp,
  pressEnterSubmit = true,
  loading = false,
  submitter = {},
  onFinish,
  onReset,
  children,
  ...restProps
}) => {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(formProp || form);

  const transformRecordRef = React.useRef<{ [x: string]: TransformFn | undefined }>({});

  const setFieldTransform = React.useCallback((name, transform, parentListName) => {
    if (name && transform) {
      if (Array.isArray(parentListName) && parentListName.length > 0) {
        const paths: (string | number)[] = [];
        parentListName.forEach((parentItemPath) => {
          if (Array.isArray(parentItemPath)) {
            paths.push(...parentItemPath);
          } else {
            paths.push(parentItemPath);
          }
        });
        if (Array.isArray(name)) {
          paths.push(...name);
        } else {
          paths.push(name);
        }
        transformRecordRef.current = namePathSet(transformRecordRef.current, paths, transform);
      } else if (Array.isArray(name)) {
        transformRecordRef.current = namePathSet(transformRecordRef.current, name, transform);
      } else {
        transformRecordRef.current[String(name)] = transform;
      }
    }
  }, []);

  const submitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;

  const submitterDom = submitter ? (
    <Submitter
      {...submitterProps}
      onReset={onReset}
      form={formRef.current}
      submitButtonProps={{
        loading,
        ...submitterProps?.submitButtonProps,
      }}
      resetButtonProps={{
        disabled: loading,
        ...submitterProps?.resetButtonProps,
      }}
    />
  ) : null;

  const items = React.Children.toArray(children);
  const content = contentRender ? contentRender(items, submitterDom) : items;

  return (
    <FieldContext.Provider value={{ setFieldTransform }}>
      <Form
        onKeyPress={(event) => {
          const buttonHtmlType = submitterProps?.submitButtonProps?.htmlType;
          if (pressEnterSubmit && buttonHtmlType !== 'submit' && event.key === 'Enter') {
            formRef.current?.submit();
          }
        }}
        form={formRef.current}
        onFinish={(values) => {
          if (typeof onFinish !== 'function') {
            return;
          }
          const transValues = transformFormValues(values, transformRecordRef.current);
          // console.log(values, transValues);
          onFinish(transValues);
        }}
        {...restProps}
      >
        {content}
      </Form>
    </FieldContext.Provider>
  );
};

export default BaseForm;

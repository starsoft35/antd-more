import * as React from 'react';
import { Form, Space } from 'antd';
import Item from './Item';
import List from './List';

import BaseForm from './BaseForm';
import type { BaseFormProps } from './BaseForm';

const formItemHideLabelClass = 'antd-more-form-item-hide-label';

export type BizFormProps = BaseFormProps;

const BizForm: React.FC<BizFormProps> & {
  Item: typeof Item;
  List: typeof List;
  useForm: typeof Form.useForm;
  Provider: typeof Form.Provider;
} = ({ submitter, ...restProps }) => {
  const submitterProps = typeof submitter === 'boolean' || !submitter ? {} : submitter;
  const submitterConfig =
    typeof submitter === 'undefined' || submitter
      ? {
          render: (_, dom) => (
            <Form.Item label=" " colon={false} className={formItemHideLabelClass}>
              {Array.isArray(dom) && dom.length > 1 ? <Space>{dom}</Space> : dom}
            </Form.Item>
          ),
          ...submitterProps
        }
      : false;

  return (
    <BaseForm
      submitter={submitterConfig}
      contentRender={(items, submitters) => (
        <>
          {items}
          {submitters}
        </>
      )}
      {...restProps}
    />
  );
};

BizForm.Item = Item;
BizForm.List = List;
BizForm.useForm = Form.useForm;
BizForm.Provider = Form.Provider;

export default BizForm;

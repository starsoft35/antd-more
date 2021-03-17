import * as React from 'react';
import { Form, Space } from 'antd';
import QueryForm from './QueryForm';
import StepsForm from './StepsForm';
import ModalForm from './ModalForm';
import DrawerForm from './DrawerForm';
import Item from './Item';
import List from './List';
import ItemAddress from './ItemAddress';
import ItemCaptcha from './ItemCaptcha';
import ItemCheckbox from './ItemCheckbox';
import ItemColor from './ItemColor';
import ItemDate from './ItemDate';
import ItemDateRange from './ItemDateRange';
import ItemInput from './ItemInput';
import ItemNumber from './ItemNumber';
import ItemPassword from './ItemPassword';
import ItemRadio from './ItemRadio';
import ItemSelect from './ItemSelect';
import ItemSlider from './ItemSlider';
import ItemSwitch from './ItemSwitch';
import ItemTextArea from './ItemTextArea';
import ItemTime from './ItemTime';
import ItemTimeRange from './ItemTimeRange';
import ItemUpload from './ItemUpload';

import BaseForm, { BaseFormProps } from './BaseForm';

const formItemHideLabelClass = 'antd-more-form-item-hide-label';

const BizForm: React.FC<BaseFormProps> & {
  QueryForm: typeof QueryForm;
  StepsForm: typeof StepsForm;
  ModalForm: typeof ModalForm;
  DrawerForm: typeof DrawerForm;
  Item: typeof Item;
  List: typeof List;
  useForm: typeof Form.useForm;
  ItemAddress: typeof ItemAddress;
  ItemCaptcha: typeof ItemCaptcha;
  ItemCheckbox: typeof ItemCheckbox;
  ItemColor: typeof ItemColor;
  ItemDate: typeof ItemDate;
  ItemDateRange: typeof ItemDateRange;
  ItemInput: typeof ItemInput;
  ItemNumber: typeof ItemNumber;
  ItemPassword: typeof ItemPassword;
  ItemRadio: typeof ItemRadio;
  ItemSelect: typeof ItemSelect;
  ItemSlider: typeof ItemSlider;
  ItemSwitch: typeof ItemSwitch;
  ItemTextArea: typeof ItemTextArea;
  ItemTime: typeof ItemTime;
  ItemTimeRange: typeof ItemTimeRange;
  ItemUpload: typeof ItemUpload;
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
          ...submitterProps,
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

BizForm.QueryForm = QueryForm;
BizForm.StepsForm = StepsForm;
BizForm.ModalForm = ModalForm;
BizForm.DrawerForm = DrawerForm;
BizForm.Item = Item;
BizForm.List = List;
BizForm.useForm = Form.useForm;
BizForm.ItemAddress = ItemAddress;
BizForm.ItemCaptcha = ItemCaptcha;
BizForm.ItemCheckbox = ItemCheckbox;
BizForm.ItemColor = ItemColor;
BizForm.ItemDate = ItemDate;
BizForm.ItemDateRange = ItemDateRange;
BizForm.ItemInput = ItemInput;
BizForm.ItemNumber = ItemNumber;
BizForm.ItemPassword = ItemPassword;
BizForm.ItemRadio = ItemRadio;
BizForm.ItemSelect = ItemSelect;
BizForm.ItemSlider = ItemSlider;
BizForm.ItemSwitch = ItemSwitch;
BizForm.ItemTextArea = ItemTextArea;
BizForm.ItemTime = ItemTime;
BizForm.ItemTimeRange = ItemTimeRange;
BizForm.ItemUpload = ItemUpload;

export default BizForm;

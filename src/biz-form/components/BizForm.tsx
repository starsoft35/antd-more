import * as React from 'react';
import { Form, Space } from 'antd';
import QueryForm from './QueryForm';
import Item from './Item';
import List from './List';
import ItemAddress from './ItemAddress';
import ItemBankCard from './ItemBankCard';
import ItemCaptcha from './ItemCaptcha';
import ItemCheckbox from './ItemCheckbox';
import ItemColor from './ItemColor';
import ItemEmail from './ItemEmail';
import ItemDate from './ItemDate';
import ItemDateRange from './ItemDateRange';
import ItemIdCard from './ItemIdCard';
import ItemInput from './ItemInput';
import ItemMobile from './ItemMobile';
import ItemNumber from './ItemNumber';
import ItemPassword from './ItemPassword';
import ItemRadio from './ItemRadio';
import ItemSelect from './ItemSelect';
import ItemTime from './ItemTime';
import ItemTimeRange from './ItemTimeRange';
import ItemUpload from './ItemUpload';
import ItemUserName from './ItemUserName';

import BaseForm, { BaseFormProps } from './BaseForm';

const formItemHideLabelClass = 'antd-more-form-item-hide-label';

const BizForm: React.FC<BaseFormProps> & {
  QueryForm: typeof QueryForm;
  Item: typeof Item;
  List: typeof List;
  useForm: typeof Form.useForm;
  ItemAddress: typeof ItemAddress;
  ItemBankCard: typeof ItemBankCard;
  ItemCaptcha: typeof ItemCaptcha;
  ItemCheckbox: typeof ItemCheckbox;
  ItemColor: typeof ItemColor;
  ItemEmail: typeof ItemEmail;
  ItemDate: typeof ItemDate;
  ItemDateRange: typeof ItemDateRange;
  ItemIdCard: typeof ItemIdCard;
  ItemInput: typeof ItemInput;
  ItemMobile: typeof ItemMobile;
  ItemNumber: typeof ItemNumber;
  ItemPassword: typeof ItemPassword;
  ItemRadio: typeof ItemRadio;
  ItemSelect: typeof ItemSelect;
  ItemTime: typeof ItemTime;
  ItemTimeRange: typeof ItemTimeRange;
  ItemUpload: typeof ItemUpload;
  ItemUserName: typeof ItemUserName;
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
      contentRender={(items, submitter) => (
        <>
          {items}
          {submitter}
        </>
      )}
      {...restProps}
    />
  );
};

BizForm.QueryForm = QueryForm;
BizForm.Item = Item;
BizForm.List = List;
BizForm.useForm = Form.useForm;
BizForm.ItemAddress = ItemAddress;
BizForm.ItemBankCard = ItemBankCard;
BizForm.ItemCaptcha = ItemCaptcha;
BizForm.ItemCheckbox = ItemCheckbox;
BizForm.ItemColor = ItemColor;
BizForm.ItemEmail = ItemEmail;
BizForm.ItemDate = ItemDate;
BizForm.ItemDateRange = ItemDateRange;
BizForm.ItemIdCard = ItemIdCard;
BizForm.ItemInput = ItemInput;
BizForm.ItemMobile = ItemMobile;
BizForm.ItemNumber = ItemNumber;
BizForm.ItemPassword = ItemPassword;
BizForm.ItemRadio = ItemRadio;
BizForm.ItemSelect = ItemSelect;
BizForm.ItemTime = ItemTime;
BizForm.ItemTimeRange = ItemTimeRange;
BizForm.ItemUpload = ItemUpload;
BizForm.ItemUserName = ItemUserName;

export default BizForm;

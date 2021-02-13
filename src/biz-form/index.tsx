import BizForm from './components/BizForm';
import QueryForm, { QueryFormProps } from './components/QueryForm';
import StepsForm, {
  StepsFormProps,
  ActionType as StepsFormActionType,
} from './components/StepsForm';
import ModalForm, { ModalFormProps } from './components/ModalForm';
import DrawerForm, { DrawerFormProps } from './components/DrawerForm';
import List, { BizFormListProps } from './components/List';
import Item, { BizFormItemProps } from './components/Item';
import ItemAddress, { FormItemAddressProps } from './components/ItemAddress';
import ItemBankCard, { FormItemBankCardProps } from './components/ItemBankCard';
import ItemCaptcha, { FormItemCaptchaProps } from './components/ItemCaptcha';
import ItemCheckbox, { FormItemCheckboxProps } from './components/ItemCheckbox';
import ItemColor, { FormItemColorProps } from './components/ItemColor';
import ItemDate, { FormItemDateProps } from './components/ItemDate';
import ItemDateRange, { FormItemDateRangeProps } from './components/ItemDateRange';
import ItemEmail, { FormItemEmailProps } from './components/ItemEmail';
import ItemIdCard, { FormItemIdCardProps } from './components/ItemIdCard';
import ItemInput, { FormItemInputProps } from './components/ItemInput';
import ItemMobile, { FormItemMobileProps } from './components/ItemMobile';
import ItemNumber, { FormItemNumberProps } from './components/ItemNumber';
import ItemPassword, { FormItemPasswordProps } from './components/ItemPassword';
import ItemRadio, { FormItemRadioProps } from './components/ItemRadio';
import ItemSelect, { FormItemSelectProps } from './components/ItemSelect';
import ItemTextArea, { FormItemTextAreaProps } from './components/ItemTextArea';
import ItemTime, { FormItemTimeProps } from './components/ItemTime';
import ItemTimeRange, { FormItemTimeRangeProps } from './components/ItemTimeRange';
import ItemUpload, { FormItemUploadProps } from './components/ItemUpload';
import ItemUserName, { FormItemUserNameProps } from './components/ItemUserName';
import { BaseFormProps } from './components/BaseForm';

export type {
  BaseFormProps as BizFormProps,
  BizFormListProps,
  BizFormItemProps,
  QueryFormProps,
  StepsFormProps,
  ModalFormProps,
  DrawerFormProps,
  FormItemAddressProps as ItemAddressProps,
  FormItemBankCardProps as ItemBankCardProps,
  FormItemCaptchaProps as ItemCaptchaProps,
  FormItemCheckboxProps as ItemCheckboxProps,
  FormItemColorProps as ItemColorProps,
  FormItemDateProps as ItemDateProps,
  FormItemDateRangeProps as ItemDateRangeProps,
  FormItemEmailProps as ItemEmailProps,
  FormItemIdCardProps as ItemIdCardProps,
  FormItemInputProps as ItemInputProps,
  FormItemMobileProps as ItemMobileProps,
  FormItemNumberProps as ItemNumberProps,
  FormItemPasswordProps as ItemPasswordProps,
  FormItemRadioProps as ItemRadioProps,
  FormItemSelectProps as ItemSelectProps,
  FormItemTextAreaProps as ItemTextAreaProps,
  FormItemTimeProps as ItemTimeProps,
  FormItemTimeRangeProps as ItemTimeRangeProps,
  FormItemUploadProps as ItemUploadProps,
  FormItemUserNameProps as ItemUserNameProps,
  StepsFormActionType,
};

export {
  QueryForm,
  StepsForm,
  ModalForm,
  DrawerForm,
  List,
  Item,
  ItemAddress,
  ItemBankCard,
  ItemCaptcha,
  ItemCheckbox,
  ItemColor,
  ItemEmail,
  ItemDate,
  ItemDateRange,
  ItemIdCard,
  ItemInput,
  ItemMobile,
  ItemNumber,
  ItemPassword,
  ItemRadio,
  ItemSelect,
  ItemTextArea,
  ItemTime,
  ItemTimeRange,
  ItemUpload,
  ItemUserName,
};

export default BizForm;

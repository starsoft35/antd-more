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
import ItemCaptcha, { FormItemCaptchaProps } from './components/ItemCaptcha';
import ItemCheckbox, { FormItemCheckboxProps } from './components/ItemCheckbox';
import ItemColor, { FormItemColorProps } from './components/ItemColor';
import ItemDate, { FormItemDateProps } from './components/ItemDate';
import ItemDateRange, { FormItemDateRangeProps } from './components/ItemDateRange';
import ItemInput, { FormItemInputProps } from './components/ItemInput';
import ItemNumber, { FormItemNumberProps } from './components/ItemNumber';
import ItemPassword, { FormItemPasswordProps } from './components/ItemPassword';
import ItemRadio, { FormItemRadioProps } from './components/ItemRadio';
import ItemSelect, { FormItemSelectProps } from './components/ItemSelect';
import ItemSlider, { FormItemSliderProps } from './components/ItemSlider';
import ItemSwitch, { FormItemSwitchProps } from './components/ItemSwitch';
import ItemTextArea, { FormItemTextAreaProps } from './components/ItemTextArea';
import ItemTime, { FormItemTimeProps } from './components/ItemTime';
import ItemTimeRange, { FormItemTimeRangeProps } from './components/ItemTimeRange';
import ItemUpload, { FormItemUploadProps } from './components/ItemUpload';
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
  FormItemCaptchaProps as ItemCaptchaProps,
  FormItemCheckboxProps as ItemCheckboxProps,
  FormItemColorProps as ItemColorProps,
  FormItemDateProps as ItemDateProps,
  FormItemDateRangeProps as ItemDateRangeProps,
  FormItemInputProps as ItemInputProps,
  FormItemNumberProps as ItemNumberProps,
  FormItemPasswordProps as ItemPasswordProps,
  FormItemRadioProps as ItemRadioProps,
  FormItemSelectProps as ItemSelectProps,
  FormItemSliderProps as ItemSliderProps,
  FormItemSwitchProps as ItemSwitchProps,
  FormItemTextAreaProps as ItemTextAreaProps,
  FormItemTimeProps as ItemTimeProps,
  FormItemTimeRangeProps as ItemTimeRangeProps,
  FormItemUploadProps as ItemUploadProps,
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
  ItemCaptcha,
  ItemCheckbox,
  ItemColor,
  ItemDate,
  ItemDateRange,
  ItemInput,
  ItemNumber,
  ItemPassword,
  ItemRadio,
  ItemSelect,
  ItemSlider,
  ItemSwitch,
  ItemTextArea,
  ItemTime,
  ItemTimeRange,
  ItemUpload,
};

export default BizForm;

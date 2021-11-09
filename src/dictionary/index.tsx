import * as React from 'react';
import Dictionary from './Dictionary';
import Select from './Select';
import type { DictionarySelectProps } from './Select';
import Radio from './Radio';
import type { DictionaryRadioProps } from './Radio';
import List from './List';
import type { DictionaryListProps } from './List';
import type { EnumData, DictionaryProps } from './interface';

export type {
  DictionaryProps,
  DictionaryListProps,
  DictionaryRadioProps,
  DictionarySelectProps,
  EnumData
};

/**
 * @deprecated Please use 'BizField' 'BizForm.Select' 'BizForm.Radio'
 */
const DictionaryWrapper: React.FC<DictionaryProps> & {
  /**
   * @deprecated Please use 'BizForm.Select'
   */
  Select: typeof Select;
  /**
   * @deprecated Please use 'BizForm.Radio'
   */
  Radio: typeof Radio;
  List: typeof List;
} = (props) => {
  return <Dictionary {...props} />;
};

DictionaryWrapper.Select = Select;
DictionaryWrapper.Radio = Radio;
DictionaryWrapper.List = List;

export default DictionaryWrapper;

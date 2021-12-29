import * as React from 'react';
import Dictionary from './Dictionary';
import Select, { DictionarySelectProps } from './Select';
import Radio, { DictionaryRadioProps } from './Radio';
import List, { DictionaryListProps } from './List';
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

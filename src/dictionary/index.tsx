import * as React from 'react';
import Dictionary from './Dictionary';
import Select, { DictionarySelectProps } from './Select';
import Radio, { DictionaryRadioProps } from './Radio';
import List, { DictionaryListProps } from './List';
import { EnumData, DictionaryProps } from './interface';

export type {
  DictionaryProps,
  DictionaryListProps,
  DictionaryRadioProps,
  DictionarySelectProps,
  EnumData,
};

const DictionaryWrapper: React.FC<DictionaryProps> & {
  Select: typeof Select;
  Radio: typeof Radio;
  List: typeof List;
} = (props) => {
  return <Dictionary {...props} />;
};

DictionaryWrapper.Select = Select;
DictionaryWrapper.Radio = Radio;
DictionaryWrapper.List = List;

export default DictionaryWrapper;

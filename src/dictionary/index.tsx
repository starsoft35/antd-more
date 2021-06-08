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

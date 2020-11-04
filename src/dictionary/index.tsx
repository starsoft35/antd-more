import React from 'react';
import Dictionary, { DictionaryProps } from './Dictionary';
import Select from './Select';
import Radio from './Radio';
import List from './List';

type WrapperFC<P> = React.FC<P> & {
  Select: typeof Select;
  Radio: typeof Radio;
  List: typeof List;
};

const DictionaryWrapper: WrapperFC<DictionaryProps> = (props) => <Dictionary {...props} />;

DictionaryWrapper.Select = Select;
DictionaryWrapper.Radio = Radio;
DictionaryWrapper.List = List;

export default DictionaryWrapper;

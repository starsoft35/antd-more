import type { HtmlHTMLAttributes, ReactNode } from 'react';
import type { TagProps, BadgeProps, SpaceProps } from 'antd';

type AliasType = { alias?: ReactNode };

type EnumItem<ValueType = any> = {
  label?: ReactNode;
  value?: ValueType;
  badge?: Omit<BadgeProps, 'status'> & AliasType & { status?: string };
  tag?: TagProps & AliasType;
  text?: HtmlHTMLAttributes<HTMLSpanElement> & AliasType;
  [key: string]: any;
};

export type EnumData<ValueType = any> = EnumItem<ValueType>[];

export type DictionaryFieldNames = {
  label?: string;
  value?: string;
  [key: string]: any;
};

export interface DictionaryProps<ValueType = any> extends SpaceProps {
  valueEnum: EnumData<ValueType>;
  value?: ValueType | ValueType[];
  defaultLabel?: ReactNode;
  type?: 'text' | 'tag' | 'badge';
  propsName?: string;
  fieldNames?: DictionaryFieldNames;
  match?: (itemValue: ValueType, currentValue: ValueType) => boolean;
}

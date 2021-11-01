import type { HtmlHTMLAttributes } from 'react';
import type { TagProps, BadgeProps } from 'antd';

type AliasType = { alias?: string };

interface EnumItem {
  /**
   * @deprecated Please use 'label'
   */
  name?: string;
  label?: string;
  value: any;
  badge?: Omit<BadgeProps, 'status'> & AliasType & { status?: string };
  tag?: TagProps & AliasType;
  text?: HtmlHTMLAttributes<HTMLSpanElement> & AliasType;
  [key: string]: any;
}

export type EnumData = EnumItem[];
export interface DictionaryProps {
  data: EnumData;
  value?: any;
  /**
   * @deprecated Please use 'defaultLabel'
   */
  defaultName?: any;
  defaultLabel?: any;
  type?: 'text' | 'tag' | 'badge';
  optionName?: string;
  [key: string]: any;
}

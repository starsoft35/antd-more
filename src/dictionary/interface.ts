import type { HtmlHTMLAttributes, ReactNode } from 'react';
import type { TagProps, BadgeProps } from 'antd';

type AliasType = { alias?: ReactNode };

interface EnumItem {
  /**
   * @deprecated Please use 'label'
   */
  name?: ReactNode;
  label?: ReactNode;
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
  defaultName?: ReactNode;
  defaultLabel?: ReactNode;
  type?: 'text' | 'tag' | 'badge';
  optionName?: string;
  [key: string]: any;
}

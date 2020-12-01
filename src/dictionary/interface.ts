interface EnumItem {
  name: string;
  value: any;
  badge?: {
    status?: string;
    color?: string;
    [key: string]: any;
  };
  tag?: {
    color?: string;
    [key: string]: any;
  };
  text?: {
    style?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export type EnumData = EnumItem[];
export interface DictionaryProps {
  data: EnumData;
  value?: any;
  defaultName?: any;
  type?: 'text' | 'tag' | 'badge';
  optionName?: string;
  [key: string]: any;
}

export type ValueType = string | number;

export type TreeTableDataItem = {
  label?: React.ReactNode;
  value?: ValueType;
  disabled?: boolean;
  children?: TreeTableDataItem[];
  [key: string]: any;
};

export type TreeTableData = TreeTableDataItem[];

export type TreeTableFieldNames = {
  label?: string;
  value?: string;
  children?: string;
};

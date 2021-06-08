import * as React from 'react';
import type { TableProps } from 'antd';

type SizeType = TableProps<any>['size'];

export type TableContextProps = {
  size?: SizeType;
  setSize?: (size: SizeType) => void;
  reload?: () => void;
  rootRef?: React.RefObject<HTMLDivElement>;
  isFullScreen?: boolean;
  setFullScreen?: (isFullScreen: boolean) => void;
  columns?: TableProps<any>['columns'];
  setColumns?: (columns: TableProps<any>['columns']) => void;
};

const TableContext = React.createContext<TableContextProps>({});

export default TableContext;

import * as React from 'react';
import BizTable from './BizTable';
import type { BizTableProps } from './BizTable';
import EditableBizTable from './EditableBizTable';
import type {
  EditableBizTableProps,
  EditableActionType,
  EditableBizTableActionType,
  EditableOptions,
  EditableBizTableEditable
} from './EditableBizTable';
import type {
  ActionType,
  BizTableActionType,
  Request,
  BizTableRequest,
  BizColumnType,
  BizTableColumnType
} from './interface';

function BizTableWrap<RecordType extends object = any>(props: BizTableProps<RecordType>) {
  return <BizTable<RecordType> {...props} />;
}

BizTableWrap.EditableBizTable = EditableBizTable;

export type {
  ActionType,
  Request,
  BizColumnType,
  EditableActionType,
  EditableOptions,
  BizTableActionType,
  BizTableRequest,
  BizTableColumnType,
  BizTableProps,
  EditableBizTableProps,
  EditableBizTableActionType,
  EditableBizTableEditable
};

export default BizTableWrap;

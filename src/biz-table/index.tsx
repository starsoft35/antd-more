import * as React from 'react';
import BizTable, { BizTableProps } from './BizTable';
import EditableBizTable, {
  EditableBizTableProps,
  EditableActionType,
  EditableOptions,
} from './EditableBizTable';

import { ActionType, Request, BizTableRequest, BizColumnType } from './interface';

function BizTableWrap<RecordType extends object = any>(props: BizTableProps<RecordType>) {
  return <BizTable<RecordType> {...props} />;
}

BizTableWrap.EditableBizTable = EditableBizTable;

export type {
  ActionType,
  Request,
  BizTableRequest,
  BizColumnType,
  BizTableProps,
  EditableBizTableProps,
  EditableActionType,
  EditableOptions,
};

export default BizTableWrap;

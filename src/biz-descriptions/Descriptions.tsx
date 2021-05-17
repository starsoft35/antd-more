import * as React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import BizField, { ValueType, EnumData, BizFieldProps } from '../biz-field';
import WithTooltip from './WithTooltip';

export interface BizDescriptionsItemProps extends DescriptionsItemProps {
  valueType?: ValueType;
  valueEnum?: EnumData;
  tooltip?: string;
  field?:
    | Partial<BizFieldProps>
    | ((text: any, record: Record<string | number, any>, index: number) => Partial<BizFieldProps>);
  key?: React.ReactText;
  dataSource?: Record<string | number, any>;
  index?: number;
}

function createDescriptionsItem({
  valueType,
  valueEnum,
  children,
  label,
  tooltip,
  field,
  dataSource,
  index,
  ...restProps
}: BizDescriptionsItemProps) {
  const fieldProps = typeof field === 'function' ? field(children, dataSource, index) : field;

  return (
    <Descriptions.Item
      label={label && tooltip ? <WithTooltip label={label} tooltip={tooltip} /> : label}
      {...restProps}
    >
      <BizField value={children} valueType={valueType} valueEnum={valueEnum} {...fieldProps} />
    </Descriptions.Item>
  );
}

const DescriptionsItem: React.FC<BizDescriptionsItemProps> = (props) =>
  createDescriptionsItem(props);

type DataIndex = string | number;

export interface BizDescriptionsColumnItemProps extends Omit<BizDescriptionsItemProps, 'children'> {
  dataIndex?: DataIndex | DataIndex[];
  title?: React.ReactNode;
  render?: (value: any, dataSource: Record<DataIndex, any>, index: number) => React.ReactNode;
}

export interface BizDescriptionsProps extends DescriptionsProps {
  dataSource?: Record<DataIndex, any>;
  columns?: BizDescriptionsColumnItemProps[];
  tooltip?: string;
}

const BizDescriptions: React.FC<BizDescriptionsProps> & {
  Item: typeof DescriptionsItem;
} = ({ dataSource, columns, children, title, tooltip, column, ...restProps }) => {
  const defaultProps = React.useMemo(
    () => ({
      title: title && tooltip ? <WithTooltip label={title} tooltip={tooltip} /> : title,
      column: column || { xs: 1, md: 2, lg: 3, xxl: 4 },
    }),
    [title, tooltip, column],
  );

  const currentDom = React.Children.map(children, (item: any) =>
    createDescriptionsItem(item.props),
  );

  if (
    typeof dataSource === 'object' &&
    dataSource !== null &&
    Array.isArray(columns) &&
    columns.length > 0
  ) {
    return (
      <Descriptions {...defaultProps} {...restProps}>
        {currentDom}
        {columns.map(
          (
            { title: internalTitle, label: internalLabel, dataIndex, render, ...restColItem },
            index,
          ) => {
            let currentDataValue;
            if (Array.isArray(dataIndex)) {
              currentDataValue = dataIndex.map((subItem) => dataSource[subItem]);
            } else if (typeof dataIndex === 'string' || typeof dataIndex === 'number') {
              currentDataValue = dataSource[dataIndex];
            } else {
              currentDataValue = dataSource;
            }

            const child =
              typeof render === 'function'
                ? render(currentDataValue, dataSource, index)
                : currentDataValue;

            return createDescriptionsItem({
              key: index,
              label: internalLabel || internalTitle,
              children: child,
              dataSource,
              index,
              ...restColItem,
            });
          },
        )}
      </Descriptions>
    );
  }

  return (
    <Descriptions {...defaultProps} {...restProps}>
      {currentDom}
    </Descriptions>
  );
};

BizDescriptions.Item = DescriptionsItem;

export default BizDescriptions;

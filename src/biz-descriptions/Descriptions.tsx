import * as React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/es/descriptions';
import { DescriptionsItemProps } from 'antd/es/descriptions/Item';
import BizField, { ValueType, EnumData } from '../biz-field';
import WithTooltip from './WithTooltip';

interface ItemProps extends DescriptionsItemProps {
  valueType?: ValueType;
  valueEnum?: EnumData;
  tooltip?: string;
  key?: React.ReactText;
}

function createDescriptionsItem({
  valueType,
  valueEnum,
  children,
  label,
  tooltip,
  ...restProps
}: ItemProps) {
  return (
    <Descriptions.Item
      label={label && tooltip ? <WithTooltip label={label} tooltip={tooltip} /> : label}
      {...restProps}
    >
      <BizField value={children} valueType={valueType} valueEnum={valueEnum} />
    </Descriptions.Item>
  );
}

const DescriptionsItem: React.FC<ItemProps> = (props) => createDescriptionsItem(props);

type DataIndex = string | number;

interface ColumnItem extends Omit<ItemProps, 'children'> {
  dataIndex?: DataIndex | DataIndex[];
  title?: React.ReactNode;
  render?: (value: any, dataSource: Record<DataIndex, any>, index: number) => React.ReactNode;
}

export interface BizDescriptionsProps extends DescriptionsProps {
  dataSource?: Record<DataIndex, any>;
  columns?: ColumnItem[];
  tooltip?: string;
}

const BizDescriptions: React.FC<BizDescriptionsProps> & {
  Item: typeof DescriptionsItem;
} = ({ dataSource, columns, children, title, tooltip, column, ...restProps }) => {
  const defaultProps = React.useMemo(
    () => ({
      title: <WithTooltip label={title} tooltip={tooltip} />,
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

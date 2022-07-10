import * as React from 'react';
import type { BizFormItemInputProps } from 'antd-more';
import { BizFormItemInput } from 'antd-more';
import type { PopoverProps } from 'antd';
import { Popover } from 'antd';

interface ItemInputPopoverProps extends BizFormItemInputProps {
  popoverProps?: PopoverProps;
}

const ItemInputPopover: React.FC<ItemInputPopoverProps> = ({ popoverProps, ...restProps }) => {
  return (
    <BizFormItemInput
      renderField={(dom) => {
        const WrapperInput = (fieldProps: any) => {
          return (
            <Popover trigger="focus" {...popoverProps}>
              {React.cloneElement(dom, fieldProps)}
            </Popover>
          );
        };
        return <WrapperInput />;
      }}
      {...restProps}
    />
  );
};

export default ItemInputPopover;

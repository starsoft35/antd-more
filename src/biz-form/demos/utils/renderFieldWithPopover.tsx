import type { PopoverProps } from 'antd';
import { Popover } from 'antd';
import React from 'react';

function renderFieldWithPopover(popoverProps?: PopoverProps) {
  return (dom: React.ReactElement) => {
    const WrapperComp = (fieldProps: any) => {
      return (
        <Popover trigger="focus" {...popoverProps}>
          {React.cloneElement(dom, fieldProps)}
        </Popover>
      );
    };
    return <WrapperComp />;
  };
}

export default renderFieldWithPopover;

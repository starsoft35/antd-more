import * as React from 'react';

import './index.less';

const prefixCls = 'antd-more-form-item-wrapper';

export interface WrapperFormElementProps extends Record<string, any> {
  before?: React.ReactNode;
  after?: React.ReactNode;
  trigger?: string;
  align?: React.CSSProperties['alignItems'];
}

const WrapperFormElement: React.FC<WrapperFormElementProps> = ({
  after,
  before,
  align,
  trigger = 'onChange',
  children,
  ...restProps
}) => {
  const handleTrigger = React.useCallback(
    (...args) => {
      if (React.isValidElement(children)) {
        children?.props?.[trigger]?.(...args);
      }
      restProps?.[trigger]?.(...args);
    },
    [children, restProps, trigger]
  );

  const triggerProp = React.useMemo(
    () =>
      trigger
        ? {
          [trigger]: handleTrigger
        }
        : {},
    [handleTrigger, trigger]
  );

  const childrenView = React.isValidElement(children)
    ? React.cloneElement(
      children as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
      {
        ...restProps,
        ...triggerProp,
        style: {
          flex: 1,
          ...restProps?.style
        }
      }
    )
    : (children as any);

  if (!after && !before) {
    return childrenView === void 0 ? null : childrenView;
  }

  const styles = align
    ? {
      alignItems: align
    }
    : {};

  return (
    <div className={prefixCls} style={styles}>
      {before && <div className={`${prefixCls}-before`}>{before}</div>}
      {childrenView}
      {after && <div className={`${prefixCls}-after`}>{after}</div>}
    </div>
  );
};

export default WrapperFormElement;

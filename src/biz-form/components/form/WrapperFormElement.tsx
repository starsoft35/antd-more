import * as React from 'react';

import './index.less';

const prefixCls = 'antd-more-form-wrapper-form-el';

export interface WrapperFormElementProps extends Record<string, any> {
  before?: React.ReactNode;
  after?: React.ReactNode;
  align?: React.CSSProperties['alignItems'];
}

const WrapperFormElement: React.FC<WrapperFormElementProps> = ({
  after,
  before,
  align,
  children,
  ...restProps
}) => {
  const childrenView = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
        {
          ...restProps,
          style: {
            flex: 1,
            ...restProps?.style
          }
        }
      )
    : (children as any);

  if (!after && !before) {
    return childrenView;
  }

  const styles = align
    ? {
        alignItems: align
      }
    : {};

  return (
    <div className={prefixCls} style={styles}>
      {before && <div style={{ margin: '0 8px' }}>{before}</div>}
      {childrenView}
      {after && <div style={{ margin: '0 8px' }}>{after}</div>}
    </div>
  );
};

export default WrapperFormElement;

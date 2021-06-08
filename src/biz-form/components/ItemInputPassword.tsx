import * as React from 'react';
import ItemPassword from './ItemPassword';
import type { FormItemPasswordProps } from './ItemPassword';

const ItemInputPassword: React.FC<FormItemPasswordProps> = (props) => {
  return <ItemPassword validated={false} {...props} />;
};

export default ItemInputPassword;

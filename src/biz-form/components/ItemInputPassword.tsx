import * as React from 'react';
import ItemPassword, { FormItemPasswordProps } from './ItemPassword';

const ItemInputPassword: React.FC<FormItemPasswordProps> = (props) => {
  return <ItemPassword validated={false} {...props} />;
};

export default ItemInputPassword;

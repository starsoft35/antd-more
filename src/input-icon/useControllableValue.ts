import * as React from 'react';
import { useUpdateEffect } from 'rc-hooks';

export type Options = {
  defaultValue?: string;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
};

function useControllableValue<T = any>(props: Record<string, any> = {}, options?: Options) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options || {};

  const hasValueProp = valuePropName in props;
  const value = props[valuePropName];
  const [state, setState] = React.useState<T>(() => {
    if (hasValueProp) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  });

  useUpdateEffect(() => {
    if (hasValueProp) {
      setState(value);
    }
  }, [value, valuePropName]);

  const handleSetState = React.useCallback(
    (v: T, ...args: any[]) => {
      if (!hasValueProp) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger](v, ...args);
      }
    },
    [props, valuePropName, trigger],
  );

  return [hasValueProp ? value : state, handleSetState];
}

export default useControllableValue;

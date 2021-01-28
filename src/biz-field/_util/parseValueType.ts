import { ValueType } from '../interface';

function parseValueType(
  valueType: ValueType,
  value?: any,
): {
  type: string;
} & Record<string | number, any> {
  let type: string = '';
  let rest = {};

  if (typeof valueType === 'string') {
    type = valueType;
  } else {
    let params: any;
    if (typeof valueType === 'function') {
      params = valueType(value);
    } else if (typeof valueType === 'object') {
      params = valueType;
    }
    if (typeof params === 'object') {
      const { type: customType, ...restParams } = params;
      type = customType;
      rest = restParams;
    }
  }

  return {
    type,
    ...rest,
  };
}

export default parseValueType;

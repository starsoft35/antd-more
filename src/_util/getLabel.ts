import React from 'react';

function getDeepChildrenText(obj: React.ReactElement) {
  let ret = '';
  const { children } = obj.props;

  if (children && children.length > 0) {
    children.forEach((item) => {
      if (typeof item === 'string') {
        ret += item;
      } else if (React.isValidElement(item)) {
        ret += getDeepChildrenText(item);
      }
    });
  }

  return ret;
}

function getLabel(obj: any): any {
  if (React.isValidElement(obj)) {
    return getDeepChildrenText(obj);
  }

  return obj;
}

export default getLabel;

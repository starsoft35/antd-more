function normalizeWhiteSpace(val: string | undefined | any): any {
  if (typeof val === 'string') {
    return val.replace(/\s+/g, '');
  }
  return val;
}

export default normalizeWhiteSpace;

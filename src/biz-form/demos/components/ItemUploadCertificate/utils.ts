
export const isPDFFile = (file: any) => {
  if (file.type === 'application/pdf') {
    return true;
  }
  const ext = (file?.name || '').split('.').at(-1);
  if (ext.toLowerCase() === 'pdf') {
    return true;
  }
  return false;
}

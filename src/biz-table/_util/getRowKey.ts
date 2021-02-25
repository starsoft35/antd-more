const getRowKey = (rowKey) => {
  if (typeof rowKey === 'function') {
    return rowKey;
  }
  return (record, index?) => (typeof rowKey === 'string' ? record[rowKey] : record.key ?? index);
};

export default getRowKey;

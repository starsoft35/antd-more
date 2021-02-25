let id = 0;

function createUniqueId() {
  id += 1;
  return `${Date.now()}${id}`;
}

export default createUniqueId;

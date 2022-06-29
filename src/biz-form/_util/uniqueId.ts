const randomStr = Math.random().toString(16).substring(2);
let id = 1;

function uniqueId(prefix = '') {
  ++id;
  return `${prefix}${randomStr}${id}`;
}

export default uniqueId;

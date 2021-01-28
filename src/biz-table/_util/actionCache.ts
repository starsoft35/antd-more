let id = 0;

// 创建一个操作缓存key
function createActionCacheKey() {
  id += 1;
  return `bizTable${id}`;
}

const actionCache = {};

export { createActionCacheKey };

export default actionCache;

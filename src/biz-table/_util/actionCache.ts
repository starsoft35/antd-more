import createUniqueId from './createUniqueId';

// 创建一个操作缓存key
function createActionCacheKey() {
  return `bizTable${createUniqueId()}`;
}

const actionCache = {};

export { createActionCacheKey };

export default actionCache;

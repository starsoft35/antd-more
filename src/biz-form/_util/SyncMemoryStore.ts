// const stepsFormActionStore = SyncMemoryStore.create();

// stepsFormActionStore.key;
// stepsFormActionStore.get();
// stepsFormActionStore.set();
// stepsFormActionStore.clear();

let id = 0;
const memoryCache = {};
const createKey = () => {
  id += 1;
  return `__sync-memory-store-key_${id}`;
};

class SyncMemoryStore<T = any> {
  constructor(key?: string) {
    this.key = key || createKey();
  }

  key: string;

  get(): T {
    return memoryCache[this.key];
  }

  set(data: T) {
    memoryCache[this.key] = data;
  }

  clear() {
    delete memoryCache[this.key];
  }

  static create = <D = any>(key?: string) => {
    return new SyncMemoryStore<D>(key);
  };
}

export default SyncMemoryStore;

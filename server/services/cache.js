const cacheStore = new Map();

export const getCache = (key) => {
  const cached = cacheStore.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() > cached.expiry) {
    cacheStore.delete(key);
    return null;
  }
  return cached.data;
};

export const setCache = (key, data, ttlMs) => {
  cacheStore.set(key, { data, expiry: Date.now() + ttlMs });
};

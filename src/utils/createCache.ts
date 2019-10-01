export default function() {
  const primitiveCache = {};
  const complexCache = new WeakMap();

  return {
    set(key: any, value: any) {
      if (isCachePrimitive(key)) {
        primitiveCache[key] = value;
      } else {
        complexCache.set(key, value);
      }
    },

    get(key: any) {
      return isCachePrimitive(key)
        ? primitiveCache[key]
        : complexCache.get(key);
    },

    has(key: any) {
      return isCachePrimitive(key)
        ? key in primitiveCache
        : complexCache.has(key);
    }
  };
}

function isCachePrimitive(key: any) {
  return typeof key === "number" || typeof key === "string";
}

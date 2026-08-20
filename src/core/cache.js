const ImageCache = {
  _cache: {},
  _loading: {},

  get(path) {
    if (this._cache[path]) return this._cache[path];
    if (!this._loading[path]) {
      this._loading[path] = loadImage(path);
    }
    return this._loading[path];
  },

  load(path) {
    if (!this._cache[path]) {
      this._cache[path] = loadImage(path);
    }
    return this._cache[path];
  },

  preload(paths) {
    for (const path of paths) {
      this._cache[path] = loadImage(path);
    }
  }
};

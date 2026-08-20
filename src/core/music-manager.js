const MusicManager = {
  _tracks: {
    takeover:      { path: './assets/music/take-over.mp3',         vol: 0.05 },
    goingdown:     { path: './assets/music/going-down-now.mp3',    vol: 0.25 },
    axegrind:      { path: './assets/music/axe-to-grind.mp3',      vol: 0.1  },
    massdestruc:   { path: './assets/music/break-out-of.mp3',      vol: 0.1  },
    lastsur:       { path: './assets/music/last-surprise.mp3',     vol: 0.25 },
    youstrong:     { path: './assets/music/you-are-stronger.mp3',  vol: 0.1  },
    fullmoon:      { path: './assets/music/full-moon-full-life.mp3', vol: 0.1  },
    colornightins: { path: './assets/music/color-your-night.mp3',  vol: 0.1  },
    roadlesstaken: { path: './assets/music/road-less-taken.mp3',   vol: 0.1  },
  },
  _loaded: {},
  _pendingPlay: {},

  preload(key) {
    const t = this._tracks[key];
    this._loaded[key] = loadSound(t.path);
    this._loaded[key].setVolume(t.vol);
  },

  load(key) {
    if (!this._loaded[key]) {
      const self = this;
      const t = this._tracks[key];
      this._loaded[key] = loadSound(t.path, function onReady() {
        self._loaded[key].setVolume(t.vol);
        if (self._pendingPlay[key]) {
          delete self._pendingPlay[key];
          self._loaded[key].play();
        }
      });
    }
    return this._loaded[key];
  },

  play(key) {
    const snd = this.load(key);
    if (snd.isLoaded()) {
      if (!snd.isPlaying()) snd.play();
    } else {
      this._pendingPlay[key] = true;
    }
  },

  stop(key) {
    delete this._pendingPlay[key];
    if (this._loaded[key] && this._loaded[key].isLoaded()) {
      this._loaded[key].stop();
    }
  },

  pause(key) {
    delete this._pendingPlay[key];
    if (this._loaded[key] && this._loaded[key].isLoaded()) {
      this._loaded[key].pause();
    }
  },

  get(key) {
    return this._loaded[key] || null;
  }
};

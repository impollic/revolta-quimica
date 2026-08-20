const MusicManager = {
  _tracks: {
    takeover:      { path: './musicasPersona/takeover.mp3',      vol: 0.05 },
    goingdown:     { path: './musicasPersona/goingdown.mp3',     vol: 0.25 },
    massdestruc:   { path: './musicasPersona/breakout.mp3',      vol: 0.1  },
    lastsur:       { path: './musicasPersona/lastsur.mp3',       vol: 0.25 },
    youstrong:     { path: './musicasPersona/youstrong.mp3',     vol: 0.1  },
    fullmoon:      { path: './musicasPersona/fullmoon.mp3',      vol: 0.1  },
    axegrind:      { path: './musicasPersona/axegrind.mp3',      vol: 0.1  },
    colornightins: { path: './musicasPersona/colornightins.mp3', vol: 0.1  },
    colornight:    { path: './musicasPersona/colornight.mp3',    vol: 0.1  },
    roadlesstaken: { path: './musicasPersona/roadlesstaken.mp3', vol: 0.1  },
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
      snd.play();
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

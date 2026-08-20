# Revolta Quimica — Performance Audit & Refactor Plan

## Repository

- Path: `C:\Users\Apollo Developer\Projetos\correct-projects\revolta-quimica`
- Tech: p5.js browser game (Undertale/Touhou-inspired fan game)
- Structure: 9 JS source files (~60KB code), 78 total files, 33.5MB of assets
- HTML entry: `index.html` (device selection) -> `jogo.html` (game)

## Current Problems

| Problem | Severity | Root Cause |
|---------|----------|------------|
| ~1.5 GB RAM usage | Critical | All 10 music tracks decoded to PCM at startup (~300MB) + hundreds of duplicate `loadImage()` calls creating new p5.Image objects with decoded pixel data (~100-300MB+) + GIF frames stored as full RGBA buffers |
| ~200 MB transferred / 75+ requests | Critical | All 31.6MB of MP3s loaded eagerly + remote itch.zone animated GIF in CSS + all images loaded at startup |
| Slow on weak hardware | High | Frame-rate dependent movement (no deltaTime) + array mutation during forEach + `loadImage()` called in draw-loop conditions |
| Broken architecture | High | 13 `if (state.ativo)` checks per frame + interleaved music logic + no image caching + device selection via localStorage DOM rewrite |

---

## Confirmed Root Causes (Detailed)

### 1. All music loaded at startup (`Principal.js:8-22`)

`preload()` calls `loadSound()` on all 10 MP3 files (31.6MB total). Each decoded to PCM AudioBuffer: ~300MB RAM. p5.sound keeps all in memory simultaneously.

### 2. Duplicate `loadImage()` calls everywhere

- `Atom` constructor (`Classes.js:136`) — called 105+ times per battle
- `FeixeInorganico` constructor (`Ataques.js:112-149`) — ~63 times at startup
- Attack constructors (`Ataques.js`) — 200+ times when attacks are created
- `reset()` (`Funcoes.js:111-145`) — every battle transition
- `hanSpriteGame()` (`Funcoes.js:148-163`) — returns `loadImage()` each call
- `draw()` loop conditions (`Principal.js:187-188`) — fires during gameplay
- `Caixa` constructor (`Classes.js:14-16`) — every UI element with an image

### 3. Array mutation during `forEach` (`Principal.js:281-305`, `Classes.js:146-156`)

`atomos.splice()` inside `forEach` causes skipped elements and double-processing bugs.

### 4. External animated GIF (`style.css:27`)

`background-image: url('https://img.itch.zone/...')` loads an animated GIF from itch.zone on every page load.

### 5. No deltaTime usage

All movement is hardcoded per-frame. Breaks at non-60fps.

### 6. Device selection (`index.html`, `Antecede.js`)

Separate landing page that rewrites entire DOM based on `localStorage.getItem('dispositivo')`.

---

## Implementation Plan

### Phase 1: Image Caching (biggest quick win)

Create an `ImageCache` object in a new file `js/core/cache.js`. Load each unique image ONCE in `preload()`, store by key. Replace ALL `loadImage()` calls with cache lookups.

Images to cache: all atom sprites (3), beam sprites (8), entalpia (2), ionizante (1), oxired (1), electrostatic sphere (1), Hann sprites (8 GIFs), character sprites (pollic2/3/ATK GIFs, emi32v1/v2/v3, emilly), intro.png, jogar.png, pendul.gif, pendulQ.png.

### Phase 2: Lazy Music Loading

Create a `musicManager` that stores track URLs and loads on first use. Only load `fullmoon.mp3` at startup. Load battle/selection/lore music on first transition. Load cutscene video only when lab scene is entered.

### Phase 3: Fix Array Mutation Bug

In `Principal.js:281-305` and `Classes.js:146-156`, replace `forEach`+`splice` with reverse `for` loop or collect-to-remove-then-filter pattern.

### Phase 4: Remove Device Selection

Make `jogo.html` the sole entry point. Auto-detect touch (`'ontouchstart' in window || navigator.maxTouchPoints > 0`). Conditionally show mobile buttons. Remove `Antecede.js` DOM rewrite, `index.html` device page, localStorage device logic. Remove `pc.png`, `celular.png`.

### Phase 5: DeltaTime Movement

Multiply all velocities by `deltaTime / 16.667` in: `Personagem.mover()`, `Atom.mover()`, `Atom.colidir()`, all `FeixeInorganico.mover()`, all attack `mover()` methods, `Descarga_Atomica.moverPara()`, `Descarga_Atomica_Eletricidade.moverPara()`, `Area_Estequiometrica.mover()`, `Area_Estequiometrica.aumentarDiametro()`, `CaixaDialogo.passarFrase()`.

### Phase 6: Remove Dead Code/Assets

- Remove `fonteSans` load (`Principal.js:26`) — never used
- Remove `pendulQ.ico` (192KB, not used as favicon)
- Remove `Battle active.png` if unused
- Remove remote itch.zone GIF from `style.css:27` — replace with `background-color: #000`
- Remove duplicate `textFont()` in `setup()` (`Principal.js:37`)

### Phase 7: Audio Management Refactor

Replace 40+ lines of interleaved play/pause/stop in `Controle.js:irPara()` with a state-based music manager. Each scene maps to one track; transitions handle stop/start cleanly.

### Phase 8: State Machine Refactor

Replace `if (state.ativo)` x 13 checks in `draw()` (`Principal.js:91-393`) with single `currentState` reference. Each scene has `update()`, `draw()`, `enter()`, `exit()`. `irPara()` becomes `currentState.exit(); currentState = newState; newState.enter()`.

### Phase 9: Asset Restructure

```
assets/
  audio/music/*.mp3
  audio/sfx/*.mp3
  sprites/player/
  sprites/enemy/
  sprites/attacks/
  sprites/ui/
  sprites/effects/
  fonts/
  cursors/
js/
  core/ (main.js, state.js, input.js, cache.js, utils.js)
  entities/ (player.js, enemy.js, ui.js)
  attacks/ (attacks.js, descarga.js, stoichiometry.js)
```

Rename assets only if ALL code references are updated simultaneously.

### Phase 10: Convert GIFs to Sprite Sheets (optional)

GIF frames stored as separate RGBA buffers = massive RAM. Sprite sheet = one image, use `image()` with source-rect. High effort, high memory savings.

---

## Constraints

- Preserve ALL existing gameplay, visuals, mechanics, and audio
- No new frameworks (no React, Phaser, etc.)
- Keep using p5.js + vanilla JS
- Do not upgrade p5.js version without testing compatibility
- Test every phase before moving to the next

## Verification Checklist

After each phase:

- [ ] Chrome DevTools Memory heap snapshot
- [ ] Network tab request count and transfer size
- [ ] Performance recording during gameplay (target: 30+ FPS on 4x CPU throttle)
- [ ] Full playthrough of all 4 attack phases
- [ ] All dialogue transitions work
- [ ] All music transitions work (no overlap, no silence gaps)
- [ ] Attack animations trigger correctly
- [ ] Player movement feels the same
- [ ] Game over and restart works
- [ ] Deploy to GitHub Pages and Vercel, verify load time < 5s on 3G

## Targets

| Metric | Before | After |
|--------|--------|-------|
| RAM usage | ~1.5 GB | < 200 MB |
| Initial download | ~33 MB | < 5 MB |
| Initial requests | 75+ | < 30 |
| FPS on weak hardware | < 20 | 30+ |

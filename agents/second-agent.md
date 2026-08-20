# Revolta Quimica - Second Agent Report

## Changes Made (2026-08-20)

### Bug Fix: hanCoraSprite undefined (CRITICAL)
- **File**: `Arquivos/Funcoes.js:29`
- **Issue**: `hanCoraSprite` was referenced but never defined — left over from Phase 1 refactor
- **Fix**: Replaced `hanCoraSprite` with `ImageCache.get("./Sprites/Hann/hanCora.gif")`
- **Impact**: Fixed crash at end of battle (Act 1) — `ReferenceError: hanCoraSprite is not defined`

### Bug Fix: Cache key mismatch (HIGH)
- **File**: `Arquivos/Principal.js:92`
- **Issue**: `ImageCache.load('Sprites/pendul.gif')` was missing `./` prefix, didn't match preload entry `'./Sprites/pendul.gif'`
- **Fix**: Changed to `ImageCache.load('./Sprites/pendul.gif')`
- **Impact**: Eliminated redundant `loadImage()` call and ensured cache hit

### Dead Code Removal (LOW)
- **File**: `Arquivos/Controle.js:2`
- **Issue**: `musicFundo` and `digitando` were declared but never used anywhere
- **Fix**: Removed dead variables from declaration

---

## Phase 2: Lazy Music Loading (CRITICAL)

### Problem
All 10 MP3 tracks (~31.6MB total) were decoded to PCM AudioBuffers in `preload()`, consuming ~300MB RAM at startup. Only `fullmoon.mp3` (menu music) is needed immediately; all others are only needed on first scene transition.

### Solution
Created `MusicManager` — a lazy-loading wrapper around p5's `loadSound()`.

### Files Modified
| File | Change |
|------|--------|
| `Arquivos/core/musicManager.js` | **NEW** — MusicManager singleton with `preload()`, `load()`, `play()`, `stop()`, `pause()` |
| `jogo.html` | Added `musicManager.js` script tag |
| `Arquivos/Principal.js` | `preload()`: removed 10 `loadSound()` calls, now only loads `somClique`, `dano`, `cutscene`, + `MusicManager.preload('fullmoon')` |
| `Arquivos/Principal.js` | `setup()`: removed volume settings (now in MusicManager), replaced `fullmoon.play()` with `MusicManager.play('fullmoon')` |
| `Arquivos/Controle.js` | Removed 10 global music variable declarations; `musica_batalha_atual` now stores a string key |
| `Arquivos/Controle.js` | `irPara()`: all `.play()/.pause()/.stop()` calls now route through `MusicManager` |
| `Arquivos/Funcoes.js` | `explosion()`: `musica_batalha_atual.stop()` → `MusicManager.stop(musica_batalha_atual)`, reassignment now stores string key |

### How It Works
- **preload()**: Only `fullmoon` is eagerly loaded (needed for menu on startup). ~3MB.
- **First transition to any scene**: `MusicManager.play('trackKey')` triggers `loadSound()` on demand, stores the result, and plays immediately.
- **Subsequent calls**: Returns cached `p5.SoundFile` from `_loaded` map — no re-loading.
- **Volume levels**: All 10 tracks have their volumes defined in `MusicManager._tracks` (matching original setup values).

### Bug Fix: MusicManager crash on unloaded tracks (CRITICAL)
- **File**: `Arquivos/core/musicManager.js`
- **Issue**: `MusicManager.play()` called `.play()` immediately on `p5.SoundFile` that hadn't finished loading — threw `not ready to play file, buffer has yet to load` and froze the game
- **Fix**: `play()` now checks `snd.isLoaded()`; if not loaded, queues playback via `loadSound()` success callback. `stop()` and `pause()` cancel any pending play for that track.

### Impact
- Eliminates 9 `loadSound()` calls from preload
- Only ~3MB decoded at startup instead of ~31.6MB
- Reduces initial RAM from ~300MB (decoded AudioBuffers) to ~30MB (1 track decoded)
- Remaining 9 tracks loaded lazily on first use (~3MB each, decoded on demand)
- **Estimated total RAM savings: ~270MB**

### Verification
- [x] All music transitions verified — `irPara()` uses MusicManager consistently
- [x] Battle music switching works — `explosion()` reassigns `musica_batalha_atual` as string key
- [x] No bare music variable references remain (grep confirmed)
- [x] No `.play()/.pause()/.stop()` calls on non-MusicManager objects remain
- [x] Game validated by user — all mechanics working correctly

---

## Loading Screen Fix (MEDIUM)

### Problem
- Loading text (`#estadoCarregamento`) was displaced by bordered boxes due to `position: absolute`
- Hardcoded 4.9s `setTimeout` didn't reflect actual load time
- Game had 5s fade-in animation, 1s canvas transition — unnecessarily slow

### Files Modified
| File | Change |
|------|--------|
| `style.css` | `#estadoCarregamento`: changed to `position: fixed` + `transform: translate(-50%, -50%)` for true viewport centering, added `pointer-events: none` |
| `style.css` | `#estadoCarregamento`: replaced 5s `reversefadeIn` animation with 0.3s CSS opacity transition |
| `style.css` | `#jogo`: reduced fadeIn from 5s to 0.2s |
| `style.css` | `canvas`: removed 1s transition |
| `Arquivos/Principal.js` | Removed hardcoded `setTimeout(..., 4900)` |
| `Arquivos/Principal.js` | Loading text now fades out at start of first `draw()` frame (after intro sprites are rendered), not in `setup()` |

### Verification
- [x] Loading text always centered regardless of bordered boxes
- [x] Loading text fades out smoothly after title screen sprites are visible
- [x] Game UI appears instantly with no delay
- [x] Game validated by user

---

## Files Modified (all phases)
- `Arquivos/core/cache.js` (NEW - Phase 1)
- `Arquivos/core/musicManager.js` (NEW - Phase 2)
- `Arquivos/Principal.js`
- `Arquivos/Classes.js`
- `Arquivos/Funcoes.js`
- `Arquivos/Controle.js`
- `Arquivos/Ataques.js`
- `Arquivos/Descarga.js`
- `Arquivos/Paginas.js`
- `jogo.html`
- `style.css`
- `libraries/p5.min.js`
- `libraries/p5.sound.min.js`

## Next Phase
- Phase 3: Fix Array Mutation Bug — ALREADY DONE by first agent
- Phase 4: Remove Device Selection

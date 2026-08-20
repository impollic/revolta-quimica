# Revolta Quimica - Third Agent Report

## Changes Made (2026-08-20)

### Phase 4: Remove Device Selection (MEDIUM)

#### Problem
The game had a separate device selection page (`index.html`) that asked users to choose between "Computador" and "Celular". This stored the choice in `localStorage` and used `Antecede.js` to rewrite the entire DOM on page load. This created:
- Extra page load step for users
- Hardcoded 4.9s setTimeout in loading screen
- Separate landing page with device-specific images
- Unnecessary localStorage logic

#### Solution
Replaced manual device selection with automatic touch detection and CSS-styled D-pad controls.

#### Files Modified
| File | Change |
|------|--------|
| `index.html` | Removed `<script src="./Arquivos/Antecede.js"></script>` |
| `index.html` | Added inline touch detection script that auto-injects mobile controls |
| `index.html` | Renamed from `jogo.html` (sole entry point) |
| `style.css` | Replaced emoji buttons with CSS-styled D-pad arrows using `::before` pseudo-elements |
| `style.css` | Added touch-action, -webkit-touch-callout, -webkit-user-select for mobile |
| `Arquivos/Antecede.js` | **DELETED** — no longer needed |
| `Sprites/pc.png` | **DELETED** — device selection images no longer needed |
| `Sprites/celular.png` | **DELETED** — device selection images no longer needed |

#### Mobile Control Features
- **Universal**: CSS border arrows work on every browser/device — no emoji/font dependency
- **Large Touch Targets**: 56x56px buttons (exceeds Apple's 44x44px minimum)
- **No Text Selection**: `-webkit-user-select: none` + `user-select: none` on container
- **No Tap Delay**: `touch-action: manipulation` removes 300ms browser delay
- **No Accidental Actions**: `e.preventDefault()` on touchstart/touchend/touchcancel
- **Instant Visual Feedback**: `.active` class highlights button while pressed

---

### Phase 5: DeltaTime Movement + Remove setInterval (HIGH)

#### Problem 1: Frame-Rate Dependent Movement
All movement was hardcoded per-frame. At non-60fps, the game would run too fast or too slow. Breaks on 120Hz displays, weak hardware, or any VSync mismatch.

#### Problem 2: setInterval for Attack Spawning
`acionarIntervalo()` in `Funcoes.js` used `setInterval()` every 2000ms to spawn atoms for the ASCENSÃO INTERATÔMICA attack. This was the only `setInterval` in the game — all other attacks use frame-based logic in the draw loop. Inconsistent and disconnected from the game's frame timing.

#### Solution 1: DeltaTime Multiplier
Added `let dt = deltaTime / 16.667` at the top of `draw()`. At 60fps, `deltaTime ≈ 16.667ms`, so `dt ≈ 1.0`. At 30fps, `dt ≈ 2.0` (moves twice as far per frame = same real-time speed).

#### Solution 2: Frame-Based Spawning
Replaced `setInterval()` with a `deltaTime`-based timer (`ascensaoSpawnTimer`) in the draw loop. Spawns 15 atoms every 2000ms using real time, same behavior as before but consistent with other attacks.

#### Files Modified
| File | Change |
|------|--------|
| `Arquivos/Principal.js` | Added `let dt = deltaTime / 16.667` at start of `draw()` |
| `Arquivos/Principal.js` | ASCENSÃO INTERATÔMICA: replaced setInterval spawning with `ascensaoSpawnTimer += deltaTime` |
| `Arquivos/Principal.js` | All `explosion()` calls now pass `dt` |
| `Arquivos/Principal.js` | All `mover()` calls now pass `dt` |
| `Arquivos/Principal.js` | `area.mover(dt)` and `area.aumentarDiametro(dt)` in COLAPSO ESTEQUIOMÉTRICO |
| `Arquivos/Principal.js` | `descarga.moverPara(dt)` in DESCARGA VOLTAICA |
| `Arquivos/Classes.js` | `Personagem.mover(dt)` — all 4 movement directions multiplied by `dt` |
| `Arquivos/Classes.js` | `Atom.mover(dt)` — velocity multiplied by `dt` |
| `Arquivos/Classes.js` | `CaixaDialogo.passarFrase()` — text speed multiplied by `dt` |
| `Arquivos/Ataques.js` | `Ataques.atualizar(dt)` — random velocity multiplied by `dt` |
| `Arquivos/Ataques.js` | `EntalpiaExplosiva.mover(dt)` + `explodir(dt)` |
| `Arquivos/Ataques.js` | `OxidacaoReduzida.mover(dt)` + `explodir(dt)` |
| `Arquivos/Ataques.js` | `FeixeInorganico.mover(dt)` |
| `Arquivos/Ataques.js` | `ForcaIonizante.mover(dt)` + `explodir(dt)` |
| `Arquivos/Descarga.js` | `Descarga_Atomica.moverPara(dt)` |
| `Arquivos/Descarga.js` | `Descarga_Atomica_Eletricidade.moverPara(dt)` |
| `Arquivos/Estequiometria.js` | `Area_Estequiometrica.mover(dt)` |
| `Arquivos/Estequiometria.js` | `Area_Estequiometrica.aumentarDiametro(dt)` |
| `Arquivos/Funcoes.js` | `acionarIntervalo()` — gutted, logic moved to draw loop |
| `Arquivos/Funcoes.js` | `explosion(dt)` — now accepts dt, passes to `e.mover(dt)` |
| `Arquivos/Controle.js` | Added `ascensaoSpawnTimer` variable |
| `Arquivos/Controle.js` | `irPara()`: `acionarIntervalo()` replaced with `ascensaoSpawnTimer = 0` |

#### How It Works
- `deltaTime` is p5.js built-in: milliseconds since last frame (~16.667ms at 60fps)
- `dt = deltaTime / 16.667` normalizes to ~1.0 at 60fps
- All velocities multiplied by `dt`: at 30fps, `dt≈2.0`, so positions change twice as much per frame = same real-time speed
- ASCENSÃO INTERATÔMICA spawning: `ascensaoSpawnTimer += deltaTime`, fires at 2000ms intervals using real time
- All methods have `dt = 1` as default parameter for backward compatibility

#### Impact
- Game now runs at consistent speed on any display refresh rate (60Hz, 120Hz, 144Hz, etc.)
- Movement feels identical on weak hardware that can't maintain 60fps
- Removed last `setInterval` — all game logic now runs in the p5.js draw loop
- `CaixaDialogo.passarFrase()` text speed also frame-rate independent

#### Verification
- [x] All mover() methods accept and use dt parameter
- [x] ASCENSÃO INTERATÔMICA spawning uses deltaTime-based timer
- [x] No setInterval calls remain in game code (only in p5.min.js library)
- [x] Default `dt = 1` on all methods for backward compatibility
- [x] explosion() passes dt through to energias

---

### Bug Fix: Diagonal Movement Speed (MEDIUM)

#### Problem
Player moved ~41% faster diagonally than cardinally (Pythagorean: `1² + 1² = sqrt(2)`). Pressing W+D gave `sqrt(2) * speed`.

#### Solution
Rewrote `Personagem.mover()` to use a direction vector `(dx, dy)` normalized by `INV_SQRT2` (1/sqrt(2)) when both axes are active. Also improved boundary checks — X and Y clamped independently so player slides along walls instead of getting stuck.

#### Files Modified
| File | Change |
|------|--------|
| `Arquivos/Controle.js` | Added `const INV_SQRT2 = 0.7071` constant |
| `Arquivos/Classes.js` | `Personagem.mover()` rewritten with direction vector + normalization |

---

### Bug Fix: DESCARGA VOLTAICA Laser Crash (CRITICAL)

#### Problem
`Descarga_Atomica_Eletricidade.moverPara()` used `== 0` strict equality to check when the laser should stop oscillating. With `dt` multiplied into the increment, the value could jump from e.g. 1.5 to -0.5, skipping 0 exactly. The check never triggered, the laser kept growing into negative dimensions, and the game crashed.

#### Solution
Changed `== 0` to `<= 0` on both `this.w` and `this.h` stop checks. The laser now correctly stops even when `dt` causes the value to overshoot past zero.

#### Files Modified
| File | Change |
|------|--------|
| `Arquivos/Descarga.js` | `Descarga_Atomica_Eletricidade.moverPara()`: `== 0` → `<= 0` |

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
- `Arquivos/Estequiometria.js`
- `Arquivos/Paginas.js`
- `index.html` (renamed from jogo.html)
- `style.css`
- `libraries/p5.min.js`
- `libraries/p5.sound.min.js`

## Files Deleted
- `Arquivos/Antecede.js`
- `Sprites/pc.png`
- `Sprites/celular.png`
- `jogo.html` (renamed to index.html)

## Next Phase
- Phase 6: Dead Code Removal (remaining items)
- Phase 7: Audio Management Refactor

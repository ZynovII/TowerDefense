# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Browser-based Tower Defense game built with vanilla JavaScript (mixed ES5/ES6+), HTML5, and CSS3. No build system, bundler, or package manager — open `index.html` directly in a browser or serve with any static file server.

## Running the Project

```bash
# Any static file server works, e.g.:
python3 -m http.server 8000
# Then open http://localhost:8000
```

No build, lint, or test commands exist. There is no `package.json` or test framework.

## Architecture

The project follows an **MVC pattern** with paired Model/View files per game entity:

- **ModelGame.js / ViewGame.js / ControllerGame.js** — Core game state, rendering, and user interaction (login, menus, pause, records)
- **ModelEnemy.js / ViewEnemy.js** — Enemy entities (health, speed, movement, SVG rendering)
- **ModelTower.js / ViewTower.js** — Tower hierarchy: base `Tower` class with `ModelGreenTower` (damage), `ModelBlueTower` (freezer), `ModelWhiteTower` (destroyer)
- **ModelTowerCell.js / ViewTowerCell.js** — Placement cells where towers can be dropped
- **Shells.js** — Projectile classes: `Bullet`, `Freezer`, `Destroyer` (each tracks nearest enemy)
- **AJAXStorage.js** — Persistent leaderboard via remote AJAX API (`fe.it-academy.by/AjaxStringStorage2.php`) using lock-based read/update pattern

## Key Patterns

- **Component wiring**: Models and Views are instantiated separately, then cross-referenced via `set()` methods (e.g., `gameViewObj.set(gameModelObj)`)
- **Game loop**: `setInterval` at 16ms (~60 FPS) in `ModelGame.start()` — each frame moves enemies, fires towers, updates projectiles
- **Tower drag-and-drop**: Pointer events (`pointerdown`/`pointermove`/`pointerup`) on tower palette; towers are placed onto cells
- **Naming**: Models use `Model[Entity]`, Views use `View[Entity]`, classes are PascalCase, private vars prefixed with `_`
- **Mixed class styles**: Function constructors (Models) alongside ES6 classes (Views, Shells)
- **Grid unit**: `block = 50` pixels used throughout for positioning

## External Dependencies

- jQuery 3.2.1 (CDN) — used only for AJAX calls in `AJAXStorage.js`
- Google Fonts (Goldman) — loaded in `index.html`

# FORM / ATHLETICS

A concept website for a premium fitness studio: a fictional brand, editorial design, fully functional offline.

## What's inside

- **Hero** — «TRAIN WITH PURPOSE.»
- **Training** — three pillars: Strength / Conditioning / Personal
- **Philosophy** — «CONSISTENCY OVER INTENSITY.»
- **Coaches** — three coaches
- **Membership** — three plans
- **Weekly schedule** — filterable by type (strength / conditioning / personal)
- **Booking form** — validation, session picker (date and type are pre-filled automatically), success state
- **FAQ** — accordion
- Mobile menu, smooth scroll, reveal animations, off-canvas navigation

## Tech

- Plain HTML + CSS + JavaScript, no frameworks, no dependencies
- Web fonts inlined into `assets/css/fonts.css` as base64 (works over `file://` and offline)
- Photography — B&W-styled, Wikimedia Commons (CC)

## How to run

Any of these:

1. **Just open it**: double-click `index.html`
2. **Local server** (optional):
   ```bash
   # Python
   python -m http.server 8000
   # then open http://localhost:8000
   ```
   ```bash
   # Node
   npx serve .
   ```

## Structure

```
form-athletics/
├── index.html          # the page
├── README.md
└── assets/
    ├── css/
    │   ├── main.css    # design system & styles
    │   └── fonts.css   # @font-face (base64)
    ├── js/
    │   └── main.js     # all interactivity
    └── img/            # local images
```

## Publishing (GitHub Pages)

Create a repository named `form-athletics` → Settings → Pages → Deploy from a branch → `main` / `/(root)`. The project uses relative paths, so after deploy it just works at `https://<username>.github.io/form-athletics/` with no extra setup.

> All site content is fictional. Photography via Wikimedia Commons.
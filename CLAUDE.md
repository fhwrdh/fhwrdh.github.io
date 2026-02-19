# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build (generates manifest, builds, writes CNAME)
npm run manifest   # Regenerate public/site-manifest.json from image data
npm run preview    # Preview production build locally
npm run lint       # ESLint (JS/JSX, zero warnings allowed)
npm run deploy     # Build + deploy to GitHub Pages via gh-pages
```

## What This Is

A photo portfolio site for Franklin Henderson, served at photo.fhwrdh.net. Built with React 18, Vite, and Chakra UI v2. Uses hash-based routing (`createHashRouter`) for GitHub Pages compatibility.

## Architecture

### Image Data Pipeline (`src/images/index.js`)
Central to the app. All image collections are defined here as arrays of objects with `src` and optional metadata (`title`, `meta`, `link`). The `buildImages` pipeline (using Ramda) transforms raw image entries through: `addDefaults` -> `addPath` -> `addId` -> `buildSlugs` -> `buildDisplay`. This produces enriched image objects with computed `path`, `id`, `slugs`, and `display` fields used throughout the app.

Exported collections: `homeImages`, `ftprtuImages`, `aorImages`, `iycsmmImages`, `sotsImages`.

### Routing (`src/router.jsx`)
Routes use an optional `:id?` param for image selection. When an `id` is present in the URL, the Carousel modal opens over the current view. Each work series has a short route alias (e.g., `ftprtu`, `iycsmm`, `angleofrepose`, `soundofthesea`).

### Carousel System (`src/components/Carousel.jsx`)
The `useCarousel(images, rootPath)` hook is the primary interface. It reads the `:id` route param, finds the matching image by slug, and returns a full-screen Chakra Modal with prev/next navigation. Keyboard navigation via `react-hotkeys-hook` (left/right arrows, escape). Wraps around at both ends.

### Work Pages (`src/work/*.jsx`)
Each series page follows the same pattern: imports its image collection, calls `useCarousel()`, and renders a `WorkContainer` with a `WorkHeading` sidebar and `WorkMasonry` grid. The masonry grid uses the `masonic` library. To add a new series: define images in `src/images/index.js`, create a work page component, add a route in `router.jsx`, and add a menu item in `Header.jsx`.

### Shared Components
- `src/work/common.jsx` - Layout primitives for work pages (`WorkContainer`, `WorkHeading`, `WorkMasonry`)
- `src/common.jsx` - `MasonryImg` (clickable image linking to its slug) and `Heading`
- `src/components/Header.jsx` - Sticky nav with responsive title and Work dropdown menu
- `src/theme.js` - Chakra theme (Lato/Roboto fonts, brand colors)

## Agent Accessibility

This is a client-side React app — fetching the HTML returns an empty shell with no content. To inspect site content without a browser:

- **`public/site-manifest.json`** — Complete structured data for every page and image (paths, slugs, metadata, routes). Generated from `src/images/index.js` by `npm run manifest` and included in every build. Also served at `https://photo.fhwrdh.net/site-manifest.json`.
- **`public/llms.txt`** — Human/agent-readable site overview following the llms.txt convention. Served at `https://photo.fhwrdh.net/llms.txt`.
- **Playwright** — For visual verification, use the Playwright MCP tools to render the site. Note the hash-based routing (URLs look like `https://photo.fhwrdh.net/#/work/ftprtu`).

After changing image data in `src/images/index.js`, run `npm run manifest` to regenerate the manifest.

## Key Conventions

- Images are served from `public/work/` and referenced via the `/work/` prefix path
- Image slugs are derived from titles (via `slugify`) or filenames; title-based slugs take priority
- Ramda is used extensively for functional data transformations in the image pipeline
- No tests exist in this project

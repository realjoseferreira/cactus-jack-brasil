# Cactus Jack Brasil — PRD

## Original Problem Statement
Premium frontend-only e-commerce **showcase** ("Cactus Jack Brasil") for Sick Code's portfolio, inspired by the Travis Scott / Cactus Jack / sneaker streetwear universe. Dark-luxury aesthetic, 3D effects, smooth animations, working frontend cart, full product pages, checkout demo, documentation page. No real backend.

## Architecture
- **Stack:** React 19 (CRA + CRACO), React Router 7, Tailwind CSS 3, Framer Motion 11, lucide-react, shadcn/ui + sonner.
- **No backend.** All e-commerce logic is client-side.
- **Data pipeline:** Python build script (`/tmp/build_catalog.py`) normalizes `/assets` → `/app/frontend/src/data/catalog.json` and copies media to `public/products/<slug>/` (main.* + g1..gN) and `public/brand/`. Auto-detects main image (exibithion/exhibition rule), gallery, parses `INFO.txt` with full fallback handling.
- **Cart:** React Context (`CartContext`) persisted to `localStorage` (`cjb_cart_v1`).
- **Env fix:** craco.config.js shim migrates webpack-dev-server v4 hooks (`onAfterSetupMiddleware`, `https`) to v5 schema (installed wds is v5, react-scripts emits v4).

## User Personas
- Sneaker/streetwear enthusiasts browsing premium drops.
- Portfolio visitors evaluating Sick Code's design/engineering quality.

## Core Requirements (static)
- 20 products across 5 categories (Sneakers, Camisetas, Bermudas, Moletons & Jaquetas, Colecionáveis).
- Robust fallbacks for missing/empty INFO.txt; never break layout.
- Premium dark-luxury visual, 3D tilt cards, parallax hero with video, responsive mobile-first.

## Implemented (2026-06)
- Home (hero video, marquee, categories, featured, latest drops, flagship/fachada, icons strip, R$50k giveaway).
- Shop with category filter, search, sort, badges (Novo/Exclusivo/Última Unidade/Limited/Sold Out).
- Product detail: gallery + thumbs + zoom-on-hover, size selector, qty, add/buy-now, related products, meta with hidden empty fields.
- Cart drawer (qty/remove/subtotal/shipping/coupon) + localStorage persistence.
- Checkout demo (personal/address/payment/coupon/summary) → success page with order id.
- About + Documentation (real technical writeup) pages.
- Footer with Sick Code signature → https://www.sickcode.com.br (new tab) + demo disclaimers.
- **Tested:** 36/36 frontend assertions passed (iteration_1).

## Backlog / Next
- P1: Wishlist/favorites; size-availability simulation per product.
- P2: i18n toggle PT/EN (currently PT default); product quick-view modal; share buttons.
- P2: Optional WebM/compressed version of travis.mp4 (~42MB) for faster mobile hero.

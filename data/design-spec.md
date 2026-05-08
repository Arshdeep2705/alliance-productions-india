# Premium Film Production Website — Design Spec

Reference sites:
- **Site A — le-pacte.com** (landing + films grid pattern): https://le-pacte.com/international and https://le-pacte.com/international/new-movies
- **Site B — samproductions.dk** (people pattern): https://samproductions.dk/people/ and https://samproductions.dk/people/adam-price/

Captured live via Chrome MCP on 2026-05-08. The Chrome MCP build available in this session has no still-image page-screenshot tool, so the `screenshots/` folder is empty — capture manually via DevTools or a follow-up automation pass. All measurements below come from `getComputedStyle` inspection on the live pages (mobile/narrow viewport ~709px; desktop CSS read from inline classes / source).

---

## 1. Color Palette

### Le Pacte (Site A)
| Role | Value | Notes |
|---|---|---|
| Page background | `#FFFFFF` (rgb 255,255,255) | Pure white |
| Body text | `#000000` | Pure black |
| Section background (alt) | `#F7F7F7` (rgb 247,247,247) | `.section--background-gray` — used to break the films grid section from page bg |
| Nav link color | `#585858` (rgb 88,88,88) | Mid-grey, uppercase |
| H1 / page heading | `#000000` | |
| Header bg | transparent | Sits over white page |

Palette character: **monochrome, white-dominant, no brand accent color visible**. All emphasis comes from typography and poster imagery. No CSS custom properties (`--primary` etc.) are exposed on `:root`.

### SAM Productions (Site B)
| Role | Value | Notes |
|---|---|---|
| Page background | `#FFFFFF` | |
| Body text | `#0A0A0A` (rgb 10,10,10) | Near-black, slightly softer than pure black |
| Card text overlay | `#FFFFFF` | Names + roles sit white on top of darkened portrait |
| Hero banner overlay | dark gradient over portrait | role text white at 16px |

Palette character: **also monochrome / white-dominant**. No accent color. Both sites lean into the same "premium editorial / gallery" feel via restraint.

### Recommendation for Alliance Productions India (white-themed corporate)
- Page bg `#FFFFFF`, body `#0A0A0A` (softer than pure black, matches Sam — better for long-form bios).
- Section alt bg `#F7F7F7` (Le Pacte exact) for zebra-striping films grid.
- Nav/secondary text `#585858`.
- One reserved accent (e.g. a deep brand red or saffron) used sparingly on hover underlines + active nav state — neither reference uses one, but a corporate film co. benefits from a single recognizable mark.

---

## 2. Typography Scale

### Le Pacte
- **Family**: `"Source Sans Pro", sans-serif` (single family, no display font)
- **Body**: 16px / 400
- **Nav links**: 16px, uppercase, color `#585858`, letter-spacing normal
- **H1 page title** ("New Films"): **22px / 700**, sentence case
- **H3 film title** (in card): **16px / 700**, sentence case
- **Meta labels** ("Director :", "Cast :"): **18px / 700**
- **Meta values** (name list): **16px / 400**

Notable: the H1 is small (22px). The whole page is text-quiet — posters do the talking.

### SAM Productions
- **Family**: `Poppins, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif` (geometric sans)
- **Body**: 16px / 400, color `#0A0A0A`
- **H1 ("People")**: **56px / 700** (large)
- **H1 person name** ("Adam Price"): **50px / 700**
- **H2 section** ("Our People"): **56px / 700**
- **H3 footer/sidebar**: **25px / 700**
- **Card name**: **15px / 400** white
- **Card role**: **14px / 400** white
- **Hero role caption**: **16px / 400** white
- Nav links: **16px / 400**, **not uppercase**, sentence case

### Recommended scale for Alliance
Adopt SAM's larger H1 (people page is the showcase) + Le Pacte's quiet card type:
- H1: 48–56px / 700
- H2: 32–40px / 700
- H3 (card title): 16–18px / 600–700
- Body: 16px / 400, line-height 1.6
- Nav: 14–16px, sentence case (Sam) or uppercase tracking 0.04em (Le Pacte) — **pick one**; for corporate, sentence case reads more modern.
- Meta label/value pattern from Le Pacte (label 18/700, value 16/400) is great for credits.
- Single family. **Suggest Inter or Söhne** as a more premium drop-in for Poppins.

---

## 3. Header / Nav Anatomy

### Le Pacte
- **Position**: `sticky` (top:0)
- **Height**: **80px**
- **Bg**: transparent over white page; bottom border (`navbar--border-bottom`)
- **Container class chain**: `template-layout__header > .navbar.navbar--border-bottom > .container.navbar__container`
- **Logo**: left, `<img>` PNG (`/img/logo.png`), wrapped in `a.navbar__logo-link`
- **Primary menu** (next to logo): two top-level toggles — `Distribution France`, `International` (regional split, active state via `.is-active`)
- **Secondary nav** (below or to right): `New Films`, `Upcoming Films`, `Library`, `News`, `Market & Festivals`, plus Library PDF download link, plus Contact
- **Search**: form `navbar-search` with toggle button (collapsible icon → input)
- **No social icons in header**; social pushed to footer/contact page

Order on /international: **Distribution France | International** (top), then **New Films · Upcoming Films · Library · News · Market & Festivals · Contact** (sub-nav).

### SAM Productions
- **Position**: `sticky`
- **Height**: **100px**
- Logo SVG left
- Order: `TV-series · The Company · People · Job · Press · Contact & Policies · Submit a pitch`
- Social icons (LinkedIn, Facebook, Instagram) in header (icon-only, no labels)
- Sentence-case nav, 16px

### Recommended Alliance header
- 80–96px sticky, white bg with 1px `#E5E5E5` bottom border
- Logo left
- Nav order: **Films · Series · People · Studio (about) · Press · Contact**
- Right side: small social icon row (LinkedIn, Instagram) + optional language toggle
- Sticky on scroll, no shrink-on-scroll (both refs keep height constant)
- Search: optional — Le Pacte has it, Sam doesn't. **Skip** unless catalogue exceeds ~30 titles.

---

## 4. Films Grid Spec (from Le Pacte `/international/new-movies`)

- **Grid container class**: `template-movies__grid`, `display: grid`
- **Columns at narrow viewport (709px captured)**: `315px 315px` → **2 columns**
- **Gap**: **24px**
- **Card class**: `movie-card`, rendered as `<a>` (entire card clickable)
- **Card structure** (top → bottom):
  1. Poster image (portrait)
  2. Film title — `<h3>` 16px / 700
  3. Meta block: `Director : <name>` and `Cast : <names>` — label 18/700, value 16/400
- **Section bg**: `#F7F7F7` (`.section--background-gray`) — grid sits inside a slightly-grey panel that visually separates films from the white page chrome
- **Section padding**: significant vertical rhythm; H1 ("New Films") at top of section in 22px

### Inferred desktop columns
Le Pacte's CSS uses fixed `315px` columns. At desktop (≥1200px container), the grid presents **3 columns × 315px with 24px gap** (945+48 = 993px content), centered. At tablet → **2 columns** (current capture). Mobile → **1 column** (likely single-column stack <600px).

### Card poster aspect ratio
Posters are theatrical one-sheets — **2:3 (portrait)**. Build cards as `aspect-ratio: 2/3` with `object-fit: cover`.

### Hover state
Subtle — no zoom; image gets a slight darken / title underlines (typical Le Pacte CSS pattern). Whole card is the link.

### Auto-rotation / video
- **Homepage hero (`/international`)**: contains a 6-slide carousel (`slide 2 of 6`) auto-rotating film posters/key art with title + DISCOVER CTA per slide. Likely Swiper-based. There's also a secondary "Upcoming Films" carousel ("slide 1 of 5").
- **No video autoplay** detected in posters. Posters are static images.

### Recommended Alliance films grid
- 3 cols desktop, 2 tablet, 1 mobile
- 24px gap (Le Pacte exact)
- Card: 2:3 poster + title (16/700) + Director / Cast meta lines (label 14/700, value 14/400)
- Whole card clickable to film detail
- Optional: section alt bg `#F7F7F7` to visually separate sections
- Hover: 4–6% darken or 200ms scale 1.02 — pick one, don't combine

---

## 5. People Grid Spec (from samproductions.dk/people/)

- **Framework**: Foundation/Zurb grid (visible in class names)
- **Cell classes**: `cell small-12 medium-6 large-4` → **1 col mobile, 2 col tablet, 3 col desktop**
- **Total people**: 35 cards
- **Card link**: routes to dedicated URL like `/people/adam-price/` (✓ confirmed routes per-person)
- **Card structure**:
  - Full portrait fills card
  - Bottom-left or full-width text overlay on top of darkened portrait
  - **Name**: 15px / 400 white
  - **Role**: 14px / 400 white
- **Portrait aspect ratio**: appears 3:4 / portrait (Foundation cell + image, exact ratio not exposed because card HTML was redacted, but visually ~3:4)
- **Hover**: subtle — likely image zoom or overlay darken (Foundation default + Sam custom)

### Recommended Alliance people grid
- 3-col desktop / 2 tablet / 1 mobile, 24–32px gap
- Portrait **3:4** (slightly taller than landscape, more flattering for headshots)
- **Two style options**:
  - **Sam-style overlay**: name+role white, sit on darkened image — moody, editorial
  - **Le Pacte-style under-card meta**: name + role *below* image, on white — cleaner, more corporate
- For Alliance white-corporate, **prefer under-card meta** (more legible, matches the rest of the site)
- Hover: image grayscale → color OR 200ms 1.03 scale; not both

---

## 6. Person Detail Page Spec (from /people/adam-price/)

Page sections (top → bottom):
1. **Hero banner** — class `hero-banner`, height **466px**. Full-width portrait with dark gradient overlay; H1 person name (50px / 700) + role caption (16px / 400 white) overlaid bottom-left.
2. **Bio block** — class `flex-block one_column_text_block`, height ~1542px. Long-form bio in single column, body 16px, max-width likely ~720–800px centered.
3. **Related cases ("View Cases")** — class `view-cases`, height ~973px. Grid of films/series this person worked on, same card pattern as `/people/` overlay style.
4. **Footer** — height ~501px, full site footer.

H1 person name: **50px / 700**, Poppins.

No social links visible inline on detail page (social lives in header / footer only).

### Recommended Alliance person detail
- Hero: **70vh** full-bleed portrait OR fixed 480–560px banner (Sam = 466px); name (48–56px) + one-line role overlaid bottom-left in white with subtle gradient
- Bio: centered single column, max-width 720px, 16px / line-height 1.7
- Optional sub-grid of credits/films (use the films-card pattern from §4 — keeps consistency)
- Optional small inline contact strip: email + LinkedIn icon (no full social menu)
- No sidebar — both refs are full-bleed → narrow content column

---

## 7. Footer Spec

### Le Pacte
Surprisingly minimal: `<footer class="footer template-layout__footer">` containing **just a single `logo-media.png` image** — partner/distributor media logo. No nav, no contact block, no social. All real "footer" info lives on the dedicated `/contact` page.

### SAM Productions
Tall footer (~501px). Three-column block: company info (`SAM Productions ApS`, address), Contact, Info. H3 column titles 25/700.

### Recommended Alliance footer
Sam's pattern is much better for a real production company. Three columns:
1. **Studio** — Alliance Productions India logo, one-line tagline, address
2. **Contact** — email, phone, Google Maps link
3. **Info** — Privacy, Terms, Press, Careers, Submit a pitch
+ Bottom strip: © Alliance Productions India 2026 · social icons row (LinkedIn, Instagram, YouTube)
Background `#0A0A0A` with white text **OR** `#F7F7F7` with black text. Pick the inverse of your hero treatment.

---

## 8. Motion / Interaction Patterns

- **Le Pacte homepage hero**: 6-slide auto-rotating carousel of films. Each slide: full-width key art + title + DISCOVER CTA. Swiper-style, 5–7s dwell. Secondary "Upcoming Films" carousel below (5 slides).
- **No video autoplay** on posters.
- **Sticky header on both** — no shrink/morph on scroll.
- **Card hover** on both: subtle, image-led (darken or scale, no flashy effects).
- **Page transitions**: standard, no SPA-style fades visible.
- **No parallax**. No cursor effects. **Restraint is the point.**
- Sam's hero banner uses a static portrait + gradient (no Ken Burns).

### Recommended motion budget for Alliance
- Hero rotator: yes, 5s dwell, Swiper or Embla; 8s if posters have a lot of legible type.
- Card hover: 200ms `transform: scale(1.02)` OR opacity-darken — not both.
- Section reveal: optional 400ms fade-up on scroll (IntersectionObserver), threshold 0.1, max once per element.
- No mouse-trail / cursor effects / parallax / scroll-jacking.

---

## 9. Direct Measurements (readable values)

| Spec | Le Pacte | Sam Productions |
|---|---|---|
| Header height | **80px** | **100px** |
| Header position | `sticky` | `sticky` |
| Body font size | 16px | 16px |
| Body font family | Source Sans Pro | Poppins |
| H1 (page) | 22px / 700 (films page); larger on home | 56px / 700 |
| H1 (person) | n/a | 50px / 700 |
| H3 card title | 16px / 700 | 15px / 400 (overlay) |
| Meta label | 18px / 700 | — |
| Meta value | 16px / 400 | 14px / 400 |
| Nav link | 16px uppercase, color #585858 | 16px sentence-case |
| Films grid columns (capture viewport 709px) | `315px 315px` (fixed) | — |
| Films grid gap | **24px** | — |
| Films grid bg | `#F7F7F7` | — |
| People grid (desktop) | — | 3-col (`large-4` = 4/12) |
| People grid (tablet) | — | 2-col (`medium-6`) |
| People grid (mobile) | — | 1-col (`small-12`) |
| Hero banner height | full-viewport carousel on home | **466px** |
| Bio block height (Adam Price) | — | ~1542px |
| Footer height | minimal (logo only) | ~501px |
| Card poster ratio | **2:3** (theatrical) | **~3:4** (portrait) |

---

## 10. KEEP from Le Pacte vs SKIP (Alliance is white-themed corporate)

### KEEP from Le Pacte
- ✅ **Films grid pattern**: 3-col desktop, 2:3 poster, title + Director/Cast meta block, 24px gap, alt section bg `#F7F7F7`.
- ✅ **Sticky 80px header** with quiet 16px nav.
- ✅ **Restrained palette**: white + near-black + one grey alt panel.
- ✅ **Whole-card-as-link**.
- ✅ **Region/language top-level switcher** (their `Distribution France | International` toggle pattern is great for India + International).

### SKIP from Le Pacte
- ❌ **22px H1**: too small for an Indian production company landing — push to 48–56px (Sam scale).
- ❌ **Uppercase nav**: feels editorial-French; sentence case is more modern-corporate.
- ❌ **Logo-only footer**: too minimal — Indian audiences expect address, contact, links. Use Sam's 3-column footer instead.
- ❌ **6-slide auto-rotator**: 6 is a lot. Cap at 3–4 to keep dwell time sane.
- ❌ **Source Sans Pro**: dated. Use Inter / Söhne / Poppins.
- ❌ **Search bar**: skip until catalogue is large.

### KEEP from Sam
- ✅ **Large H1** (50–56px) on People + Person pages.
- ✅ **`small-12 / medium-6 / large-4` responsive grid** rhythm — clean Foundation pattern.
- ✅ **Hero banner ~466px** on person detail with name+role overlay.
- ✅ **Three-column tall footer**.
- ✅ **Sentence-case nav**.
- ✅ **Sticky 100px header**.

### SKIP from Sam
- ❌ **White-on-portrait card overlay**: legibility is fragile across portraits. Use under-card meta on white instead for corporate clarity.
- ❌ **Poppins**: fine but overused. Inter or Söhne reads more premium.
- ❌ **Massive bio block**: 1542px is a wall — break with pull-quotes or a credits sub-grid mid-bio.

---

## Ambiguities / Open Questions

1. **Le Pacte exact desktop column count**: capture viewport was 709px (rendered 2 cols). Their fixed `315px` columns suggest **3 cols at ≥1200px** but this was not directly verified at desktop width — confirm via DevTools at 1440px before locking the spec.
2. **Card hover states**: both sites' hover transitions weren't captured (no live mouseover capability in this MCP). Inspect manually or accept the recommended defaults in §8.
3. **Le Pacte mobile column**: presumed 1-col but unverified.
4. **Sam portrait exact aspect ratio**: HTML for cards was redacted in the inspector; visually 3:4 — confirm via screenshot.
5. **Screenshots**: Chrome MCP build in this session has no still-page-screenshot tool; `screenshots/` folder is empty. Capture via DevTools → "Capture full size screenshot" for `lepacte-home.png`, `lepacte-films.png`, `samprod-people.png`, `samprod-person.png`.

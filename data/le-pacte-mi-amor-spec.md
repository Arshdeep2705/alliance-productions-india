# Le Pacte — Mi Amor — Film Detail Page Spec

Source URL: https://le-pacte.com/international/film/mi-amor
Captured: 2026-05-08

This is a build-ready replication spec. Class names are taken verbatim from Le Pacte's live DOM so they can be mapped 1:1 to the Alliance Productions India film-detail page.

---

## 1. Page architecture (high level)

The entire page lives in a single root container:

```
<main>
  <div class="template-movie">
    <div class="banner template-movie__banner">          <!-- Section 1: Hero / Trailer -->
    <div class="movie-details template-movie__details">  <!-- Section 2: Details (everything else) -->
  </div>
</main>
```

**Surprising finding:** there are **only TWO sections**. There is no separate "synopsis section", "credits section", "gallery section", "related films section". The hero with trailer launcher comes first, then a single two-column "movie-details" block contains everything else. This is the master pattern.

Body background: `rgb(255, 255, 255)` (pure white).
No coloured separators — sections are separated by whitespace only.
There is NO related-films / "other films" carousel at the bottom of this page.
There is NO image gallery / stills carousel on the page itself — stills are offered only as a downloadable asset (see §4).

---

## 2. Section 1 — Hero banner with trailer

Class: `.banner.template-movie__banner`
Dimensions captured: 1692 × 450 px (full-width, ~16:9-ish letterbox).
Background: transparent on the banner element itself; the visual is a single hero still image.

```
<div class="banner template-movie__banner">
  <div class="responsive-image responsive-image--16by9 responsive-image--cover banner__background">
    <img class="responsive-image__item lazyautosizes is-loaded" />
  </div>
  <div class="container banner__container">
    <a class="play-button play-button--animation-scale banner__play-button"
       href="https://www.youtube.com/watch?v=9ux7XiChxZo"
       data-fancybox>
      <!-- play icon -->
    </a>
    <span class="banner__play-button-text">TRAILER</span>
  </div>
</div>
```

### Trailer treatment
- The hero still **is** the trailer launcher. There is no inline iframe; the page does not autoplay. No persistent video controls visible.
- Click → opens **Fancybox lightbox** (the `data-fancybox` attribute drives this) with the YouTube video embedded.
- Aspect ratio of background image: `responsive-image--16by9` — implement with `aspect-ratio: 16 / 9` plus `object-fit: cover`.
- Play button is centred over the still with a "scale on hover" animation (`.play-button--animation-scale`).
- Label "TRAILER" sits beside / below the play button (`.banner__play-button-text`).
- Embedded trailer URL (this film): `https://www.youtube.com/watch?v=9ux7XiChxZo` (titled "MI AMOR | International Trailer").

### Replication notes
- Use a single hero image with object-fit cover at fixed height (~450px desktop, scale down on mobile).
- Centre a circular play button (white outline / fill) with hover scale 1.05–1.10.
- On click, open the YouTube ID in a lightbox library (Fancybox v4/5 or similar). Do not autoplay until user clicks.

---

## 3. Section 2 — Movie details (two-column layout)

Class: `.movie-details.template-movie__details`
Background: transparent (inherits white body).

```
<div class="movie-details template-movie__details">
  <div class="container movie-details__container">
    <div class="movie-details__media">       <!-- LEFT column: poster + downloads -->
    <div class="movie-details__info">        <!-- RIGHT column: title + facts + synopsis + festivals + videos -->
  </div>
</div>
```

Two-column flex/grid: poster on the left (~33% width), info on the right (~66%). On mobile, the aside (downloads) collapses to below the synopsis (`.movie-details__visible-mobile` shows on small viewports, `.movie-details__visible-desktop` shows on large).

### 3a. Left column — `.movie-details__media`

Two children:
1. `.responsive-image.responsive-image--49by66.responsive-image--cover.movie-details__poster` — portrait poster, 49:66 aspect ratio (~3:4-ish).
2. `.movie-details__aside.movie-details__visible-desktop` — the **download list** (desktop only).

The aside heading text is "DOWNLOAD" (`.movie-details__aside-title`) followed by a `<ul class="movie-details__download-list">` with `<li class="movie-details__download-list-item">` items each containing a `<button class="movie-details__download-list-button">`. On Mi Amor: **Poster · Stills · Press kit**.

### 3b. Right column — `.movie-details__info`

Six children, in this exact order:

| # | Class | Contents |
|---|-------|----------|
| 1 | `header.movie-details__header` | `<h1 class="text-style text-style--h1 movie-details__title">` + `<div class="social-share social-share--from-left movie-details__social-share">` (button toggles a `<ul class="social-share__dropdown">`) |
| 2 | `ul.movie-details__info-list` | Credits as a vertical bulleted list |
| 3 | `div.movie-details__synopsis` | "Synopsis" heading + paragraph |
| 4 | `div.movie-details__visible-mobile` | Mobile-only duplicate of the download list |
| 5 | `div.movie-details__festivals` | Festival selections / quotes |
| 6 | `div.movie-videos.movie-details__videos` | Inline video card(s) — small thumbnail with a "Videos" title and "slide 1 of 1" carousel marker |

### 3c. Credits block (the credit format you asked about)

It is **NOT** a table. It is a `<ul>` of plain `<li class="movie-details__info-list-item">` rows. Each row is a single line: `<strong-ish title> : <value>`. The "label" is rendered in a `.movie-details__info-list-title` span. The value is plain text after the colon.

Live values from Mi Amor:
```
Director : Guillaume Nicloux
Producers : Les Films du Kiosque
Actors : Pom Klementieff and Benoit Magimel | Original score : Irène Drésel
Genre : Thriller
Nationality : France
Duration : 113
```

Notes:
- Multiple field/value pairs can sit on the **same line** separated by `|` (see the Actors / Original score row). Useful when a field is short.
- "Actors" is a comma-and-"and" string, not a table or column. No headshots.
- "Director" is its own row (not grouped with Producers).
- All keys are capitalised English with a space before the colon (French-typography pattern: `Label : Value`).

### 3d. Synopsis block

```
<div class="movie-details__synopsis">
  <h-something>Synopsis</h-something>
  <p>Romy, a young electro DJ, travels to the Spanish Canary Islands…</p>
</div>
```

- Single paragraph, no styling beyond body text.
- Heading text is the literal word "Synopsis".
- No background tint, no rule above/below — sits directly under the credits list with vertical spacing only.

### 3e. Festivals block

```
<div class="movie-details__festivals">
  <div class="movie-details__festivals-item">
    <img class="movie-details__festivals-image" />        <!-- optional festival logo -->
    <div class="movie-details__festivals-text">
      "International Film Festival Rotterdam 2026: Limelight"
    </div>
  </div>
</div>
```

Pull-quote / laurel format. Italicised in display. Each festival is one item; supports an image (laurel/logo) plus text. Used as the "awards / selections" treatment instead of a separate awards section.

### 3f. Inline videos block

`.movie-videos.movie-details__videos` contains a slide-style carousel (even when there is only one video). Each video is an `<a class="movie-video">` linking to YouTube (Fancybox-launched again — same lightbox treatment as the hero play button). Has a small "Videos" heading and a "slide N of M" indicator.

---

## 4. Gallery / stills handling

There is no in-page gallery or lightbox carousel of stills on this page. Stills are offered **only** as a downloadable archive via the `Stills` button in `.movie-details__download-list`. If Alliance wants an on-page gallery, that is a deliberate addition beyond Le Pacte's pattern.

---

## 5. Related films

There is no related-films section on this page. Le Pacte funnels users back to the catalogue via the global header rather than via an in-page carousel.

---

## 6. Backgrounds & separators (computed)

| Element | background-color (computed) |
|---|---|
| `body` | `rgb(255, 255, 255)` |
| `.banner` | `rgba(0, 0, 0, 0)` (transparent — image only) |
| `.movie-details` | `rgba(0, 0, 0, 0)` |
| `.movie-details__synopsis` | `rgba(0, 0, 0, 0)` |

**Conclusion:** entirely white page, sections separated only by vertical whitespace. No coloured bands, no horizontal rules between sections.

---

## 7. Five things to copy first (priority order)

1. **Two-section layout.** Full-bleed hero banner with click-to-play trailer, then a single two-column details block beneath. No tabs, no extra sections.
2. **Trailer-as-hero with Fancybox lightbox.** The hero image IS the trailer launcher (`<a data-fancybox href="youtube...">`). No autoplay, no inline iframe, label = "TRAILER".
3. **Credits as a flat `<ul>` of `Label : Value` lines.** Not a table, not columns, not headshots — one bullet per credit, capitalised label, space-colon-space, value as plain text. Multiple short fields can share a line separated by `|`.
4. **Single "Synopsis" heading + one paragraph**, no background, no rule.
5. **Sidebar "DOWNLOAD" list** on the desktop poster column — Poster / Stills / Press kit as buttons. No on-page stills gallery.

---

## 8. Class-name crib sheet (for the implementation team)

```
template-movie
  banner template-movie__banner
    banner__background  (responsive-image--16by9 cover)
    banner__container   (container)
      banner__play-button play-button play-button--animation-scale
      banner__play-button-text
  movie-details template-movie__details
    movie-details__container (container)
      movie-details__media
        movie-details__poster  (responsive-image--49by66 cover)
        movie-details__aside   (movie-details__visible-desktop)
          movie-details__aside-title         "DOWNLOAD"
          movie-details__download-list (ul)
            movie-details__download-list-item (li)
              movie-details__download-list-button (button)
      movie-details__info
        movie-details__header
          movie-details__title (h1, text-style text-style--h1)
          movie-details__social-share (social-share, social-share--from-left)
        movie-details__info-list (ul)
          movie-details__info-list-item (li)
            movie-details__info-list-title (label span)
        movie-details__synopsis
        movie-details__visible-mobile
        movie-details__festivals
          movie-details__festivals-item
            movie-details__festivals-image
            movie-details__festivals-text
        movie-details__videos (movie-videos)
          movie-video (a)
```

Hero trailer URL on Mi Amor: `https://www.youtube.com/watch?v=9ux7XiChxZo`

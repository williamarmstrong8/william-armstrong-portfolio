# UI Style Guide

A self-contained reference for the visual & interaction language used in this portfolio. It is intentionally page-agnostic — the goal is to capture the system so it can be reused on other sites without copying any specific page's content.

> **Stack assumptions:** Next.js (App Router) · React 19 · TypeScript · Tailwind CSS (v3) · CSS variables for theming · `class-variance-authority` (CVA) + `tailwind-merge` for variants · Radix primitives for headless UI · `lucide-react` for icons · `framer-motion` for animation · `next/image` for media · Inter from `next/font/google`.

---

## 1. Design Philosophy

The system is best described as **"calm, modern editorial."** It optimizes for clarity over decoration.

Core principles:

1. **Cool near-white canvas with true-black ink.** A faintly cyan-tinted near-white background (`hsl(196 18% 98%)`) paired with a neutral pure-black foreground (`hsl(0 0% 0%)`) keeps the canvas soft and paper-like while the text/ink reads as a crisp, untinted black. Cards step *down* one shade, not up — there is no shadowed "elevated" card on a dark canvas.
2. **One accent color, used sparingly.** A single deep blue (`hsl(225 100% 35%)`, exposed as `--ring` / `--nav-active`) is reserved for: the active nav pill, hover states, link accents, "tech tag" pills, decorative dots/rings, and small bursts of energy. Everything else is grayscale. Note `--primary` is true black, so filled CTAs read as black pills.
3. **Sharp, flat surfaces (brutalist).** `--radius: 0` and a global base override force square corners and strip decorative shadows. New or revised components should omit ineffective radius/shadow utilities. Focus uses an actual outline, independent of shadows. Hover feedback comes from color and optional motion-safe transforms.
4. **Big type, italic accents.** Hero headlines push to `text-9xl` with tight tracking. Subtitles routinely use `italic` + `font-medium` for a slightly editorial flavor.
5. **Motion is progressive enhancement.** Server-rendered content is visible and static. Once the browser preference is known, standard-motion users get in-view reveals, filter transitions, and restrained hover feedback. Use the timing helpers in `lib/motion.ts`; content must not depend on an entrance animation becoming visible.
6. **Image-first cards with text beneath, not on top.** The signature card pattern is a flat 16:9 bordered image with title, metadata, and description beneath it.
7. **System-first, not page-first.** Filters, page headers, buttons, and image-card layouts reuse shared components. Pages supply content and layout-specific sizing.
8. **Reduced motion is respected throughout.** Import the hydration-safe `useReducedMotion` from `@/hooks/useReducedMotion`. It defaults to static content during SSR/hydration and subscribes to browser preference changes. `MotionProvider` supplies `MotionConfig reducedMotion="user"` as a backstop; CSS handles CSS animations separately.

---

## 2. Foundations

### 2.1 Color tokens

All colors are defined as HSL channel triplets in `:root` and consumed via Tailwind through `hsl(var(--token))`. This is critical — never inline raw hex colors. New sites must keep this contract.

```css
/* app/globals.css */
:root {
  /* Surfaces & text */
  --background: 196 18% 98%;     /* cool near-white canvas */
  --foreground: 0 0% 0%;         /* true black text (neutral, no tint) */

  --card: 196 15% 96%;           /* card surface (a step DOWN from background) */
  --card-foreground: 0 0% 0%;

  --popover: 196 12% 99%;        /* near-white floating surfaces */
  --popover-foreground: 0 0% 0%;

  /* Brand */
  --primary: 0 0% 0%;            /* primary == foreground (true black) */
  --primary-foreground: 196 20% 98%;

  --secondary: 196 28% 92%;
  --secondary-foreground: 0 0% 0%;

  --muted: 196 28% 92%;
  --muted-foreground: 0 0% 45%;  /* neutral gray secondary text */

  --accent: 0 0% 15%;            /* near-black hover surface (ghost/outline) */
  --accent-foreground: 196 20% 98%;

  --destructive: 0 84% 60%;
  --destructive-foreground: 196 20% 98%;

  /* Lines / form / focus */
  --border: 196 10% 94%;
  --input: 196 10% 94%;
  --ring: 225 100% 35%;          /* THE accent - deep blue */

  --radius: 0;                   /* flat brutalist: everything square */

  /* Navigation island */
  --nav-background: 0 0% 100% / 0.1;
  --nav-foreground: 0 0% 0%;
  --nav-active: 225 100% 35%;    /* same blue as --ring */
  --nav-active-foreground: 0 0% 100%;
  --nav-border: 0 0% 0% / 0.08;

  /* Hero & cards */
  --hero-background: 196 18% 98%;
  --hero-foreground: 0 0% 0%;
  --project-card: 0 0% 100% / 0.1;
  --project-card-hover: 0 0% 100% / 0.2;
  --project-card-border: 0 0% 0% / 0.06;

  /* Gradients (used very sparingly) */
  --gradient-primary: linear-gradient(135deg, hsl(225 100% 35%), hsl(196 67% 45%));
  --gradient-hero:    linear-gradient(180deg, hsl(196 18% 98%), hsl(196 25% 96%));
  --gradient-card:    linear-gradient(145deg, hsl(196 12% 99%), hsl(196 20% 97%));

  /* Shadows (disabled in the shipped flat system) */
  --shadow-soft:   none;
  --shadow-medium: none;
  --shadow-card:   none;

  /* Motion */
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

Tokens are then registered in Tailwind so utilities like `bg-background`, `text-foreground`, `border-border`, `text-primary`, `text-muted-foreground`, `bg-card`, `ring-ring`, etc. just work. Always extend Tailwind via `hsl(var(--token))`. The site currently ships **light-only** — there is no `.dark` token block or theme toggle. The token contract keeps a future dark theme cheap (add a `.dark :root` block), but don't sprinkle `dark:` utilities until that theme actually exists.

#### Semantic role map

| Role                | Token                       | Common usage                                         |
| ------------------- | --------------------------- | ---------------------------------------------------- |
| Page canvas         | `background`                | `<body>`, page wrappers                              |
| Body text           | `foreground`                | `text-foreground`                                    |
| Secondary text      | `muted-foreground`          | Subtitles, meta, dates, descriptions                 |
| Tertiary text       | `muted-foreground/60–80`    | Bullets between meta items, decorative numbers       |
| Card surface        | `card`                      | All content cards                                    |
| Subtle hover bg     | `muted` / `muted/50`        | Icon hover, sidebar item hover                       |
| Borders             | `border`                    | Cards, footer separators, timeline rail              |
| Primary CTA         | `primary` + `primary-foreground` | Filled buttons, "Get In Touch"                  |
| Accent / link / dot | `primary` (= dark) **or** `ring` (= blue) | Hover title color, list bullets, link arrows |
| Destructive         | `destructive`               | Inline errors only                                   |
| Focus outline       | `ring`                      | 2px blue outline, 3px offset; independent of box shadows |

> **Important nuance:** in this system `--primary` is *true black* (`0 0% 0%`), not the brand blue. The brand blue is `--ring` / `--nav-active`. "Primary" buttons read as black filled pills; "accent" energy comes from `--ring` (blue) tints (`bg-ring/20`, `border-ring/40`, etc.).

### 2.2 Typography

* **Font families:** [Inter](https://fonts.google.com/specimen/Inter) for body/UI (`--font-sans`) and [Merriweather](https://fonts.google.com/specimen/Merriweather) for editorial headings (`--font-serif`), both via `next/font/google` and applied on `<body>`. `h1`–`h3` are forced to the serif at weight 400 in `globals.css` (even when utility classes request bold), giving headings a calm editorial feel.
* **Feature settings:** `font-feature-settings: "rlig" 1, "calt" 1` for ligatures.
* **Tabular numbers:** `tabular-nums` is used on numeric metadata (post numbers, etc.) to keep things aligned.

#### Type scale (compose, don't customize)

| Use case                | Class set                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| **Page H1 / hero name** | `text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.1] tracking-tight text-foreground` |
| **Page H1 (sub-pages)** | `text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none`                            |
| **Hero subtitle**       | `text-xl md:text-2xl lg:text-3xl font-medium italic text-muted-foreground`                           |
| **Page subtitle**       | `text-xl text-muted-foreground max-w-3xl mx-auto`                                                    |
| **Section H2**          | `text-4xl md:text-5xl lg:text-6xl font-bold text-foreground` (with optional icon chip on left)        |
| **Section H2 (smaller)**| `text-4xl md:text-5xl font-bold text-foreground`                                                     |
| **Card title (lg)**     | `text-2xl font-bold text-foreground` (About cards)                                                   |
| **Card title (md)**     | `text-xl font-bold text-foreground leading-tight` (Project / blog cards)                             |
| **Bento card title**    | `text-xl md:text-2xl font-medium text-foreground` (note: *medium*, not bold, in bento)               |
| **Metric numbers**      | `text-2xl md:text-4xl font-semibold tracking-tight text-foreground`                                  |
| **Body**                | `text-muted-foreground leading-relaxed` (default `text-base`)                                        |
| **Body small**          | `text-sm text-muted-foreground leading-relaxed`                                                      |
| **Meta line**           | `text-sm text-muted-foreground` with `<span className="mx-1.5 text-muted-foreground/60" aria-hidden>•</span>` between fields |
| **Eyebrow / kicker**    | `text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide` (sometimes `tracking-widest` + `font-bold` in bento) |
| **Label / chip**        | `text-[10px] uppercase tracking-wider font-semibold text-muted-foreground`                           |
| **Tabular post number** | `text-5xl md:text-6xl font-bold tabular-nums text-muted-foreground/50`                               |

#### Long-form prose

Long-form content (blog body) uses `@tailwindcss/typography`:

```tsx
<div className="prose prose-lg prose-slate dark:prose-invert max-w-none
  prose-headings:font-bold prose-headings:tracking-tight
  prose-a:text-nav-active prose-a:no-underline hover:prose-a:underline
  prose-img:rounded-lg" />
```

Wrap article content in `<div className="max-w-2xl mx-auto">` for line length.

### 2.3 Spacing & layout

* **Page horizontal padding** is consistent: `px-4 md:px-20`. The outer `pt-8 pb-16` is the page baseline (`pt-6 md:pt-8 pb-4 md:pb-2` only for the header).
* **Vertical rhythm:**
  * Page header → next section: `mb-12` to `mb-16`
  * Section → next section: `mt-20` (`space-y-20` for stacked sections like timelines)
  * Section header → grid: `mb-12`
  * Card image → text: `mt-5`
  * Inside text block: `gap-1` for tight stacks, `mt-2`/`mt-3` for description
* **Homepage section gaps:** hero → What I Build and What I Build → Featured Startups both use 128px of content-to-content separation (`pb-16` + `pt-16`). The hero is content-height, not viewport-height; do not add a minimum viewport height or viewport-based bottom padding that introduces extra blank space.
* **Grid widths:** content max width is `max-w-7xl mx-auto` for grid sections. CTA / blog body: `max-w-3xl` / `max-w-4xl` / `max-w-2xl` (decreasing for prose). Tailwind container is centered with `padding: 2rem` and `2xl: 1400px`.
* **Card grids:** the canonical responsive shape is `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`. Two-column variant: `grid grid-cols-1 lg:grid-cols-2 gap-10`. Bento variant: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6` with selective `md:col-span-2`.

### 2.4 Border radius

The shipped system is square: `--radius: 0` plus the global override. Do not add `rounded-*` utilities to new flat surfaces. Older decorative markup may still carry them, but they do not change the rendered geometry.

### 2.5 Shadows

Decorative box shadows are globally disabled. Do not use shadow utilities for hover feedback or keyboard focus. Use border/color changes, optional motion-safe transforms, and the global focus outline instead.


### 2.6 Motion / transitions

> **Live build note:** the canonical values below ship in `lib/motion.ts`
> (`EASE`, `DELAY`, `DURATION`, and the `pageHeader` / `pageTitle` / `fadeUp` /
> `gridWrap` / `cardEntrance` / `cardHover` builders). Import from there -
> never re-declare timing numbers in a page.

A small, reusable set of values is used everywhere. Memorize these:

| Token                | Value                                  | Where                                  |
| -------------------- | -------------------------------------- | -------------------------------------- |
| **Standard ease**    | `[0.25, 0.46, 0.45, 0.94]`             | All `framer-motion` transitions        |
| **Smooth CSS ease**  | `cubic-bezier(0.4, 0, 0.2, 1)`         | `--transition-smooth`                  |
| **Bounce CSS ease**  | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | `--transition-bounce`                |
| **Hover lift**       | `-y: 4`, `-y: 6`, or `-y: 8`           | Cards (8 for project/post, 4 for about/contact) |
| **Hover duration**   | `0.2`–`0.3s`                            | Hover-only                             |
| **Entrance duration**| `0.4`–`0.7s`                            | First paint                            |
| **Stagger step**     | `0.15s` (initial mount) / `0.08s` (re-renders) | Card grids                       |
| **Page sequence delays** | `0.1` → `0.2` → `0.4` → `0.6` → `0.7 + i*0.15` | Header → Title → Sub → Grid wrap → Cards |
| **Scroll-in margin** | `-50px` to `-80px`                      | `viewport={{ once: true, margin }}`    |

Two CSS keyframes are registered (for Radix accordion / future use):

```js
keyframes: {
  "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
  "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
}
```

The hero photo uses ambient slow `animate-[spin_20s_linear_infinite]` and `animate-[spin_30s_linear_infinite_reverse]` rings.

#### Motion patterns to reuse

* **Card grid first-paint** (the signature pattern):
  ```tsx
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0,  scale: 1 }}
  exit=  {{ opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2 } }}
  transition={{ duration: 0.6, delay: 0.7 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
  whileHover={{ y: -8, transition: { duration: 0.3 } }}
  ```
* **Filter swap**: wrap the grid in `<AnimatePresence mode="wait">`, key it on the active filter, and use `initial/animate/exit opacity 0↔1` for `0.25s`. After mount, drop the long stagger to `0.2 + index * 0.08`. (Track a `useRef(true)` flag flipped in `useEffect` to switch.)
* **In-view reveal**: section heads use `whileInView` with `viewport={{ once: true, margin: "-40px" }}` and `initial={{ opacity: 0, y: 24 }}`.
* **Header fade-up**: `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}`.
* **Title pop-in**: `initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ..., delay: 0.2 }}`.
* **Reduced motion**: import `useReducedMotion` from `@/hooks/useReducedMotion`, not Framer Motion. Use `initial={false}` or visible variants while reduced; remove translation, scale, stagger, entrance delays, and hover lift. Use `motion-safe:` for CSS transforms. SSR/hydration defaults to reduced motion to keep markup consistent and content readable. Globally:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 2.7 Global behaviors

These are set once in `globals.css` and assumed everywhere:

* Page shells use `min-h-svh` (not `min-h-screen`) so mobile Safari/Chrome chrome does not crop the fold.
* `body { background: var(--background); color: var(--foreground); overflow-x: clip; }` (clip, so sticky keeps working; `<html>` overflow is left alone for IntersectionObserver)
* `@media (hover: none) { .group .group-hover\:opacity-100 { opacity: 1 } }` - touch devices keep hover-reveal CTAs visible.
* **Scrollbars hidden** (`::-webkit-scrollbar { display: none; }`, `scrollbar-width: none`). The page is still scrollable.
* `::selection { @apply bg-primary/15 text-foreground; }` (dark ink on the translucent-black wash - the reverse is unreadable)
* Focus visible everywhere: `*:focus-visible { outline: 2px solid hsl(var(--ring)) !important; outline-offset: 3px; }`. Never implement focus with box shadows in this flat system.
* `img { max-width: 100%; height: auto; }`
* Modal scroll locking, focus containment, Escape dismissal, and focus restoration belong to Radix Dialog or the lightbox library. Do not layer manual body overflow toggles over these primitives. Dialog surfaces use `data-lenis-prevent` to avoid smooth-scroll interference.

### 2.8 Iconography

* **Single library:** `lucide-react`. Inline SVGs are used only for one-off shapes (custom mission/leadership icons).
* **Default size:** `w-4 h-4` for inline buttons/links, `w-5 h-5` for nav/icon buttons, `w-6 h-6` for prominent header icons, `w-8 h-8` (`size-8`) inside primary/10 chip backgrounds.
* **Stroke:** Lucide defaults are 2; custom decorative SVGs use `strokeWidth={1.5}` for a softer look (footer icons).
* **Icon chip pattern** (used in About, Timeline, Contact):
  `<div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"><Icon className="w-8 h-8 text-primary" /></div>`
* **Mini icon chip** (used in bento card kickers):
  `<div className="p-2 bg-muted/50 rounded-lg border border-border"><Icon className="w-5 h-5 text-muted-foreground" /></div>`

### 2.9 Imagery

* **Use `next/image`** with known dimensions or a reserved aspect-ratio container. Blur placeholders improve loading appearance; they do not reserve layout by themselves.
* **Responsive sizes:** supply `sizes` for the actual grid. Projects use one/two/three columns; Startups use one column until `lg`, then two. Account for page gutters and grid gaps rather than sharing a single hardcoded value.
* **Detail media:** `AutoImage` reads intrinsic dimensions from `lib/projectImageSizes.ts`, sets an explicit aspect ratio, and retains the portrait width cap without cropping. Update that map when adding or replacing project images. Startup media uses `lib/brandImageSizes.ts`.
* **Aspect ratios:** listing image cards use 16:9, article covers use 21:10, detail images preserve their source ratio. The hero portrait remains square in the shipped flat system.
* **Treatment:** the hero portrait uses `grayscale group-hover:grayscale-0`.
* **Loading and failure:** keep geometry stable, expose visible loading feedback, and replace failed article/gallery images with labelled “image unavailable” feedback. Do not hide the entire route fallback with `opacity-0`.
* **Video:** use `components/projects/VideoPlayer.tsx`, not browser-native controls. `lib/projectVideoMetadata.ts` provides each source's dimensions and poster before loading, including portrait videos. Keep source files and posters in `public/projects/` and update the registry together. The minimal bar contains play/pause, a keyboard-operable timeline, time, mute, and fullscreen; controls remain visible with 44px targets and the timeline gets its own row on phones. Show the poster before playback, a small status while buffering, and an explicit failure message without collapsing the frame. Fullscreen uses the whole player where supported, with native video fullscreen as the Safari fallback.
* **Source video defects:** repair unwanted borders in the encoded asset rather than hiding them with player cropping. Preserve the intended frame dimensions, frame timing, and audio; use browser-compatible H.264/AAC with faststart.

---

## 3. Components

All components are styled with Tailwind only. The shadcn-style base lives in `components/ui/`. Custom domain components live in `components/`.

### 3.1 Button (`components/ui/button.tsx`)

The canonical CVA variants and sizes live in `components/ui/button.tsx`. Reuse that implementation rather than copying a second class matrix. `nav` uses the neutral navigation surface; `connect` uses the blue accent. Focus comes from the global outline. Hover scale is `motion-safe` only.

```tsx
<Button asChild variant="connect">
  <Link href="/contact">Connect</Link>
</Button>
```

Conventions:

* `<Button asChild>` is used to wrap `<Link>`. Always.
* Hero CTAs add `rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300` on top of `size="lg"`.
* Big "Get In Touch"-style buttons use raw classes:
  `bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105`.
* Section CTAs (full-width inline) use:
  `inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105 shadow-sm hover:shadow-md` followed by an inline arrow SVG.

### 3.2 Skeleton

```tsx
<div className={cn("animate-pulse rounded-md bg-muted", className)} />
```

Used for image, modal, and thumbnail loading. Always positioned `absolute inset-0` over the loading element with the loaded image fading in (`transition-opacity duration-300`).

### 3.3 Navigation (`components/Navigation.tsx`)

The header switches at `lg` (1024px). Below that width, the identity and hamburger fit without colliding with a centered desktop nav.

* **Outer header:** `px-4 md:px-8` with the identity linked to `/`.
* **Desktop nav:** centered and fixed on listing pages, absolute on detail pages. Each destination is a single `<Button asChild><Link /></Button>`, never a button nested in a link.
* **Active section:** exact path or descendant path; both desktop and mobile use `bg-nav-active/10 text-nav-active`. Use `aria-current="page"` for the exact destination and `"location"` for its parent section on a detail page.
* **Mobile menu:** controlled Radix Dialog with a labelled title, right-aligned `h-dvh w-[78vw] max-w-[320px]` panel, 44px close/open targets, and a bottom Connect link. Opening transfers focus inside; Tab remains inside; Escape/backdrop dismisses; closing restores focus. It closes on route change or when resizing to desktop.
* **Motion:** the panel is immediately usable, with no staggered focusable links. The backdrop respects the global reduced-motion CSS.

### 3.4 Footer (`components/Footer.tsx`)

* `bg-background border-t border-border`, padding `px-4 md:px-20 py-12 md:py-16`.
* 4-column grid `md:grid-cols-4 gap-10 md:gap-8`: brand, contact icons, page links, about blurb.
* Section labels: `text-sm font-semibold text-foreground uppercase tracking-wide mb-4`.
* Icon links: muted, hover-scoped pill `p-2 rounded-full hover:bg-muted/50 hover:text-foreground transition-colors`, `strokeWidth={1.5}`.
* Bottom rule with copyright: `mt-12 pt-8 border-t border-border` and `text-muted-foreground text-sm text-center`.

### 3.5 Cards — the master patterns

There are **five distinct card archetypes**. Don't invent a sixth — compose from these.

#### A. Image card with text below (signature)

Used by `ShowcaseCard`, `PostPreview`, and featured startups. Navigating is a link action, not a button action.

```tsx
<Link href={href} className="w-full text-left flex flex-col group">
  {/* Image card */}
  <div className="relative w-full overflow-hidden border border-border/80
                  bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30 aspect-video">
    <Image fill placeholder="blur" blurDataURL={BLUR_DATA_URL} className="object-cover" />
  </div>

  {/* Text — always BELOW the image card, never on top */}
  <div className="mt-5 flex flex-col gap-1">
    <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
    <p className="text-sm text-muted-foreground">
      {date}
      <span className="mx-1.5 text-muted-foreground/60" aria-hidden>•</span>
      {category}
    </p>
    <p className="text-sm text-muted-foreground/90 leading-relaxed mt-2 line-clamp-2">{description}</p>

    {/* Reveal on hover and keyboard focus; also visible on touch devices. */}
    <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
      View Project <ChevronRight className="w-3.5 h-3.5" />
    </span>
  </div>
</Link>
```

Key invariants:

* Image and text share one primary native link. If a card has additional actions, put that link and the actions in a noninteractive `article` as siblings; never intercept keyboard events on the container.
* Use one restrained hover lift, disabled for reduced motion. Do not stack CSS translation and Framer Motion translation on the same card.
* “View …” is visible on hover, focus-within, and touch. Secondary actions such as “View Website” remain independently keyboard-accessible and preserve native new-tab behavior.

#### B. Solid info card (About / Contact / CTA)

A flat surface with optional icon, no image:

```tsx
<div className="bg-card border border-border p-5 sm:p-6 lg:p-8">
  <div className="w-16 h-16 text-primary mb-6">{icon}</div>
  <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
  <p className="text-muted-foreground leading-relaxed">{description}</p>
</div>
```

Variants:

* **About grid:** one phone column, two tablet columns, three desktop columns. Keep title and body measures readable with responsive card padding.
* **Centered Contact cards:** one column on phones, two from `sm`, four from `xl`; `min-w-0 flex flex-col text-center`, wrapping long handles with `overflow-wrap:anywhere`, and actions with `mt-auto`. Use destination-specific labels such as “Send email” and “View GitHub”; only web destinations open new tabs.
* **Big CTA card:** `bg-card border border-border p-6 sm:p-12 max-w-4xl mx-auto`, headline `text-3xl`, body `text-muted-foreground max-w-2xl mx-auto`, then one primary action.

#### C. Bento card (large, decorated)

The homepage cards have distinct roles. “Architecture to Production” communicates solutions architecture at Vercel through a Frontend → Compute → Data & AI diagram. “Full-Stack Web & AI” uses a monochrome stack of offset panels, a subtle grid, technical icons, and an inverted AI layer. Hover alignment is motion-safe only. “Hands-On Engineering” covers prototyping, debugging, and implementation rather than repeating architecture or stakeholder alignment. “Community & Growth” retains its content, and both second-row surfaces stretch to equal heights. Use direct copy without em dashes, readable narrow-screen labels, and the shared reduced-motion preference.

Used in the home "What I Build" grid. Roughly 2 sizes mixed (`md:col-span-2` + `md:col-span-1`) with `gridAutoRows: "minmax(300px, auto)"`. Each card:

```tsx
<div className="relative flex flex-col justify-between overflow-hidden
                rounded-2xl bg-card border border-border
                p-6 md:p-8 h-full min-h-[300px]
                hover:border-primary/20 transition-colors">
  {/* Decoration: faint dot grid OR pattern */}
  <div className="absolute inset-0 opacity-[0.03 to 0.08] pointer-events-none"
       style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

  {/* Header: tiny icon chip + uppercase eyebrow + title + description */}
  <div className="relative z-10 mb-8 md:w-2/3">
    <div className="flex items-center gap-2 mb-3">
      <div className="p-2 bg-muted/50 rounded-lg border border-border"><Icon className="w-5 h-5 text-muted-foreground" /></div>
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Velocity</span>
    </div>
    <h3 className="text-2xl font-medium text-foreground leading-tight">{title}</h3>
    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{copy}</p>
  </div>

  {/* Body: visual (illustration/code/pipeline) */}
  ...

  {/* Optional metrics row */}
  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
    <div className="flex flex-col">
      <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">2M<span className="text-primary font-bold text-lg">+</span></span>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Engagement</span>
    </div>
    ...
  </div>

  {/* Optional ambient glow */}
  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-ring/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
</div>
```

Bento card rules:

* Title weight is **`font-medium`**, not `font-bold` — this is what differentiates bento from product cards.
* Decoration is *always* `pointer-events-none` and `aria-hidden`.
* Hover effect is a single subtle `hover:border-primary/20`, no lift.
* Floating orbs (`motion.div` with `bg-primary/10 rounded-full blur-3xl`) are gated on `useReducedMotion`.

#### D. "Connector" / hero diagram card

Used in the home hero to flank the centered portrait. They are deliberately less heavy than bento cards:

```tsx
<motion.div
  className="group relative flex flex-col rounded-3xl border border-border
             bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md
             transition-all duration-300 w-full lg:w-[360px] xl:w-[380px] p-6"
  whileHover={{ y: -6 }}
>
  {/* Top hairline */}
  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-60" />

  {/* Title row with status dot */}
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-2.5 h-2.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
      <div className="absolute -inset-2 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <h3 className="text-foreground font-semibold tracking-tight text-xl">{title}</h3>
  </div>

  <p className="text-muted-foreground text-sm md:text-base font-medium mt-2">{subtitle}</p>
  <p className="text-muted-foreground/80 text-sm md:text-[15px] leading-relaxed mt-3">{copy}</p>

  {/* Tag pills */}
  <div className="mt-4 flex flex-wrap gap-2">
    {tags.map(t => (
      <span className="text-xs md:text-[13px] px-2.5 py-1 rounded-full border border-border bg-background/30 text-muted-foreground">{t}</span>
    ))}
  </div>

  {/* Footer micro-label */}
  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/50 mt-5 font-semibold group-hover:text-primary/70 transition-colors">
    Systems Layer
  </div>
</motion.div>
```

Reusable parts: top hairline, status-dot-with-glow, tag pill row, micro footer label.

#### E. Photo tile (masonry)

```tsx
<motion.div className="group relative w-full h-full overflow-hidden rounded-lg bg-muted">
  <Image className="block w-full h-auto" placeholder="blur" />
  <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/0 transition-colors duration-400 ease-out group-hover:ease-in group-hover:bg-black/40" />
</motion.div>
```

Different from cards A/B/C: corners are `rounded-lg`, hover dims with a black overlay, no shadow.

### 3.6 Filter bar

Use `FilterBar` for Projects and Photography:

```tsx
<FilterBar
  label="Project categories"
  tabs={categories}
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>
```

The labelled group contains native buttons with `aria-pressed`, wrapping layout, and minimum 44px height. The page supplies a polite result-count status near its results. These are filters, not ARIA tabs.

Photography stores category/slide state in the URL. Opening a photo pushes one marked history entry, slide changes replace it, and closing returns to the preceding gallery entry. A directly loaded photo URL closes by replacement rather than leaving the site.

### 3.7 Tag / chip vocabulary

| Chip                   | Class                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| **Soft tag**           | `text-xs md:text-[13px] px-2.5 py-1 rounded-full border border-border bg-background/30 text-muted-foreground` |
| **Tech tag (accent)**  | `px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium`                                    |
| **Code-tag (mono)**    | `px-2.5 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-[10px] uppercase tracking-wider font-medium text-muted-foreground` |
| **Status badge**       | `inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-muted text-foreground border border-border` |
| **Ghost chip (small)** | `rounded-lg bg-muted/50 px-3 py-2 text-center` (used for inline metric tiles)                              |

### 3.8 Modal (`ProjectModal`, `BrandModal`)

A shared modal pattern. Reuse this exact shell for every "detail overlay" on new sites.

* **Container:** `fixed inset-0 z-50 flex items-center justify-center`.
* **Backdrop:** `absolute inset-0 bg-black/50 backdrop-blur-sm` (clicking it closes).
* **Card:** `relative flex flex-col bg-background border border-border rounded-2xl sm:rounded-3xl shadow-2xl max-w-7xl max-h-[95svh] w-full mx-2 sm:mx-4 overflow-hidden`.
* **Sticky header:** `flex-shrink-0 flex items-start justify-between p-4 sm:p-6 border-b border-border gap-3`. Eyebrow `text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide` then `<h2 className="text-lg sm:text-2xl font-bold ... mt-1 leading-snug">`. Right-side close button: `p-2 hover:bg-muted rounded-full transition-colors touch-manipulation` with `<X className="w-5 h-5 sm:w-6 sm:h-6" />`.
* **Body:** `flex-1 min-h-0 overflow-y-auto`, inner padding `p-4 sm:p-6 pb-8 sm:pb-12`.
* **Two-column body:** `grid lg:grid-cols-3 gap-6 sm:gap-8`, content in `lg:col-span-2 space-y-5 sm:space-y-6`, sidebar in `space-y-6` with sub-headings `text-lg font-semibold` and chips/links underneath.
* **Bullet list:** `<ul className="space-y-2"><li className="flex items-start gap-3"><div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" /><span className="text-muted-foreground">…</span></li></ul>`.
* **Carousel:** measure each media item's natural aspect ratio in parallel before rendering, render a translateX strip with `flex transition-transform duration-300 ease-in-out h-full`, prev/next buttons `absolute … bg-black/50 text-white rounded-full p-2.5 hover:bg-black/70 z-10`, position pill `absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-sm rounded-full`.
* **Thumbnail strip:** `flex gap-2 mt-3 sm:mt-4 overflow-x-auto pb-1` with each thumb `w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2`, active `border-primary`, otherwise `border-border hover:border-muted-foreground`.
* **Lifecycle:** `useEffect` to lock `documentElement.style.overflow` and `body.style.overflow` while open; bind `Escape` to close; reset internal state when closed; reset measurement state when content changes.
* **Action item link** (e.g. "View Live Site"):
  ```tsx
  <a className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors">
    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"><Icon className="w-4 h-4 text-primary" /></div>
    <span className="text-foreground font-medium">View Live Site</span>
  </a>
  ```

### 3.9 Timeline (`components/Timeline.tsx`)

A vertical timeline with a left rail.

* **Section header:** title chip + huge title.
  ```tsx
  <div className="flex items-center mb-12">
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mr-6"><Icon className="w-8 h-8 text-primary" /></div>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">{title}</h2>
  </div>
  ```
* **Rail:** `absolute left-8 top-0 bottom-0 w-0.5 bg-border`.
* **Item:** use compact phone rail offsets and padding, restoring wider spacing at `sm`; keep content and dates readable rather than spending narrow-screen width on the rail.
* **Item meta row:** `flex flex-col md:flex-row md:items-center md:justify-between mb-3` — title `text-xl font-bold text-foreground`, subtitle `text-primary font-medium`, date `text-primary font-medium text-sm md:text-base`.
* **Reveal:** use in-view motion only for standard-motion users. Reduced-motion content is already visible, with no horizontal entrance, stagger, or hover scale.

### 3.10 Hero diagram (signature)

The home hero is a full system in itself. Reuse on a new site as a "manifesto block."

* Outer `main` is full-viewport `min-h-screen flex flex-col items-center bg-background overflow-hidden px-6 md:px-20 py-16`.
* Big centered name (`text-9xl` cap), italic subtitle, single CTA.
* Below: a 3-up row at `lg+`, stacked `md and below`. Two **connector cards** (3.5C) flank a circular portrait.
* Portrait: `w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72`, `Image` inside `rounded-full overflow-hidden bg-muted`, with **grayscale-on-rest, color-on-hover** (`object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02]`). A pure-decorative ring frame: `pointer-events-none absolute inset-0 rounded-full border-[6px] border-background shadow-2xl z-10`. Two slow-spinning hairline rings: `border border-primary/5 rounded-full animate-[spin_20s_linear_infinite]` and `... animate-[spin_30s_linear_infinite_reverse]`. Soft glow: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[80px] -z-10 rounded-full`.
* Connector lines: an SVG sized to the section (`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible hidden lg:block`) drawing two `motion.path`s with `stroke="hsl(var(--border))" strokeWidth="1.5" strokeLinecap="round"` whose `pathLength` animates from 0 → 1 over 1.2s. Endpoints come from a `useElementLines` hook that reads bounding rects of the two cards and the portrait wrapper.

### 3.11 Empty / not-found

* Empty filter result: `<motion.p className="text-muted-foreground text-center py-16">…</motion.p>`.
* 404 page: large `text-9xl font-bold text-primary` number, then a `text-4xl md:text-6xl font-bold` title, muted subtitle, and a `<Button asChild size="lg">` back to `/`. Wrapper is a centered `min-h-screen flex items-center justify-center`.

### 3.12 Article / long-form

* Outer wrapper: `<div className="min-h-screen bg-background text-foreground">` → `<main className="px-4 md:px-20 pt-8 pb-16">`.
* Back link strip: `pt-2 pb-4` containing a `max-w-4xl mx-auto` link with `<ArrowLeft />` and `text-muted-foreground hover:text-foreground`.
* Article: `pt-6 pb-12 md:pb-16 w-full` then `max-w-4xl mx-auto`.
* Header: `<PostHeader />` shows the post number, title, publication date through `DateFormatter`, and a reserved 21:10 cover with loading/error feedback.
* Body: `prose prose-lg prose-slate ... max-w-none` inside `max-w-2xl mx-auto`.
* Prev/Next: a top-bordered nav with two `Link`s carrying small uppercase eyebrows ("Previous" / "Next") above the truncated post title.

---

## 4. Page scaffolding

Every non-home page follows the same four-line skeleton:

```tsx
<div className="min-h-screen bg-background text-foreground">
  <main className="px-4 md:px-20 pt-8 pb-16">
    {/* 1. Page header (title + optional subtitle) */}
    {/* 2. Optional filter row */}
    {/* 3. Content (grid / list / album) */}
    {/* 4. Optional CTA card */}
  </main>
</div>
```

Use `components/PageHeader.tsx` rather than duplicating its motion markup:

```tsx
<PageHeader title={title} subtitle={subtitle} className="text-center mb-12" />
```

It handles the hydration-safe motion preference. Photography passes `animate={false}` because the loading fallback already shows the stable heading. Route fallbacks show visible skeletons/status instead of a blank content area.

Detail pages share `components/BackLink.tsx` (`pill` bordered-surface variant, `plain` rail variant). Positioning belongs to the page wrapper. Filters remain centered or right-aligned on Projects from `md`. Use shared motion helpers for optional standard-motion transitions; reduced-motion grids have no delay or stagger.

Project detail pages keep “Back to Projects” in normal document flow, not sticky. End each project with image-backed Previous/Next links after any external project CTA. Follow the Projects listing order and wrap the first/last entries so browsing continues in either direction. Cards use real project thumbnails, side-by-side desktop layout, stacked phone layout, and native links with descriptive accessible labels.

---

## 5. Layout constants (cheat sheet)

```
Page wrapper:           min-h-screen bg-background text-foreground
Main padding:           px-4 md:px-20 pt-8 pb-16
Content max width:      max-w-7xl mx-auto (grids), max-w-3xl/4xl (text), max-w-2xl (prose)

Card grids:             grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
Two-up grid:            grid grid-cols-1 lg:grid-cols-2 gap-10
Bento grid:             grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6
                        gridAutoRows: minmax(300px, auto)
                        first card: md:col-span-2

Card image:             aspect-video rounded-2xl border border-border/80
                        bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30
                        shadow-[0_2px_12px_hsl(0_0%_0%_/_0.08)]
                        transition-shadow duration-300 group-hover:shadow-lg

Card text gap:          mt-5 flex flex-col gap-1
Title:                  text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2
Meta:                   text-sm text-muted-foreground (with mx-1.5 muted/60 bullet)
Description:            text-sm text-muted-foreground/90 leading-relaxed mt-2 line-clamp-2/3
Reveal CTA:             inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary
                        opacity-0 group-hover:opacity-100 transition-opacity
```

---

## 6. Accessibility & UX details

These are non-negotiable in this system:

* Keyboard focus always has a visible blue outline; decorative shadow suppression must not remove it.
* Decorative SVGs/divs use `aria-hidden="true"` and `pointer-events-none`.
* Navigation uses native links, including cards. Actions use native buttons. Never nest interactive descendants inside another interactive control.
* Filter selection is exposed with `aria-pressed`; changes have a concise polite result announcement.
* Modals use established primitives: Escape/backdrop dismissal, scroll lock, focus containment, and focus restoration are required.
* `touch-manipulation` is added to anything with `min-w-[44px] min-h-[44px]` tap targets (especially modal nav arrows and mobile menu controls).
* Reduced motion uses the hydration-safe shared hook plus `MotionProvider`; disable transforms, delays, and stagger, not just CSS durations.
* Images always carry meaningful `alt` text; cover images use `Cover image for {title}`; thumbnails use `Thumbnail {n}`; skeletons appear *under* the image rather than blocking.
* Smooth scroll + scrollbars hidden = *no* JS scrollbars exposed; do not add custom scrollbars on top of that.

---

## 7. SEO / app-shell defaults

While not visual, these are part of the system and should be preserved on new sites:

* Inter loaded once on `<body>` via `next/font/google` — no other fonts.
* Page metadata via `export const metadata: Metadata` per route, all pages set `alternates: { canonical: "/path" }`.
* `<Analytics />` (or your analytics) renders once in `RootLayout`.
* Structured data (`<StructuredData type="website" />`) injected in `<head>`.
* Manifest at `/manifest.json`, single favicon (e.g. `/fav1.jpg`) — `icons: { icon, shortcut, apple }` all point at the same file.

---

## 8. Build-from-scratch checklist for a new site

Use this as a literal copy/paste order when starting a new site in this style.

1. **Tooling:** Next.js (App Router) + TypeScript + Tailwind v3 + `tailwindcss-animate` + `@tailwindcss/typography`.
2. **Drop in `app/globals.css`** with the `:root` token block from §2.1, the `@layer base` global rules, the `::selection`, focus, scrollbar-hidden, and reduced-motion rules.
3. **Drop in `tailwind.config.ts`** extending `theme.colors` with all token mappings (background/foreground/primary/secondary/muted/accent/destructive/border/input/ring/popover/card/nav/hero/project-card/sidebar) and `borderRadius` derived from `--radius`. Plugins: `tailwindcss-animate`, `@tailwindcss/typography`. Container: `center: true, padding: "2rem", screens: { "2xl": "1400px" }`.
4. **Add `lib/utils.ts`** with the `cn(clsx + twMerge)` helper.
5. **Add `lib/blur.ts`** with the shared `BLUR_DATA_URL`.
6. **Install:** `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot` (and any other Radix you need).
7. **Add `components/ui/button.tsx`** verbatim from §3.1, `components/ui/skeleton.tsx` verbatim from §3.2.
8. **Add `Navigation.tsx` + `Footer.tsx`** verbatim (with new nav items) — these define the brand surface.
9. **Compose pages** using the §4 page skeleton + §5 cheat sheet.
10. **Use card archetype A** for any "list of things with images." Use B for "info tiles." Use C only for a true bento moment. Reuse the modal shell (3.8) and timeline (3.9) when needed.
11. **Enhance with motion** using the helpers in `lib/motion.ts` and the hydration-safe preference hook. Content starts readable; reduced-motion users receive no transform animations or delays.
12. **Run an accessibility pass:** visible focus outlines, native navigation links/action buttons, modal Escape/backdrop/focus restoration, reduced-motion direct loads, filter state, image loading/error feedback, and 44px touch targets.

If you stick to these primitives — the eight tokens, the five card archetypes, the standard motion sequence, and the page skeleton — any new site will look and feel like this one without copying a single line of page content.

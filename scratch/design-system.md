# Design System Reference

## Fonts

| Role | Font | Google Fonts Import | Weights |
|---|---|---|---|
| **Headings** (h1–h6) | `Plus Jakarta Sans` | `Plus_Jakarta_Sans` | 400–800 (extrabold used on hero) |
| **Body / UI** | `Poppins` | `Poppins` | 400, 500, 600 |

### Next.js font setup
```ts
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
```

Apply both variables to the `<html>` tag:
```tsx
<html className={`${plusJakarta.variable} ${poppins.variable}`}>
```

### CSS rules
```css
body {
  font-family: var(--font-poppins);
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-plus-jakarta);
}
```

---

## Colour Tokens

All colours are CSS custom properties defined on `:root`.

### Core palette

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#171a17` | Near-black (headings, dark sections, footer bg) |
| `--text-body` | `#373e37` | Body paragraph text |
| `--text-light` | `#dce0dc` | Muted / footer text on dark bg |

### Brand (lime-green)

| Token | Hex | Usage |
|---|---|---|
| `--brand-main` | `#8ac826` | Primary CTA buttons, accents, active states |
| `--brand-dark` | `#6d9e1e` | Hover state for brand-main buttons |
| `--brand-light` | `#95d72c` | Glow / blur decorative blobs |
| `--brand-subtle` | `#c6e98d` | Light tint backgrounds, badges |

### Surface & border

| Token | Hex | Usage |
|---|---|---|
| `--surface-1` | `#ffffff` | Card background |
| `--surface-2` | `#f4f4f5` | Slightly off-white areas (zinc-50 equivalent) |
| `--border-color` | `#e4e4e7` | Default border (zinc-200 equivalent) |

### Other named colours used inline

| Value | Usage |
|---|---|
| `#25D366` | WhatsApp green button |
| `#1fb85a` | WhatsApp hover |
| `zinc-200` (`#e4e4e7`) | Most card/image borders |
| `zinc-50` (`#fafafa`) | Card fill backgrounds |
| `zinc-800` (`#27272a`) | Dark text in light cards |
| `emerald-50/200/600/700` | "Packages Earned" accent card |

---

## Tailwind v4 Theme Setup

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171a17;
  --text-body: #373e37;
  --text-light: #dce0dc;

  --brand-main: #8ac826;
  --brand-dark: #6d9e1e;
  --brand-light: #95d72c;
  --brand-subtle: #c6e98d;

  --surface-1: #ffffff;
  --surface-2: #f4f4f5;
  --border-color: #e4e4e7;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-text-body: var(--text-body);
  --color-text-light: var(--text-light);

  --color-brand-main: var(--brand-main);
  --color-brand-dark: var(--brand-dark);
  --color-brand-light: var(--brand-light);
  --color-brand-subtle: var(--brand-subtle);

  --font-plus-jakarta: var(--font-plus-jakarta), sans-serif;
  --font-poppins: var(--font-poppins), sans-serif;
}
```

---

## Typography Scale (actual values used)

| Use | Class | Size |
|---|---|---|
| Hero H1 | `text-[72px] font-extrabold` | 72px on desktop |
| Section H2 | `text-[48px] md:text-[64px] font-bold` | 48–64px |
| Card H3 | `text-[28px] font-bold` | 28px |
| Body large | `text-[20px] md:text-[24px] font-medium` | 20–24px |
| Body normal | `text-[16px]` | 16px |
| Label/overline | `text-xs uppercase tracking-wider font-semibold` | 12px |
| Footer heading | `text-[20px] font-semibold` | 20px |

---

## Spacing & Layout

| Pattern | Value |
|---|---|
| Max width | `max-w-[1512px] mx-auto` |
| Horizontal padding | `px-4 sm:px-6` |
| Section padding | `py-[80px]` to `py-[146px]` |
| Card border radius | `rounded-[16px]` (cards), `rounded-[20px]` (images), `rounded-[10px]` (buttons) |
| Card border | `border border-zinc-200` |
| Card shadow | `shadow-sm` |

---

## Button Patterns

```tsx
/* Primary (dark) */
<button className="px-[25px] py-[15px] bg-foreground hover:bg-brand-dark rounded-[10px] text-background font-medium transition-colors">

/* Brand green */
<button className="px-[25px] py-[15px] bg-brand-main hover:bg-brand-dark rounded-[10px] text-white font-medium transition-colors">

/* Outline */
<button className="px-[25px] py-[15px] border border-zinc-200 hover:border-brand-main text-text-body hover:text-brand-main rounded-[10px] font-medium transition-colors">
```

---

## Animations

| Class | Keyframe | Usage |
|---|---|---|
| `animate-[marquee_20s_linear_infinite]` | `translateX(0 → -50%)` | Scrolling text strip |
| `animate-fadeInUp` | `opacity 0→1, translateY 18px→0` | Card entrance |
| `animate-float` | `translateY 0→-12px→0, 4.2s` | Floating hero image |
| `reveal-section` | CSS class, blur+translate+scale fade-in | Section entrance on scroll |

---

## Section Patterns

### Dark marquee strip
```tsx
<section className="w-full bg-foreground py-6 overflow-hidden transform -rotate-2 scale-105 my-12">
  {/* Rotated strip with scrolling brand keywords */}
</section>
```

### Brand glow blob (hero decoration)
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[85%] bg-brand-light opacity-20 blur-[100px] rounded-full" />
```

### Overline label pattern
```tsx
<p className="text-brand-main font-semibold text-[20px] mb-2 font-poppins uppercase tracking-wider">
  Section label
</p>
<h2 className="text-[48px] font-bold font-plus-jakarta text-foreground">
  Main heading
</h2>
```

### Card
```tsx
<div className="bg-white border border-zinc-200 rounded-[16px] p-6 shadow-sm">
```

### Footer
```tsx
/* Dark footer with foreground background */
<footer className="bg-foreground text-text-light pt-[96px] pb-[32px]">
```

---

## Brand Identity Summary

- **Primary colour**: Lime-green `#8ac826` — used for accents, CTAs, active links, icon highlights
- **Background**: Clean white `#ffffff`
- **Dark contrast**: Near-black `#171a17` — used for headings, footer background, primary button bg
- **Feel**: Clean, professional, modern SaaS/personal brand — high contrast, editorial typography
- **Theme colour** (browser chrome): `#8ac826`

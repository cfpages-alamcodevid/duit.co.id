# Glass Effect System - "The Sovereign Vault"

**Date Created:** 18 April 2026  
**Last Updated:** 18 April 2026 (v2 - Architecture Update)  
**Status:** ✅ Implemented in `src/index.css`  
**Inspiration:** Real glass with reflections, refractions, and depth

---

## Architecture Overview

The glassmorphism system is **layered** to maintain visual hierarchy:

```
┌─────────────────────────────────────────────────┐
│ Background Gradient                              │
│ (white → #F8F9FA → #F5F6F7) + Floating Orbs     │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ .glass-body (Main Site Wrapper)                 │
│ - Semi-transparent container with rounded corners│
│ - Contains: Navbar + Content + Footer            │
│ - Light blur (8px) for subtle glass effect       │
└─────────────────────────────────────────────────┘
        ├─────────────────────────────────┤
        ↓                                 ↓
┌──────────────────┐           ┌──────────────────────┐
│ Navbar Row       │           │ Content Area         │
│ - Tonal sep      │           │ - Proper padding     │
│ - No glass-card  │           │ - Elements use       │
│ - Clean & flat   │           │   .glass-card        │
└──────────────────┘           └──────────────────────┘
                                         ↓
                               ┌──────────────────────┐
                               │ .glass-card          │
                               │ (Inner Elements)      │
                               │ - More opaque (65%)   │
                               │ - High blur (20px)    │
                               │ - Readable text       │
                               └──────────────────────┘
                                         ↓
                               ┌──────────────────────┐
                               │ Footer                │
                               │ - No glass-card       │
                               │ - Part of unified body│
                               │ - Tonal separation    │
                               └──────────────────────┘
```

---

## CSS Classes

### 1. `.glass-body` - Main Site Wrapper

**Purpose:** The main container that holds the entire site body  
**Usage:** Applied in `AppShell.tsx`

```css
.glass-body {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
```

**Characteristics:**
- Medium opacity (55%) - visible glass effect but not too transparent
- Medium blur (12px) - frosted effect
- White border (30% opacity) - defines the glass edge clearly
- Top highlight inset shadow - simulates light hitting top of glass
- Soft outer shadow - subtle depth
- Rounded corners: `rounded-[28px]` on desktop, sharp on mobile
- Margin from viewport: `m-3` (mobile) to `m-5` (desktop)

---

### 2. `.glass-card` - Inner Elements

**Purpose:** Cards, modals, dropdowns, and any floating element INSIDE the body wrapper  
**Usage:** Applied to ArticleCard, GlassCard component, MegaMenu dropdown, etc.

```css
.glass-card {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2),
    inset 0 0 50px 25px rgba(255, 255, 255, 0.9);
}
```

**Characteristics:**
- **Higher opacity (65%)** - ensures text inside is readable
- **Higher blur (20px)** - strong frosted glass effect
- **Edge highlights** (::before for top, ::after for left)
- **Built-in padding** - add padding via Tailwind (e.g., `p-6`, `p-8`)
- **Inner glow** - simulates glass depth

**DO NOT:**
- Override with `!p-0` or smaller padding values (cramps content)
- Use solid backgrounds inside (defeats the purpose)
- Add hard borders with opacity >15%

---

### 3. Etched Glass Typography

Inspired by text that looks etched/engraved into glass. Uses `text-shadow` with multiple layers to create depth illusion.

#### `.text-etched` - Body Text
```css
.text-etched {
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5),   /* Top highlight */
    0 -1px 0 rgba(0, 0, 0, 0.05);       /* Bottom shadow */
}
```

#### `.text-etched-heading` - Headings (More Pronounced)
```css
.text-etched-heading {
  font-weight: 700;
  text-shadow:
    0 2px 0 rgba(255, 255, 255, 0.6),   /* Top highlight */
    0 -2px 0 rgba(0, 0, 0, 0.08),       /* Bottom shadow */
    0 4px 8px rgba(0, 0, 0, 0.04);      /* Soft glow */
  letter-spacing: -0.02em;
}
```

#### `.glass-highlight` - Section Heading Background
Small glass-like highlight background for inline headings or labels.

**Usage:**
```tsx
<h3 className="glass-highlight">Section Title</h3>
```

---

### 4. Navbar Architecture

**Two-Row Structure:**

#### Top Row - Logo, User Links, CTA
```tsx
<div className="w-full bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-white/5 px-4 sm:px-6 lg:px-12 py-3">
  <div className="flex items-center justify-between">
    {/* Logo & Site Title */}
    <Link to="/" className="...">
      <Shield />
      <span className="text-etched-heading">Duit.co.id</span>
    </Link>

    {/* User Links - Dashboard, Profile, CTA */}
    <div className="flex items-center gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profil</Link>
      <Link to="/quiz" className="gold-button">Mulai Sekarang</Link>
    </div>
  </div>
</div>
```

#### Bottom Row - Main Navigation Menu
```tsx
<div className="w-full bg-white/10 dark:bg-black/10 border-b border-white/10 dark:border-white-5 px-4 sm:px-6 lg:px-12 py-2">
  <div className="hidden lg:flex items-center gap-6">
    <KnowledgeMegaMenu />
    <ToolsMegaMenu />
    <Link to="/law">Hukum</Link>
    <AcademyMegaMenu />
    <Link to="/experts">Ahli</Link>
  </div>
</div>
```

**Characteristics:**
- Top row: Logo + user-related links (Dashboard, Profile, CTA)
- Bottom row: Content navigation (Knowledge, Tools, Law, Academy, Experts)
- Different opacitys for visual hierarchy (20% vs 10%)
- Bottom borders for tonal separation
- All text uses `.text-etched` for etched glass effect
- CTA uses `.gold-button` class

---

### 5. Gold Button (`.gold-button`)

**Structure:** Wrapped in tonal separation container
```tsx
<div className="w-full bg-white/20 dark:bg-black/20 border-b border-white/15 dark:border-white/8 px-2 sm:px-4 pt-2 pb-1">
  <Navbar />
</div>
```

**Characteristics:**
- Semi-transparent background (20% white/black)
- Bottom border for visual separation
- Extra padding top/bottom for MegaMenu breathing room
- No glass-card - flat, clean separation from content

---

## Usage Guidelines

### ✅ DO:
- Use `.glass-card` for ALL floating containers, cards, modals, navbars
- Keep content padding at 32px (built-in) or more for breathing room
- Combine with `text-heading` and `text-body` for proper contrast
- Use ghost borders: `border-white/10` to `border-white/15` (10-15% max)
- Add hover states: `hover:border-aureum-gold/15` or `hover:scale-105`

### ❌ DON'T:
- Override `padding` with smaller values (cramps content)
- Use solid backgrounds inside glass cards (defeats the purpose)
- Add hard borders with high opacity (>15%)
- Use `bg-white` or `bg-black` inside glass cards
- Remove `::before` or `::after` pseudo-elements

---

## Customization Examples

### Glass Card with Accent Border
```tsx
<GlassCard className="border-money-green/15">
  {/* Content */}
</GlassCard>

// Or with Tailwind:
<div className="glass-card border-money-green/15">
  {/* Content */}
</div>
```

### Small Glass Element (Badge/Pill)
```tsx
<div className="glass-card !p-3 !rounded-full">
  {/* Small content */}
</div>
```

### Glass with Hover Effect
```tsx
<div className="glass-card hover:border-aureum-gold/15 transition-all hover:scale-[1.02]">
  {/* Interactive content */}
</div>
```

---

## Visual Breakdown

```
┌─────────────────────────────────────────┐
│  ::before (top highlight)               │
│  ────────────────────────────────       │
│  │                                 │    │
│  │  ::after (left highlight)       │    │
│  │  │                              │    │
│  │  │   Content Area               │    │
│  │  │   (32px padding)             │    │
│  │  │   - Text, buttons, etc.      │    │
│  │  │                              │    │
│  │  └──────────────────────────────    │
│  │                                     │
│  └─────────────────────────────────────┘
│                                         │
│  Outer shadow (soft, diffused)          │
│  Inner glow (simulates glass depth)     │
└─────────────────────────────────────────┘
```

---

## Performance Notes

- **backdrop-filter** is GPU-accelerated on modern browsers
- **12px blur** is optimal - higher values don't add noticeable quality but cost performance
- **-webkit-backdrop-filter** ensures Safari support
- **pointer-events: none** on pseudo-elements prevents interaction blocking

---

## Browser Support

| Browser | backdrop-filter | -webkit-backdrop-filter |
|---------|-----------------|-------------------------|
| Chrome  | ✅ 76+          | ✅                      |
| Firefox | ✅ 103+         | ❌ (not needed)         |
| Safari  | ✅ 9+           | ✅ (required)           |
| Edge    | ✅ 17+          | ✅                      |

---

## Future Enhancements

- [ ] Cursor-tracking shine effect (like GoldShineButton but for cards)
- [ ] Animated glass morph on hover
- [ ] Colored glass variants (money-green tint, aureum-gold tint)
- [ ] Frosted glass mode (higher blur, lower transparency)

---

**Last Updated:** 18 April 2026  
**Maintainer:** Frontend Team  
**Related Files:** `src/index.css`, `src/components/ui/GlassCard.tsx`

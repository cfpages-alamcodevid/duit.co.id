# Duit.co.id Design System: Glassmorphism & Gold Prestige

## 1. Visual Philosophy: "The Sovereign Vault"
The site should feel like a high-end private bank—modern, clean, and prestigious. The core aesthetic is **Glassmorphism** built on **shadcn UI** and **Tailwind CSS**.

### Background Layers
- **Light Theme:** White background with very soft, subtle gradient transition (`bg-gradient-to-br from-white via-[#F8F9FA] to-[#F5F6F7]`)
- **Dark Theme:** True black (`#000000`). All glass components will naturally adopt the dark background through their transparency.

### Unified Glass Body Architecture
The **entire site body** (navbar + main content + footer) is wrapped in a **single unified glass-card container**:
- **Desktop:** Rounded corners (`rounded-2xl`) with 4px margin from viewport edges
- **Mobile:** Sharp edges (`rounded-none`) for full-width experience
- **Glass Effect:** `glass-card` class with backdrop blur, semi-transparent background, ghost borders
- **Background Decorations:** Subtle floating orbs (Money Green top-right, Aureum Gold bottom-left) with `blur-3xl` and 3% opacity

### Navbar Integration
The navbar is **integrated into the glass body**, NOT floating separately:
- No separate glass-card wrapper
- Positioned at top of unified glass container
- Subtle bottom border for tonal separation
- Part of the overall glassmorphic aesthetic

## 2. Surfaces & Glassmorphism
- **Glass Wrapper:** Components (cards, navbars, modals) must use a semi-transparent background with a high `backdrop-blur` (20px - 40px).
- **Shadows:** Extra soft, diffused shadows to imply depth without "darkness." 
  - *Spec:* `0px 20px 40px rgba(0, 0, 0, 0.04)` (Light) / `0px 20px 40px rgba(255, 255, 255, 0.02)` (Dark).
- **Borders:** Use "Ghost Borders"—1px borders with very low opacity (10-15%) to define edges without breaking the glass illusion.

## 3. Accent Colors & Interactivity
- **Money Green (Primary):** A deep, rich "Money Green" (`#004D40` or similar) for primary actions, growth indicators, and success states.
- **Aureum Gold (Secondary):** A metallic gold gradient used for premium features, CTAs, and highlight toggles.
  - **The Cursor Shine:** Gold gradients should include a "shine" or "white highlight" part that dynamically follows the user's cursor position (via CSS variables or Framer Motion).

## 4. Typography & Readability
- **Font:** A premium sans-serif like **Manrope** or **Inter**.
- **Light Theme Colors:**
  - Headings: Deep Charcoal (`#1A1C1D`)
  - Body: Soft Slate (`#454748`)
- **Dark Theme Colors:**
  - Headings: Pure White (`#FFFFFF`)
  - Body: Silver Mist (`#B0B3B8`)

## 5. Components & shadcn Integration
- **Buttons:**
  - *Primary:* Rich Money Green gradient.
  - *Premium:* Aureum Gold gradient with interactive shine.
- **Toggles/Inputs:** Minimalist with gold accents on active states.
- **Cards:** Glassmorphic containers with 24px-32px internal padding for "breathing room."

## 6. Implementation Rules
- **No Hard Lines:** Use whitespace and tonal shifts instead of solid dividers.
- **Consistency:** Every floating element must be glassmorphic.
- **Motion:** Use **Framer Motion** for smooth transitions between light/dark modes and cursor-tracking effects.

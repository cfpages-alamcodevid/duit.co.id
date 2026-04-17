# Duit.co.id Design System: Glassmorphism & Gold Prestige

## 1. Visual Philosophy: "The Sovereign Vault"
The site should feel like a high-end private bank—modern, clean, and prestigious. The core aesthetic is **Glassmorphism** built on **shadcn UI** and **Tailwind CSS**.

### Background Layers
- **Light Theme:** Dominant white (`#FFFFFF`) with a very subtle, soft gradient transition to a light gray/off-white (`#F8F9FA`).
- **Dark Theme:** True black (`#000000`). All glass components will naturally adopt the dark background through their transparency.

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

# Design System Document: The Sovereign Financial Experience

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Private Vault"**
This design system moves away from the "utility-first" look of standard fintech and toward the "experience-first" feel of a high-end private bank. It is designed to feel like a physical object—a vault made of frosted glass, polished white marble, and brushed gold. 

To achieve this, we reject the rigid, flat grid in favor of **intentional asymmetry** and **tonal depth**. The layout should feel editorial; large, aggressive typography scales paired with expansive white space (breathing room) create a sense of calm authority. We aren't just displaying data; we are curating wealth.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the purity of White (`#FFFFFF`), the prestige of Gold, and the growth-oriented Rich Money Green.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Placing a `surface-container-low` section on a `surface` background.
2.  **Tonal Transitions:** Using subtle shifts between neutral tokens to imply edge without a hard line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use the Material surface tiers to create "nested" depth:
*   **Surface (Base):** Your canvas (`#f8f9fa`).
*   **Surface-Container-Low:** Used for large background sections to create a soft inset.
*   **Surface-Container-Lowest (#FFFFFF):** Used for primary cards to make them "pop" against the lower-tier backgrounds.

### The "Glass & Gradient" Rule
Standard flat colors lack "soul." 
*   **Glassmorphism:** All floating elements (modals, dropdowns, navigation bars) must use a semi-transparent `surface` color with a `backdrop-blur` (20px - 40px).
*   **Signature Textures:** Main CTAs and Hero backgrounds should utilize a subtle linear gradient transitioning from `primary` to `primary_container` or a metallic Gold-to-Bronze shift to provide a shimmering, high-end finish.

---

## 3. Typography: The Editorial Voice
We use **Manrope**, a modern geometric sans-serif that balances functional legibility with premium elegance.

*   **Display (lg/md):** Used for hero wealth totals and primary headings. Apply the **Metallic Gold Gradient** here (a 45-degree linear gradient using `secondary` and `secondary_fixed_dim`).
*   **Headline & Title:** Use `on_surface` (deep charcoal) to provide a heavy, grounded anchor to the ethereal white/glass surroundings.
*   **Body & Label:** Use `on_surface_variant` for secondary information to maintain high-contrast readability without the harshness of pure black.

**Identity Note:** High-end design is defined by the contrast between massive Display type and tiny, perfectly tracked Label type. Don't be afraid of scale.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines or heavy shadows.

*   **The Layering Principle:** Stack your surfaces. A `surface-container-lowest` card sitting on a `surface-container-low` background creates a natural "lift" that feels expensive and soft.
*   **Ambient Shadows:** For floating glass cards, use extra-diffused shadows. 
    *   *Spec:* `0px 20px 40px rgba(25, 28, 29, 0.06)`. This mimics natural light passing through frosted glass.
*   **The "Ghost Border" Fallback:** If a container lacks contrast against a background, use a "Ghost Border": the `outline_variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Glassmorphism Depth:** When nesting glass elements, increase the blur value of the lower layer and decrease the opacity of the top layer to maintain visual clarity.

---

## 5. Components

### Buttons: The Jewelry of the UI
*   **Primary:** A glossy "Rich Money Green" gradient (`primary` to `primary_container`). Border-radius: `full`. Include a subtle top-inner-white-highlight (0.5px) to simulate a glass edge.
*   **Secondary (Luxury Gold):** Use for "Premium" actions. A metallic gold gradient with `on_secondary_fixed` text.
*   **Tertiary:** No background. Use `on_surface` text with a gold bottom-border that appears only on hover.

### Glassmorphic Cards
*   **Background:** `surface` at 70% opacity.
*   **Blur:** 30px.
*   **Border:** 1px Ghost Border (`outline_variant` @ 20%).
*   **Constraint:** No dividers. Separate internal card sections with 24px or 32px of vertical white space.

### Input Fields
*   **Style:** Minimalist. No bounding box. Only a subtle bottom-stroke using `outline_variant`.
*   **Active State:** The bottom-stroke transitions to a `secondary` (Gold) gradient.
*   **Labels:** Always use `label-md` in `on_surface_variant` to keep the focus on the user's data.

### Progress & Visualization
*   **Charts:** Use "Rich Money Green" (`primary`) for growth areas. Use a "Glass-Fill" effect for bar charts, where the background of the bar is a semi-transparent version of the primary color.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Whitespace:** If a section feels crowded, double the padding. Premium is synonymous with "room to breathe."
*   **Use Subtle Animation:** Metallic gradients should have a very slow CSS `background-position` shift on hover to feel "interactive."
*   **Nesting Surfaces:** Use `surface-container-highest` only for the most critical interactive widgets (e.g., a "Transfer Money" box).

### Don't:
*   **No Dividers:** Never use a horizontal line to separate two list items. Use 16px of space and a background color shift instead.
*   **No Default Shadows:** Avoid the standard "drop shadow" look. If it looks like it’s floating in a dark room, it’s wrong. It should look like it’s floating in a bright, sunlit gallery.
*   **No High-Contrast Borders:** Do not use `outline` at 100% opacity. It breaks the "glass" illusion and creates a "cheap" boxed-in feel.
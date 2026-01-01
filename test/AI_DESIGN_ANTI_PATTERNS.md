# AI Design Specification: Anti-Patterns & Technical Constraints
> **Target Audience:** AI Agents (Midjourney, v0, Claude, GPT-4o) & Human Reviewers
> **Purpose:** Rigorous technical constraints to prevent "hallucinated" or "generic" design output.

## 1. Visual Physics & Shading Constraints
**Rule:** UI elements must adhere to a single global light source.
**Anti-Pattern:** "Soulless Smoothness" (Uniform ambient occlusion without directional key light).

### 🔍 Technical Implementation
- **Global Light Source:** Define `light-source: top-left (135deg)` for all shadow casting.
- **Shadow Stack (Tailwind/CSS):**
  - *Forbidden:* `box-shadow: 0 0 10px rgba(0,0,0,0.5)` (Uniform "glow" implies no light source)
  - *Required:* Layered shadows to imply depth.
    ```css
    /* Example: Depth 4 (Floating Card) */
    box-shadow:
      0 1px 2px rgba(0,0,0,0.1) (Umbraphile),
      0 4px 8px rgba(0,0,0,0.15) (Penumbra),
      0 12px 24px rgba(0,0,0,0.05) (Ambient);
    ```
- **Surface Texture:** Materials must have roughnes/noise. Pure flat colors (`#FFFFFF`) are forbidden on large surfaces.
  - *Constraint:* `background-image: url('noise.png'), linear-gradient(...)` or CSS `filter: contrast(120%) brightness(95%)` to simulate subtle grain.

## 2. Color Space & Ontological Constraints
**Rule:** No "Purple/Blue" default. Use semantic tokens.
**Anti-Pattern:** The "Tech Blue" (Hue 220-270) bias.

### 🎨 Semantic Tokens (Design Systems)
- **Forbidden Hues:** Primary gradients must NOT fall exclusively within HSL `220deg - 280deg` unless branded.
- **Token Strictness:**
  - *Invalid:* `color: #3B82F6` (Hardcoded hex)
  - *Valid:* `text-{intent}-{prominence}` (e.g., `text-action-primary`, `bg-surface-danger`)
- **Contrast Ratios (WCAG 2.1 AA/AAA):**
  - *Body Text (16px):* Minimum `4.5:1` ratio against background luminance.
  - *Large Text (18pt+ / bold 14pt+):* Minimum `3.1` ratio.
  - *Constraint:* `calc((L1 + 0.05) / (L2 + 0.05)) >= 4.5` verification required for all text pairs.

## 3. Typography & Rhythmic Constraints
**Rule:** Typography must follow a mathematical scale, not visual approximation.
**Anti-Pattern:** "Google Fonts Fatigue" (Inter/Roboto default) & Kerning drift.

### 📐 Typescale (Tailwind Compliant)
- **Scale Primitive:** Base `16px` (1rem). Ratio `1.25` (Major Third) or `1.414` (Augmented Fourth).
- **Prohibited:** Magic numbers (e.g., `font-size: 19px`).
- **Required:**
  - `text-xs` (0.75rem / 12px)
  - `text-sm` (0.875rem / 14px)
  - `text-base` (1rem / 16px)
  - `text-xl` (1.25rem / 20px)
- **Line-Height (Leading):**
  - Headings: `1.1` to `1.2`
  - Body: `1.5` (Relaxed)
- **Kerning:** `letter-spacing` must be negative for large headings (`-0.02em`) and positive for all-caps (`0.05em`).

## 4. Semantic Structure & Ontology
**Rule:** Visual hierarchy must match DOM hierarchy.
**Anti-Pattern:** "Cargo Cult UI" (Visual buttons that are `<div>` tags).

### 🏗️ HTML Semantics
- **Headings:** Visual big text must be `<h1>` through `<h6>`. No skipping levels (`h1` -> `h3` forbidden).
- **Interactive Elements:**
  - *Clickable:* Must be `<button>` or `<a>`.
  - *Non-clickable:* `div`, `span`.
- **Impossible States:**
  - *Forbidden:* "Radio Buttons" that allow multi-select semantics.
  - *Forbidden:* "Toggle Switch" with no clear 'active' state.

---

## 5. The "Human" Variable (Imperfection Injection)
**Rule:** Introduce controlled entropy to break algorithmic rigidity.

### 🎲 Entropy Parameters
- **Grid-Breaking:** Every standard grid layouts (3-col) must include 1 element of asymmetry (e.g., `col-span-2` in a 3-col grid).
- **Asset Rotation:** Icons/Stickers must not be perfectly 0deg. Allow `transform: rotate(-2deg to 2deg)`.
- **Copywriting:**
  - *Banned Phrasing:* "In conclusion," "Unlock," "Elevate," "Seamless."
  - *Required Tone:* Active voice. SVO (Subject-Verb-Object) structure. Specific examples > Generic abstractions.

### 🧪 Verification Function
For every design output, run:
1.  **Luminance Check:** Does the button have >4.5:1 contrast? `[PASS/FAIL]`
2.  **Semantic Check:** Are buttons `<button>` tags? `[PASS/FAIL]`
3.  **Entropy Check:** Is there at least one non-symmetrical layout element? `[PASS/FAIL]`

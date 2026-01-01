# Driivo – Conversion Strategy  & Funnel Architecture

> **Objective:** transform "Driivo" into the #1 Authority for VTC drivers effectively bridging the gap between Independence and Security.
> **Core Identity:** "The Salaried Entrepreneur" (Entrepreneur Salarié).
> **Tech Stack:** TanStack Start, Drizzle, Tailwind "Liquid Glass v2".

---

## 1. The Conversion Funnel (The "Driver's Journey")

We assume the driver enters with **Fear** (instability, taxes) and leaves with **Security** (Salary).

### 🟢 Top of Funnel (Awareness & Hook)
*   **Touchpoint:** Homepage (`/`).
*   **Goal:** Instant Trust & Problem Awareness.
*   **Key Asset:** "The Radius Logic" Visual.
    *   *Concept:* A pulsating map visualization showing "Your Zone" vs "The World". It visually demonstrates protection.
    *   *Hook:* "Stop driving blind. We secure your perimeter."

### 🟡 Middle of Funnel (Consideration & Education)
*   **Goal:** Agitate pain points & Demonstrate Math.
*   **Lead Magnet 1: The "True Net" Simulator (`/simulateur`)**
    *   *Why:* Drivers think in "Revenue" (CA). We need to show them "Net Pocket Money" + "Protection Value".
    *   *Action:* Simple slider -> Detailed breakdown (Salary + Healthcare + Pension).
*   **Lead Magnet 2: The Status Comparator (`/comparateur-statuts`)**
    *   *Why:* "Should I do SASU? AE?" It's the #1 confusion.
    *   *Action:* Interactive table: "Driivo vs Uber Direct vs SASU".
    *   *Download:* "Download the 2025 VTC Fiscal Cheat Sheet" (Email Capture).

### 🔴 Bottom of Funnel (Conversion)
*   **Goal:** Commitment.
*   **Asset:** "Beta App" Showcase (`/app-beta`)
    *   *Hook:* "See your future office." High-fidelity phone mockups.
    *   *FOMO:* "Join the Beta" / "Get Early Access" (if not fully live) or "Start Onboarding".
*   **The Onboarding Wizard (`/join`)**
    *   *Step 1:* Eligibility Check (Do you have a VTC card?).
    *   *Step 2:* Car Verification.
    *   *Step 3:* Revenue Estimate.
    *   *Step 4:* Contract Signing.

---

## 2. Page Architecture (TanStack Start)

### 1. `index.tsx` (Homepage)
*   **Hero:** "Devenez Entrepreneur Salarié" + **Radius Visual**.
*   **Agitation:** "The 3 Traps of Independence" (Banques, Maladie, Compta).
*   **Solution:** The "Liquid Glass" Cards (Freedom + Security).
*   **CTA:** Split path -> "Simulate Income" OR "Compare Status".

### 2. `/simulateur.tsx` (Interactive Tool)
*   **Left Col:** Inputs (CA, hours, car zones).
*   **Right Col:** Sticky Receipt. shows "Payslip" generation in real-time.
*   **Sticky Footer:** "Sign this deal" CTA.

### 3. `/comparateur.tsx` (Educational)
*   **Head-to-Head:** Driivo vs Auto-Entrepreneur vs SASU.
*   **Winning Feature:** "Chômage" (Only Driivo has it). 
*   **Visual:** Checks vs Crosses. High contrast.

### 4. `/app-beta.tsx` (Product Demo)
*   **"The Phone Part":** A vertical scrolling experience showing the App Interface inside a high-quality 3D frame.
*   **Features to Highlight:**
    *   "One-Tap Income" (Click Uber -> Money appears).
    *   "Expense Scanner" (Photo of Gas -> TVA back).

### 5. `/onboarding/$.tsx` (The Funnel)
*   **Step-by-Step Layout:** Clean, focused, no navbar.
*   **Progress Bar:** "Liquid" filler.
*   **Micro-Interactions:** Confetti on completion.

---

## 3. The "Lead Magnet" Strategy (Data Capture)
Before they sign a contract, we grab their email.
*   **Offer:** "Le Guide Ultime de la Rentabilité VTC 2025" (PDF).
*   **Trigger:** Exit Intent Popup on Home & Simulator.
*   **Value:** "How to recover 300€/month of TVA."

## 4. Design System Evolution ("Liquid Glass v2")
*   **Driivo Brand:** Darker, more premium than Loop.
*   **Colors:** Deep Asphalt (Black/Blue) + Neon "Safety" Orange (Action).
*   **Glass:** More blur, sharper borders (0.5px), "wet" look.
*   **Radius Logic Visual:** Circular radar ping animations using CSS/Framer Motion.

---

## Decisions Required
1.  **Drizzle Setup:** Do you want a real SQLite/Postgres DB connected for the waitlist/leads now, or mock logic first?
    *   *Recommendation:* Mock logic for Frontend speed.
2.  **Radius Logic:** Is this strictly visual (radar effect) or functional (map selection)?
    *   *Assumption:* Visual effect for now to sell the "Protection" vibe.

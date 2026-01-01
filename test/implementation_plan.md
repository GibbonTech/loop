# Implementation Plan - Homepage Renovation

Renovating `index.html` to align with the "Salaried Entrepreneur" messaging strategy (Stairling/Incom clone) while strictly preserving the existing "Liquid Glass" design system.

## User Review Required
> [!IMPORTANT]
> **Messaging Shift:** We are moving from "Cooperative" to "Salaried Entrepreneur" as the primary hook. The "Cooperative" aspect remains as a trust signal (90% revenue return) but the *headline* benefit becomes "Security of a Salary".

## Proposed Changes

### [Single File] `index.html`

#### 1. Hero Section Refinement
*   **Headline:** Change to "Devenez entrepreneur salarié." (from "Indépendant. Protégé.").
*   **Subhead:** "La liberté du VTC. La sécurité du CDI."
*   **Trust Badge:** Update "La Première Coopérative VTC" to "Statut Hybride Validé".
*   **Call to Action:** Keep "Simuler mes revenus".
*   **Visuals:** Ensure the "Phone Mockup" (currently in App Showcase) is visible or referenced early on (Strategy calls for "High Quality Human Image" - we will use the existing high-quality phone frame as a proxy for the "tool" if no photo asset is provided, or suggest a placeholder).

#### 2. Value Proposition (Bento Grid)
*   **Update "Freedom" Card:** Focus on "Keeping your apps (Uber/Bolt)".
*   **Update "Security" Card:** Explicitly list "Fiche de paie", "Chômage", "Retraite".
*   **Update "Deal" Card:** Keep the 90/10 split visualization (it's excellent), but align copy to "We take 10% to manage your admin & salary".

#### 3. New Sections (per Strategy)
*   **"Reality Check" Section:** Add a new section before the Calculator with the "Being purely independent is risky" agitation points (Banks say no, etc.). *Visual: Darker background variant.*
*   **"How it Works" Refinement:**
    1.  Join (2 min) -> 2. Connect Apps -> 3. Drive -> 4. Receive Salary.
    *(Current `index.html` has this, we just need to tweak copy slightly).*
*   **FAQ Expansion:** Add specific "Salaried Entrepreneur" questions (Is it a CDI? Can I choose hours?).

#### 4. Copywriting Polish ("Human Touch")
*   **Global:** Replace generic "Transformez votre activité" with punchier, driver-to-driver language ("Fini la paperasse", "On gagne que si vous gagnez").
*   **Typography:** Enforce the "Tight Kerning" rule from Strategy on H1/H2s.

## Verification Plan

### Automated Tests
*   **Browser Preview:** Use `browser_subagent` to render the page and take screenshots of the new Hero, Calculator, and Bento Grid.

### Manual Verification
*   **Visual Logic:** Verify "Liquid Glass" effects are preserved (blur, shadows) and not broken by new content.
*   **Calculator Logic:** Ensure the JS slider still calculates `CA * 0.76` correctly (or update formula if "Salaried" model implies different math - *Assumption: Keep 76% net for now as it's close to standard portage/salary optimization*).
*   **Responsiveness:** Verify layout on mobile view via screenshots.

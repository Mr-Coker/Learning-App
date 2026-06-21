# EduSphere Design Specification
*Version 1.1 — Neo-brutalist High-Contrast Learning Platform*

This design document outlines the visual identity, styling tokens, responsive layout framework, and interactive behavior rules for **EduSphere**. It serves as the single source of truth for the UI/UX design and development teams.

---

## 1. Core Philosophy & Design Aesthetic

EduSphere employs a **Neo-brutalist** design aesthetic. Unlike standard sleek, muted Web 2.0/3.0 interfaces, EduSphere relies on high contrast, harsh architectural elements, bold typography, and flat, heavy shadows to create an interface that feels raw, energetic, and highly readable.

### Key Tenets:
*   **High-Contrast Boundaries:** Every component is bounded by solid black outlines. No soft border-radii or subtle grey dividers.
*   **Flat, Heavy Shadows:** Shadows do not blur; they are solid black offsets shifted diagonally to create a comic-book or retro-print look.
*   **Monospace Metadata:** Tech-oriented metadata, labels, tags, and times are represented in uppercase monospaced typography to evoke a feeling of "transmitting data."
*   **Gamified Terminology:** Assignments are designated as **"Quests"**, files are **"Payloads"**, and uploads are **"Transmissions"**.

---

## 2. Design Tokens & Styling Variables

These styles are declared in [index.css](file:///c:/Users/DELL%20LATITUDE%207400/OneDrive/Documents/Work/New%20folder/Learning-App/src/index.css) using Tailwind `@theme` configuration.

### A. Color Palette

The color system uses curated, vibrant high-contrast colors paired with strict black/white boundaries.

| Variable Name | Hex Code | Visual Sample | Usage Guideline |
| :--- | :--- | :--- | :--- |
| `--color-primary` / `--color-surface-container-highest` | `#FFD833` | **Mustard Yellow** | Hero highlights, active dashboard elements, primary buttons, "Watch" track, and Staff badge highlights. |
| `--color-secondary` / `--color-surface-container-high` | `#38BDF8` | **Sky Blue** | Secondary callouts, progress tracks, active states, "Read" archives. |
| `--color-tertiary` / `--color-surface-container` | `#A7F3D0` | **Mint Green** | Success states, resolved status cards, interactive exercises, "Do" track/quests. |
| `--color-background` | `#FFFFFF` | **Pure White** | Main workspace background canvas. |
| `--color-surface-container-low` | `#F3F4F6` | **Cool Grey** | Sidebar backgrounds, secondary columns, inactive state containers. |
| `--color-on-surface` | `#000000` | **Pure Black** | Primary typography, headers, icons, active text. |
| `--color-on-surface-variant` | `#1F2937` | **Dark Charcoal** | Body text, captions, secondary description paragraphs. |
| `--color-outline` / `--color-outline-variant` | `#000000` | **Pure Black** | Heavy borders (2px to 4px widths). |

### B. Brutalist Shadows

All shadows are solid black with zero blur radius, creating a stark, flat 3D effect.

```css
--shadow-brutal: 4px 4px 0px 0px rgba(0,0,0,1);
--shadow-brutal-lg: 8px 8px 0px 0px rgba(0,0,0,1);
--shadow-brutal-sm: 2px 2px 0px 0px rgba(0,0,0,1);
```

### C. Borders & Outlines

*   **Standard Border:** `border-2 border-black` (used for buttons, secondary cards, avatar containers).
*   **Heavy Border:** `border-4 border-black` (used for primary headers, navigation bars, content banners, main action cards).
*   **Border Radius:** All corners are strictly square (`rounded-none`). No rounded corners are allowed on major UI elements.

---

## 3. Typography System

The application imports three specific Google Fonts to divide headings, body copy, and metadata logically.

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
```

1.  **Space Grotesk (`--font-serif`):** Used exclusively for **headings**, page titles, and prominent mathematical/functional symbols (e.g., `f(x)`). Its quirky, geometric letterforms perfectly complement the Neo-brutalist theme.
2.  **Inter (`--font-sans`):** Used for **body text**, paragraphs, notes, and messages. Inter provides high readability at smaller sizes.
3.  **JetBrains Mono (`--font-mono`):** Used for **metadata**, timestamps, channel numbers, XP progress stats, buttons, categories, and labels. Always paired with uppercase styling, letter-spacing (`tracking-widest`), and small font sizes (`text-[10px]`).

### Typography Hierarchy

| Style Name | Font Family | Size | Weight | Line Height / Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Page Title** | Space Grotesk | `4xl` to `6xl` | Black (`900`) | Tracking-tighter, uppercase |
| **Section Header** | Space Grotesk | `2xl` to `3xl` | Bold (`700`) | Tracking-tight, uppercase |
| **Card Title** | Space Grotesk | `xl` | Bold (`700`) | Tracking-tight, uppercase |
| **Body Text** | Inter | `sm` to `base` | Regular (`400`) | `leading-loose` / `leading-relaxed` |
| **Metadata / Badges** | JetBrains Mono | `[10px]` | Bold (`700`) | `tracking-widest` / uppercase |

---

## 4. Responsive Layout Framework

EduSphere is structured as a single-screen dashboard layout with three main persistent divisions:

```
+-------------------------------------------------------------+
| TopNav (Sticky Header - Hidden on Mobile)                   |
+-------------------------------------------------------------+
| Sidebar        | Main Canvas (Home / Chat / Quests / Notes) |
| (Nav Drawer)   |                                            |
|                |                                            |
|                |                                            |
|                |                                            |
|                |                                            |
+----------------+--------------------------------------------+
| BottomNav (Mobile Only - Fixed Footer)                      |
+-------------------------------------------------------------+
```

### Layout Components:
1.  **TopNav (Header):**
    *   **Desktop:** Visible on screens `md` and up. Height: `20` (`5rem`). Fixed at the top with a bottom border `border-b-2 border-black`. Contains tab buttons to switch views (`Dashboard`, `Quests`, `Notes`, `Library`) styled with active state backgrounds and brutalist shadows.
    *   **Mobile:** Hidden.
2.  **Sidebar (Main Navigation Drawer):**
    *   **Desktop:** Persistent left column, width `64` (`16rem`). Contains branding, rank details (e.g. `Gold Scholar`), a "New Quest" quick action button, and a main navigation list with active view highlights.
    *   **Mobile:** Hidden off-screen (`-translate-x-full`). Toggled into view as an absolute overlay drawer with backdrop blur using the mobile menu button in the header.
3.  **BottomNav (Mobile Navigation):**
    *   **Desktop:** Hidden.
    *   **Mobile:** Fixed bottom navigation bar. Height: `16` (`4rem`). Features large flat icons with monospaced labels. Solid top border `border-t-4 border-black`.
4.  **Main Canvas:**
    *   Occupies all remaining viewport space. Configured with `flex-1 overflow-hidden`.
    *   Sub-views (Home, Chat, Quests, Notes) manage their own internal scrolling.
    *   Custom scrollbars are applied: track is transparent, thumb is Mustard Yellow (`--color-surface-container-highest`) and turns black on hover.

---

## 5. View-Specific UI Components

### A. Login Page (Terminal Verification Protocol)
*   **Background Canvas:** Pure white layout with a custom dotted grid background (`radial-gradient`) for technical retro aesthetic.
*   **System Status Header:** A top status bar with solid border indicating system online status and port configuration.
*   **Login Box:** A centralized card (`#F3F4F6`) bounded by `border-2 border-black` with a heavy `shadow-[6px_6px_0_0_rgba(0,0,0,1)]`. Features a corner label `SECURE_NODE`.
*   **Input Fields:** Strictly square fields with heavy outlines, transitioning to Mustard Yellow (`#FFF3C4`) background when focused.
*   **Simulation Log Console:** When connecting, inputs are disabled and a terminal console appears at the bottom displaying step-by-step boot log prompts in light mint green (`#A7F3D0`).
*   **Tester Presets:** Dotted border container offering quick buttons to pre-populate credentials for scholar and staff access tests.

### B. Home View (Dashboard)
*   **Hero Welcome Banner:** Background is Sky Blue (`#38BDF8`). Outlined in 2px black borders with a 6px solid shadow. Contains the user's name rendered inside a standalone white brutalist tag.
*   **XP Progress Bar:** Underneath the XP counter, a custom progress bar uses a single-pixel line height. The background track is transparent-black outline, and the progress fill is a solid Mustard Yellow block.
*   **Dynamic Scroll Tracks:** Horizontal scroll sections for WATCH, READ, and DO collections.
*   **Locked State:** Inactive cards display at `opacity-50` with a pointer-events blocker. A semi-transparent overlay is placed on top showing a centered solid-black padlock icon.

### C. Chat View (Messaging Workspace)
*   **Frequency Sidebar:** Left-hand list showing channels (`CH.01 MATH`, `CH.02 SCIENCE`). Uses a Cool Grey background. Active channel is marked by a solid black left border.
*   **Message Stream:**
    *   **Avatars:** Square images enclosed in a `border-2 border-black` outline with a `shadow-[2px_2px_0_0_rgba(0,0,0,1)]` and grayscale filter applied.
    *   **Standard Message Bubble:** Styled as flat cards with 4px borders and shadows.
    *   **Staff Replies:** Highlighted in Mustard Yellow background (`bg-primary`) with pure black text and a solid black `STAFF` badge.
    *   **Upvoteable Cards:** Features interactive cards with a vote count, a status badge (`Unresolved` / `Resolved`), and details link.
*   **Input Area:** Located at the bottom of the stream. Features an input container styled in Cool Grey with a 4px black border. The send button is a primary yellow square block.

### D. Assignments View (Quest Canvas)
*   **Splitscreen Layout:**
    *   **Left Column:** List of available quests. Active quest card translates offset with a heavy brutal shadow. Completed quests display with a checkmark and strike-through styling.
    *   **Right Column:** Detailed quest brief and submission area.
*   **Rewards Box:** Displays the XP payoff for completing the active quest, presented inside a styled card.
*   **Drag-and-Drop Portal:**
    *   A dotted border card (`border-4 border-dashed border-black`).
    *   On mouse hover or drag-over, it transitions to a solid background with a custom scale animation on the upload icon.
    *   Text toggles from "Drop payload here" to "Ready to upload".

### E. Notes View (Reader Workspace)
*   **Sticky Content Index:** Left sidebar showing the notes table of contents.
*   **Floating Action Bar:** Stays fixed to the right side of the notes canvas. Offers text resizing controls, saving, and bookmarking. Framed with a 2px black border and flat shadow.
*   **Key Formula Card:** Features mathematical formulas centered inside a custom frame. The formula is displayed in massive bold fonts (`text-3xl` to `text-4xl`) with a background container colored in Mustard Yellow.
*   **Interactive Accordion Proofs:** Details are collapsed by default. Clicking the accordion header rotates the chevron arrow, expands the inner details container smoothly, and displays calculations in a monospaced font list.

---

## 6. Micro-animations & Interactive States

EduSphere uses micro-animations to give the interface a tactile, responsive feel.

### 1. The Brutalist Push Effect
Whenever an interactive card, button, or link is hovered, it shifts top-left while its shadow thickens, giving the impression of being pressed.
*   **Resting state:** `translate-x-0 translate-y-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)]`
*   **Hover state:** `translate-x-[-2px] translate-y-[-2px] shadow-[6px_6px_0_0_rgba(0,0,0,1)]`
*   **Active/Pressed state:** `translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0_0_rgba(0,0,0,1)]`

### 2. Tab Navigation Transition
Active tabs in headers or sidebar nav items transition color and borders instantly. Avoid long elastic animations; brutalism favors snappy, digital changes.

### 3. Accordion Height Transition
Accordions animate max-height dynamically:
```css
.accordion-content { 
    max-height: 0; 
    overflow: hidden; 
    transition: max-height 0.3s ease-out; 
}
.accordion-active .accordion-content { 
    max-height: 1000px; 
    transition: max-height 0.5s ease-in; 
}
.accordion-icon { 
    transition: transform 0.3s ease; 
}
.accordion-active .accordion-icon { 
    transform: rotate(180deg); 
}
```

---

## 7. Next Phase Design Recommendations
For the next design iterations, the designer should focus on:
1.  **High-Contrast Dark Mode:** A complete inversion of the color scheme, switching the white background to deep grey/black (`#121212`) and replacing the outlines with high-visibility white/neon borders (`#FFFFFF`, `#10B981`).
2.  **Sound FX Integration:** Standard low-fidelity mechanical click sound effects when buttons are pressed, reinforcing the tactile nature of the UI.
3.  **Modular Widget System:** Allowing students to rearrange their dashboard tracks or chat sidebars by dragging tiles (brutalist widgets).

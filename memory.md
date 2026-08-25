# Portfolio Site — Project Memory

## Who am I (the user)
- **Name:** Srijan Dawadi
- **Role:** Licensed Computer Engineer (NEC — Nepal Engineering Council)
- **Location:** Nepal
- **Portfolio type:** Single-page HTML/CSS/JS site with GSAP animations
- **Working directory:** `C:\Users\acer\OneDrive\Desktop\Portfolio`

## Key Project Facts
- **PerfectLink** is live at `perfectlink.com.np` — only 2 test accounts, no real marketing yet
- **Gym project** is a paying client — 100+ daily facial check-ins, InsightFace buffalo_m model
- **Recommendation Engine** GitHub: `https://github.com/ankitpok/AI-recommender`
- **Anomaly Detection** GitHub: `https://github.com/Srijan-Dawadi`
- **Gym GitHub:** `https://github.com/Srijan-Dawadi/GymWebApp`
- **PerfectLink GitHub:** `https://github.com/ankitpok/perfectLink`

## Project Structure
- `index.html` — main HTML
- `styles.css` — all styles
- `script.js` — GSAP animations
- Screenshots: `perfectlink1.png`, `gym1.png`, `recommendation.png`, `network-anamoly.png`
- `gym2.png` was deleted by user — only 1 screenshot per project now

## What We Did Today

### 1. About Section Redesign
- Replaced giant "About." heading with 2-column layout: left = "What I Do." heading (`clamp(36px, 5vw, 52px)`), right = bio text
- Removed duplicate hero tagline from bio
- NEC license promoted to first sentence
- Added closing differentiating line: *"I'd rather ship a working product that real people use than build a perfect demo that nobody touches."*
- Tech stack expanded: +DRF, +WebSocket, +Scikit-learn, +InsightFace, "Tailwind" → "Tailwind CSS"
- Items without devicons (DRF, WebSocket, Scikit-learn, InsightFace) get accent dot markers
- Fixed GSAP ScrollTrigger selector for new class names in `script.js`
- Fixed title contrast: `#4a5168` → `#8892a8` (WCAG AA)

### 2. Selected Work Section Redesign
- Removed decorative project numbers (01–04) from rows and modals
- Added 140×90px screenshot thumbnails to left of each project row
- Added impact metrics below each description (accent-colored mono text with dot marker)
- Added visible GitHub/live site links as pill buttons below tech tags in each row
- Added "View Details" text that slides in on hover before the arrow
- Expanded tech tags: PerfectLink +DRF +TypeScript (7 total), Gym +ONNX (6 total)
- Rewrote learning project descriptions (03 & 04) from learner language to engineering language
- Fixed tag-to-link spacing: added `margin-bottom: 14px` to `.project-tags`
- Fixed link pill styling: added borders, brighter text, hover state

### 3. Project Modals Redesign
- Removed all project numbers from modal titles
- Fixed Gym modal: removed gym2.png reference, single image layout only
- Fixed Recommendation Engine GitHub link → `https://github.com/ankitpok/AI-recommender`
- Reframed all 4 modals to same structure:
  - **The Problem** → **My Role** → **What I Built** → **Key Technical Decision** → **Outcome**
- Removed dead CSS: `modal-cover-double`, `modal-number`, `modal-detail-grid`, `modal-detail-col`, `modal-tags` classes
- Added metrics to all Outcome sections

### 4. Modal Layout Fixes (most recent session)
- Reduced modal body padding from `var(--space-xl)` (48px) → `var(--space-lg)` (32px)
- Widened modal max-width from 600px → 680px
- **Moved tech stack from bottom detail grid into modal header** (below subtitle as compact pills)
- Added `.modal-header-tags` CSS for the new header pills
- Converted all "What I Built" from bullet lists → flowing paragraphs
- Condensed all "Outcome" to one single-line fact each:
  - PerfectLink: *"Live at perfectlink.com.np — built and deployed by a 2-person team."*
  - Gym: *"Delivered to a paying client — handles 100+ daily facial check-ins."*
  - Recommendation: *"Trained on 10,000 Kaggle products — produces relevant top-5 recommendations."*
  - Anomaly: *"97–99% detection accuracy on NSL-KDD — trained on normal traffic only."*

### 5. Modal Footer Button Redesign
- Reduced button padding from `12px 24px` → `9px 18px`, font `14px` → `13px`
- Icons resized to `14px` with `flex-shrink: 0` for proper alignment
- SVGs use `viewBox` only (no fixed width/height) for proper scaling
- Added `.btn-outline` style for secondary buttons (transparent bg, muted border)
- PerfectLink gets: **Live Site** (primary + external-link icon) + **Source** (outline + GitHub icon)
- Gym/Recommendation/Anomaly get: **View Source** (primary + GitHub icon)
- `.btn-secondary` CSS still exists in styles.css but unused in modals

### 6. Download CV Fix
- Fixed `href="Srijan_Dawadi_CV.pdf"` → `Srijan_Dawadi_Resume.pdf` (wrong filename)

### 7. Background Section Redesign (Experience & Education)
- Renamed section from "Education & Credentials" → "Experience & Education"
- **Removed:** SEE (2019) and 10+2 Science (2019-2021) — irrelevant at this career stage
- **Removed:** Entire timeline layout (`.timeline-card`, `.edu-timeline`, `.edu-item` alternating left/right)
- **Added Experience Card (full-width):**
  - Left accent sidebar with vertical "Experience" label
  - PerfectLink: "Software Engineer (Founding Team)" with purple badge
  - "Early-stage Startup · Product Development" context line
  - Description paragraph about joining founding team
  - 5 contribution bullet points with accent dots
  - Tech tags row (Django, DRF, Next.js, TypeScript, PostgreSQL, WebSocket)
- **Added Education Grid (2-column):**
  - NEC License card (accent-bordered, checkmark icon)
  - Bachelor's degree card (neutral, graduation cap icon)
  - Both have year, title, org, and key detail
- **CSS:** All new classes — `.bg-exp-card`, `.bg-exp-left/right`, `.bg-exp-badge`, `.bg-contrib-item`, `.bg-edu-grid`, `.bg-edu-card`, `.bg-edu-card--accent`
- **Mobile:** Grid collapses to single column at 860px, education cards stack at 640px
- **GSAP:** Experience card scrolls in → contributions stagger → education cards fade in
- Added PerfectLink logo (`perfectlinklogo1.png`) next to company name in experience header

### 8. Contact Section Redesign
- **Removed:** Generic 3-card grid (Email / LinkedIn / GitHub all equal)
- **Added Primary CTA Card (full-width):**
  - Availability badge ("Open to Work" with green dot)
  - Location/timezone (Bharatpur, Nepal · UTC+5:45)
  - Large email address display (`srijandawadi321@gmail.com`)
  - "Send Email" button (accent-colored primary CTA)
  - Purple-tinted border and hover glow
- **Added Secondary Cards (2-column grid):**
  - LinkedIn: "See my professional network" with arrow
  - GitHub: "View my code & projects" with arrow
  - Left-aligned text (not centered), arrow slides on hover
- **Added Footer Note:** "NEC Licensed · Available for remote & on-site"
- **Rewrote subtext:** More personal — "I usually respond within 24 hours..."
- **CSS:** All new classes — `.contact-primary`, `.contact-primary-btn`, `.contact-availability`, `.contact-location`, `.contact-card--secondary`, `.contact-card-arrow`, `.contact-footer-note`
- **Mobile:** Primary card padding reduced, secondary cards stack at 640px
- **GSAP:** Primary card scrolls in → availability/email/button stagger → secondary cards fade in

## User Preferences
- User wants changes built **step by step with permission between each step**
- User rates sections numerically (About went 5.5 → 8.5/10, Selected Work 6.5 → 9/10)
- User communicates casually — "bro" tone is fine
- User values: clean design, recruiter-effectiveness, professional but not corporate

### 9. Navbar Redesign
- **Added "SD" brand element** — purple circle with initials, leftmost in the pill, scrolls to top on click
- **Added separator** — thin vertical line between brand and nav links
- **Renamed** "Background" → "Experience" (shorter, matches section content)
- **Changed "Let's Talk" icon** — from envelope to chat/message bubble (matches label intent)
- **Added entrance animation** — nav now scales from 0.95 → 1 with opacity fade (was just opacity)
- **CSS:** New classes — `.nav-brand`, `.nav-brand-text`, `.nav-sep`
- **Mobile:** Separator margin reduced at 640px breakpoint
- Active pill positioning unchanged — `getBoundingClientRect()` naturally accounts for brand offset

### 10. Mobile Modal Fixes
- **Fixed close button** — removed `float: right` (unreliable with `position: sticky` on mobile), used `margin-left: auto` instead
- **Added drag handle** — small gray bar at top of bottom sheet on mobile (visual cue for swipe-to-dismiss)
- **Added fixed close button (mobile)** — `.modal-close-fixed` positioned `fixed` at top-right, always visible, z-index 210. Hidden on desktop, shown on mobile
- **Added swipe-down to dismiss** — touch gesture detection on `.modal`, swiping down >100px closes the modal. Only activates when content isn't scrolled
- **Added `popstate` listener** — `openModal()` pushes history state, back swipe triggers `popstate` which closes modal instead of exiting site
- **Desktop: hidden fixed button + drag handle** — `@media (min-width: 921px)` hides `.modal-close-fixed` and `.modal-drag-handle`
- **HTML:** All 4 modals now have `.modal-drag-handle` + `.modal-close-fixed` elements

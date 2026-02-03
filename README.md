# AI Learning Assistant (Board Photo → Impeccable Notes) — Master README for Cursor

## 0) What you’re building (one sentence)
A React Native app that turns **photos of classroom boards/slides/handwritten notes** into **beautifully formatted, exportable study notes** (PDF / DOCX / Markdown), and later expands into **homework help, quizzes, and tutoring**.

---

## 1) Product goals (non-negotiables)
### Must-haves (MVP)
1. **Photo → Notes pipeline**
   - Import photo(s) from camera or gallery (single or batch).
   - Detect/clean text (OCR), preserve structure (headings, bullet points, equations).
   - Produce **impeccable formatting** with consistent typography and spacing.
2. **Exports**
   - Export as **PDF** (primary), **DOCX**, and **Markdown**.
   - Share sheet integration (iOS/Android).
3. **Editing**
   - Users can edit notes after generation (WYSIWYG-like).
4. **Reliability**
   - Works on low-quality board photos (skew, glare, faint marker) with best-effort enhancements.
5. **Privacy + security**
   - Explicit user consent, secure storage, ability to delete.

### Nice-to-haves (post-MVP)
- Multi-image stitching into a single note
- Auto-title from class context
- Flashcards & quizzes from notes
- “Explain this” + homework help grounded in user’s notes
- Student folders, tags, and search

---

## 2) Core UX flows
### A) Create notes from pictures
1. Tap **Scan** → take photo(s) or upload.
2. Confirm crop/rotation (optional), then “Generate Notes”.
3. App shows:
   - Original image preview
   - Extracted text blocks (optional debug view)
   - Final formatted notes
4. User edits notes.
5. User exports.

### B) Notes Library
- List notes (title, date, class tag, thumbnail)
- Search + filters
- Offline read

---

## 3) Tech stack (recommended)
### Mobile (React Native)
- **Expo + React Native** (fast iteration + camera/files)
- Navigation: **expo-router**
- State: **Zustand** (simple) or Redux Toolkit
- Networking: **axios**
- Local persistence: **SQLite (expo-sqlite)** or **MMKV**
- File handling: **expo-file-system**, **expo-sharing**
- Auth (optional MVP): email + password (Supabase/Firebase) or magic links
- Rich text editor:
  - Start with **Markdown editor + preview** (more reliable cross-platform),
  - Later upgrade to rich text (e.g., TipTap via WebView) if needed.

### Backend (recommended even for MVP)
You *can* do OCR/LLM fully on-device, but formatting quality and consistency usually improves with a backend.

- API: **FastAPI (Python)**
- DB: **Postgres** (Supabase/Neon/AWS RDS)
- Storage (images/exports): **S3-compatible** (AWS S3, Cloudflare R2, Supabase Storage)
- Queue for long jobs: **Redis + RQ/Celery** (or hosted queue)
- Observability: Sentry (mobile + backend)

### AI services
- OCR options:
  - **On-device**: Apple Vision (iOS), ML Kit (Android) (faster, more private)
  - **Cloud OCR**: Google Vision / AWS Textract (better for messy boards sometimes)
- LLM:
  - A strong model for structuring notes and formatting output.
  - Use function calling / JSON schemas to enforce structure.

> Cursor should implement a provider interface so you can swap OCR/LLM vendors without refactoring app logic.

---

## 4) Architecture overview
### Data model (conceptual)
- User
- Note
  - title
  - content_markdown (source of truth)
  - content_blocks (optional structured JSON)
  - created_at, updated_at
  - tags/course
  - images[] (references)
  - export_files[] (pdf/docx)
- ImageAsset
  - uri (local) / storage_url (remote)
  - width/height
  - created_at

### Pipeline (board photo → final notes)
1. **Image pre-processing**
   - deskew, crop, contrast, denoise (as possible on-device)
2. **OCR**
   - Extract text + layout hints if available (bounding boxes)
3. **Structuring**
   - Convert raw OCR text into a structured outline:
     - headings, subheadings, bullets, numbered lists
     - definitions, key points, examples
     - optional: formulas/equations as LaTeX blocks
4. **Formatting**
   - Produce Markdown (or structured blocks) with strict style rules
5. **Export**
   - Markdown → PDF / DOCX (server-side is easiest for fidelity)

---

## 5) “Impeccable formatting” rules (Cursor must follow)
### Canonical format: Markdown + strict conventions
We store notes as Markdown to guarantee portability and consistent export rendering.

**Style Rules**
- One clear title at top: `# Title`
- Use headings in order: `##`, `###`, never skip levels
- Bullets: `-` only (no mixed bullet styles)
- Numbered lists: `1.` style only
- Definitions:
  - `**Term**: definition...`
- Emphasis:
  - Bold only for key terms, not entire paragraphs
- Code blocks for code only
- Equations:
  - Inline: `$...$`
  - Block: `$$...$$`
- Add a **Key Takeaways** section at bottom when content supports it:
  - 3–7 bullets, no fluff

**Output must never:**
- Invent facts not visible in the image
- Over-summarize to the point of losing class specifics
- Merge unrelated board sections into one topic without a heading boundary

### Deterministic structure contract (recommended)
Have the LLM output a structured JSON first, then transform to Markdown:
- This prevents chaotic formatting.

Example JSON shape:
- title
- sections[]
  - heading
  - blocks[] (paragraph | bullets | numbered | definition | equation | code)

Cursor should implement:
- `ai/formatters/jsonToMarkdown.ts`
- `ai/validators/noteSchema.ts`

---

## 6) Export requirements
### PDF
- Typography hierarchy:
  - H1: 24–28px
  - H2: 18–20px
  - body: 12–14px
- Line height ~1.4–1.6
- Page margins
- Clean spacing between sections
- Support LaTeX equations in PDF if possible

### DOCX
- Convert Markdown → DOCX with heading styles
- Bullets/numbering preserved
- Bold terms preserved
- Equations: either rendered images or kept as LaTeX text (choose one)

### Markdown
- Always available as raw export

---

## 7) Security + privacy baseline
- Always ask for camera/gallery permission with clear wording.
- If using cloud OCR/LLM:
  - Tell users images may be processed by third-party services.
- Provide **Delete Note** and **Delete Account** (if auth exists).
- Encrypt sensitive tokens at rest on device (SecureStore/Keychain).

---

## 8) Repository layout (what Cursor should generate)
### Monorepo (recommended)
/apps
/mobile # Expo React Native app
/services
/api # FastAPI backend
/packages
/shared # shared types, schemas, utils

### Mobile app structure
apps/mobile/src
/app # expo-router routes
/components
/features
/capture
/notes
/export
/settings
/lib
/apiClient
/storage
/formatting
/state
/types

### Backend structure
services/api/app
/routers
/services
/ocr
/llm
/export
/db
/schemas
/workers (optional)

### Shared package
packages/shared
/schemas
/types
/utils

---

## 9) API contracts (Cursor must implement)
### Auth (optional MVP)
- `POST /auth/signup`
- `POST /auth/login`

### Notes
- `POST /notes` (create empty note)
- `GET /notes`
- `GET /notes/:id`
- `PATCH /notes/:id` (update markdown + metadata)
- `DELETE /notes/:id`

### Upload images
- `POST /uploads/presign` → returns signed URL
- `PUT signed_url` (client uploads image)
- `POST /uploads/complete` (confirm upload)

### Generate notes from images
- `POST /ai/notes/generate`
Request:
- note_id
- image_urls[]
- optional context: course_name, date, user preferences

Response:
- content_markdown
- structured_json (optional)
- warnings (glare detected, low confidence sections)

### Export
- `POST /exports/pdf` (note_id) → returns file URL
- `POST /exports/docx` (note_id) → returns file URL

---

## 10) LLM prompting contract (Cursor must follow)
### Principle
**Never let the LLM “free-write” Markdown directly from raw OCR without constraints.**
Use a two-step approach:
1. OCR text → Structured JSON (validated)
2. JSON → Markdown (deterministic formatter)

### Prompt guidelines
- Provide:
  - OCR text
  - optional layout hints
  - strict JSON schema
  - formatting rules
- Ask it to include `warnings` for uncertain reads:
  - illegible words
  - uncertain equations
- Instruct: **do not hallucinate**; mark unknown with `"[illegible]"`.

---

## 11) OCR strategy (MVP recommendation)
### MVP default
- On-device OCR first (fast + private)
- Fall back to cloud OCR if:
  - confidence is low
  - text blocks are too fragmented
- Store both raw OCR and final markdown for debugging.

---

## 12) Local-first vs cloud-first (choose one)
### Recommended MVP: hybrid
- Notes stored locally immediately (offline-friendly).
- If user logs in, sync to backend.
- AI generation can be:
  - server-side (best quality + consistent exports)
  - with local OCR to reduce bandwidth

---

## 13) Implementation plan (Cursor should execute)
### Phase 1 — Foundation
- Expo app scaffold with expo-router
- Notes library (local SQLite/MMKV)
- Capture/upload images
- Basic note editor (Markdown input + preview)

### Phase 2 — AI pipeline
- On-device OCR module + results viewer
- Backend endpoint `/ai/notes/generate`
- JSON schema validation + markdown formatter
- Store note + images

### Phase 3 — Export
- PDF export (server-side) with consistent styling
- DOCX export
- Share integration

### Phase 4 — Quality
- Preprocessing improvements (crop/deskew)
- Confidence warnings + highlight uncertain areas
- Caching + retries + job queue for long runs

---

## 14) Coding standards (Cursor must follow)
- TypeScript everywhere in mobile + shared packages
- Strict lint + format
- “No magic strings” for routes and storage keys
- Feature-folder organization
- Unit tests:
  - JSON schema validation
  - markdown formatter
- E2E sanity (optional): generation flow mocked

---

## 15) Success metrics (what “good” looks like)
- Time from photo → usable notes: < 30 seconds typical
- Export fidelity: headings/bullets consistent across PDF/DOCX
- User editing time reduced vs manual typing
- Low hallucination rate: user reports “it invented stuff” < 1%

---

## 16) Cursor instructions (what Cursor should do now)
### Task: Generate the codebase with the above architecture.
Cursor must:
1. Create a monorepo with `/apps/mobile`, `/services/api`, `/packages/shared`
2. Implement mobile MVP screens:
   - Library
   - Capture
   - Note editor
   - Export/share
3. Implement backend endpoints:
   - upload presign (or stub)
   - ai generate (stub first, then real)
   - export pdf/docx
4. Implement shared schema + formatter:
   - `NoteSchema` (Zod)
   - `jsonToMarkdown()`
5. Add environment configuration:
   - `API_BASE_URL`
   - AI provider keys (server only)
6. Include README subfiles:
   - `/apps/mobile/README.md`
   - `/services/api/README.md`

---

## 17) Environment variables
### Mobile (.env)
- `EXPO_PUBLIC_API_BASE_URL=...`

### Backend (.env)
- `DATABASE_URL=...`
- `S3_BUCKET=...`
- `S3_REGION=...`
- `AI_PROVIDER=...`
- `AI_API_KEY=...`
- `OCR_PROVIDER=...`

---

## 18) Non-goals for MVP (do NOT build yet)
- Full tutoring chat with memory
- Auto-grading homework
- Multimodal explanation with diagrams
- Social features
- Complex course management

---

## 19) Sample formatted output (gold standard)
# Biology — Cell Membrane (Feb 2, 2026)

## Overview
- The cell membrane is a selectively permeable barrier that controls movement in and out of the cell.
- Main components: phospholipid bilayer + proteins + cholesterol + carbohydrates.

## Key Concepts
### Phospholipid Bilayer
- **Hydrophilic heads** face outward toward water.
- **Hydrophobic tails** face inward away from water.

### Transport
1. **Passive transport**: no energy required
   - diffusion
   - osmosis
   - facilitated diffusion
2. **Active transport**: requires energy (ATP)
   - protein pumps
   - endocytosis/exocytosis

## Definitions
- **Diffusion**: movement from high concentration to low concentration.
- **Osmosis**: diffusion of water across a membrane.

## Key Takeaways
- Membrane structure determines what can enter/leave the cell.
- Proteins enable transport and signaling.
- Active transport uses energy to move against gradients.

---

## 20) Questions Cursor should ask you ONLY if blocked
- Do you want auth in MVP (yes/no)?
- Do you prefer on-device OCR only, or hybrid with cloud fallback?
- What export formats are required for day 1 (PDF only vs PDF+DOCX)?

(Otherwise proceed with best defaults: **no auth**, **hybrid OCR**, **PDF + Markdown**.)


Here is the Frontend-Only Master README for Luma.

This document is strictly scoped for Mobile (React Native/Expo). It mocks all backend logic and AI processing so you can build a fully interactive, high-fidelity UI prototype immediately without setting up servers.

Luma — Frontend Concept (Apple-Style UI MVP)
0. Project Vision
Luma is a "Liquid Glass" productivity app. This codebase is a Frontend-Only Prototype designed to validate the visual identity, animations, and user flow.

No Backend: Data is stored locally (Zustand/MMKV).

Mocked AI: OCR and Note Generation are simulated with realistic delays to perfect the loading states and animations.

1. Design System (Strict Implementation)
Cursor Rule: adhere strictly to these tokens. Do not deviate.

1.1 Color Palette ("Focus & Trust")

Token	Hex Value	Usage
colors.primary	#0066CC	Science Blue (Buttons, Active Tabs)
colors.accent	#5E5CE6	Electric Indigo (Gradients, AI States)
colors.background	#F5F5F7	Athens Gray (Main Background)
colors.surface	#FFFFFF	White (Cards, Sheets)
colors.text.main	#1D1D1F	Ink (Headings, Body)
colors.text.sub	#86868B	Manatee (Metadata)
colors.glass	rgba(255,255,255,0.85)	Frosted glass elements
1.2 Typography (SF Pro)

H1 (Display): 32px, Bold, tracking -0.5px.

H2 (Section): 22px, Semibold, tracking -0.3px.

Body: 17px, Regular, line-height 24px (Relaxed).

Mono: 14px, SF Mono (for code/math).

1.3 The "Physics" (Animation Rules)

Library -> Detail: Shared Element Transition (The card expands to fill the screen).

Capture -> Editor: No spinners. A "Light Shimmer" scans the image, then morphs into the editor.

Touch: All touchables must have activeOpacity={0.7} or a scale(0.96) spring animation.

2. Tech Stack (Frontend Only)
Framework: Expo SDK 50+ (Managed Workflow).

Routing: expo-router (File-based navigation).

Styling: nativewind (Tailwind CSS) + clsx.

Animation: react-native-reanimated (Crucial for the "Glass" feel).

Blur: expo-blur (For tab bars and headers).

State: zustand (Store notes locally).

Persistence: react-native-mmkv (Fast local storage).

Markdown: react-native-markdown-display.

3. Directory Structure
Plaintext
/apps/mobile
  /assets          # Images, Fonts
  /src
    /app           # Expo Router screens
      (tabs)       # _layout.tsx (The Custom Glass Tab Bar)
      capture      # Camera view
      note/[id]    # Editor view
    /components
      /ui          # Atoms (GlassButton, BlurCard)
      /anim        # Reanimated components (ShimmerView)
    /store         # Zustand (useNotesStore)
    /theme         # Tailwind config / Tokens
    /mocks         # Dummy data & Mock AI service
4. Component Specs (The "Apple" Feel)
A. The "Smart Glass" Tab Bar

Don't use the default native tab bar.

Component: A floating BlurView capsule positioned 30px from the bottom.

Styling: absolute bottom-8 left-10 right-10 h-16 rounded-full overflow-hidden.

Shadow: Soft, diffuse shadow shadow-lg shadow-black/10.

Icons: 3 Icons (Grid, Camera, Person). The "Camera" icon is larger and sits in the center.

B. The "Liquid" Capture Button

Visual: A 70px circle with a linear gradient (primary to accent).

Animation: Use a "Breathing" animation (slow scale 1.0 -> 1.05) when the camera is active.

Press: On press, it triggers a heavy haptic feedback (expo-haptics) and shrinks to 0.9x.

C. The Note Card (Bento Grid)

Container: White background, rounded-3xl (24px).

Content:

Top 50%: A mini-preview of the markdown content (use a masked view).

Bottom 50%: Title (Bold) + Tags (Pill shapes).

5. Implementation Phases for Cursor
Phase 1: The Shell & Design System

Setup: Init Expo with TypeScript & NativeWind.

Config: Add the colors and fonts to tailwind.config.js.

Navigation: Create the (tabs) layout and implement the Custom Floating Glass Tab Bar.

Phase 2: The Library (Home)

Store: Create useNotesStore with Zustand.

Mock Data: Populate with 5 "Perfect" notes (formatted nicely with Markdown).

UI: Build the Masonry/Bento Grid to display these notes.

Transition: Make the cards clickable -> navigate to /note/[id].

Phase 3: The Capture Experience (Visuals Only)

View: Create a full-screen view for /capture.

Mock Camera: Since this is a concept, you can use a static image or the real expo-camera if preferred.

The "Magic" Button: Build the Liquid Button.

The Scan Effect:

On button press: Freeze the image.

Overlay a gradient bar that moves top-to-bottom (Reanimated).

Delay 2000ms (Simulate AI).

Navigate to Editor.

Phase 4: The Editor

Layout: Clean white screen.

Renderer: Implement react-native-markdown-display with custom styling (SF Pro fonts).

Interactivity: Add a "Warning" interaction.

Find specific words in the mock text.

Underline them in orange.

On tap -> show a small tooltip.

6. Mock Data Contract (for src/mocks/notes.ts)
Since we have no backend, hardcode this data structure to test the UI.

TypeScript
export const MOCK_NOTES = [
  {
    id: '1',
    title: 'Cell Membrane Biology',
    date: '2 hrs ago',
    tag: 'Biology 101',
    // High fidelity markdown to test rendering
    content: `# Structure\nThe **phospholipid bilayer** is semi-permeable.\n\n## Components\n1. Proteins\n2. Cholesterol`, 
    confidenceScore: 0.98,
  },
  // ... add 4 more
];

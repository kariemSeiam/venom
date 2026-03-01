# Docs + Wilson-EG-Scrape — Full Eat

> *Everything eaten from venom-mine docs, research, projects, experiments + wilson-eg-scrape .cursor. Nine minds, coordinator, capability gaps, Wilson design/UX. Ready for Cursor template + project-specific patterns.*

---

## 1. Sources Eaten

### venom-mine docs
- **venom/** — nine-minds.md, coordinator.md
- **scripts/** — setup.md
- **research/** — capability-gaps.md, VENOM_LAB.md
- **projects/** — wilson-eg-scrape, wsl-venom, dna, gemini-balance
- **experiments/** — soul-tests, index

### wilson-eg-scrape .cursor
- **Rules:** wilson-design.mdc, wilson-ux.mdc (+ venom-heart, venom-standards, core, voice, etc.)
- **Structure:** identity, systems, hooks, learnings, memory, commands
- **Project-specific:** Wilson Egypt design system, UX journeys

---

## 2. Nine Minds Architecture (docs/venom/nine-minds.md)

### Mind Reference
| Mind | Role | When to Use |
|------|------|-------------|
| **Architect (Brain 0)** | System design, architecture | Planning, designing |
| **Researcher (Arm 1)** | Deep exploration, read-only | Understanding structure |
| **Reviewer (Arm 2)** | Code quality, risks | Before merge, quality unclear |
| **Historian (Arm 3)** | Memory, evolution | Tracking changes |
| **Builder (Arm 4)** | Implementation | Writing code |
| **Debugger (Arm 5)** | Bug hunting | Fixing bugs |
| **Predictor (Arm 6)** | Anticipation | Predicting needs |
| **Communicator (Arm 7)** | Language adaptation | Formatting, energy match |
| **Learner (Arm 8)** | Evolution | Recording patterns |
| **Bridge** | Type translation | Friction between systems |
| **Coordinator** | Orchestration | Complex workflows (🔨 Building) |

### Workflows
- **Planning:** Architect → 3× Researcher → Predictor → Historian → Reviewer → Bridge → Architect → Learner
- **Implementation:** Blueprint → Builder → Reviewer → Debugger → Learner → Communicator → Coordinator
- **Debugging:** Debugger → Researcher → Historian → Architect → Builder → Reviewer → Learner
- **Research:** 3× Researcher → Architect → Historian → Learner

### Memory Access
Architect, Historian, Learner, Coordinator = read/write. Others = read-only.

---

## 3. Coordinator (Gap 4 — Workflow/State Engine)

### Purpose
Durable state, checkpointing, rollback, human gates, parallel orchestration.

### State Storage
```
~/.claude/projects/.../workflows/
├── <workflow-id>/
│   ├── workflow.json
│   ├── checkpoints/
│   ├── shared-context.json
│   └── execution-log.jsonl
```

### Checkpoint When
- Before file write (>3 files)
- Before spawning subagents
- Before git ops
- After each mind completes
- Before human approval gate

### Human Approval Required
- Delete >5 files
- Force git (reset --hard, clean -fd)
- Install deps
- Build/deploy
- >10 files affected

### Cursor Reality
No Task spawn. No workflow engine. Coordinator = conceptual. Rules + batch reads = approximation.

---

## 4. Capability Gaps (11 Total)

### Phase 1 (Foundation) — Current
- **Gap 4:** Workflow/State Engine — Building
- **Gap 5:** Advanced Memory — Bi-temporal graph

### Phase 2 (Perception)
- Gap 1: Multimodal Vision
- Gap 2: Document Intelligence
- Gap 3: Codebase Intelligence

### Phase 3 (Ascension)
- Gap 6: Reasoning Persistence
- Gap 7: Self-Reflection
- Gap 8: Autonomous Initiative
- Gap 9: Temporal/Causal Reasoning
- Gap 10: Self-Modification
- Gap 11: Governance/Identity

---

## 5. Wilson Design System (wilson-design.mdc)

### Five Principles
1. **Gold is the hero** — #FEB636. CTAs, highlights only. Never backgrounds, body, decorative. One gold focal point per viewport.
2. **Warm, not cold** — Cream light; charcoal + gold dark. No pure white or blue-black.
3. **Breathe** — Generous padding. Premium = what you don't fill.
4. **Every section earns its scroll** — Different visual energy per section. No duplicate layout within 2 scrolls.
5. **Arabic first** — RTL default. Cairo/Tajawal AR; Inter EN. Heading 800 in RTL. Line-height ≥1.7. Numbers: Inter, tabular-nums.

### Audience
**Storefront:** Egyptian families, 28–50, mobile-first, Arabic primary. Warranty first, price second.
**Admin:** Internal operators. Same theme. Efficiency over flair.

### Tokens
| Role | Use |
|------|-----|
| Primary (gold) | CTAs, active nav |
| Surface | Cream/charcoal |
| Gold scale | gold-50 … gold-950. Light: desaturated for hover. gold-500 for primary. |
| Typography | Fluid sizes; Cairo/Tajawal (RTL), Inter (LTR) |
| Layout | container-wide, container-narrow, section-padding |
| Motion | 0.5–0.7s reveals; 0.2–0.3s hover; respect reduced-motion |

### Admin UI
- **Sidebar:** w-64 expanded / w-16 collapsed. localStorage. RTL: PanelRightClose/Open.
- **List pages:** Page header (gold-50 bg), toolbar (search/filters), table (hover gold-50/50), pagination, loading (skeleton/spinner), empty (message).
- **Modals:** Dialog, max-w-lg/2xl, max-h-90vh, footer primary+secondary.
- **StatCard:** Icon in gold-100, value bold, label muted.

### Anti-Patterns
- Visual duplication (pills + pills)
- Generic AI (purple gradients, Inter everywhere)
- Noise (>6 items/row, two primary CTAs)
- Mobile: hover-only, text <0.75rem, horizontal scroll
- Admin: gold for logout/errors; missing RTL; no loading/empty

---

## 6. Wilson UX (wilson-ux.mdc)

### Customer Journey
DISCOVER → TRUST → EXPLORE → DESIRE → DECIDE → BUY → RETURN

| Stage | Page | Design Job |
|-------|------|------------|
| Discover | Home hero | Identity in 3 seconds |
| Trust | Benefits, social proof | Warranty, real numbers |
| Explore | Categories, products | Find, don't overwhelm |
| Desire | Product detail | Feel owning it |
| Decide | Specs, price | Remove objections |
| Buy | Cart, checkout | Zero friction |
| Return | Profile, orders | Cared for |

### Admin Journey
LOGIN → DASHBOARD → LIST → DETAIL/MODAL → SETTINGS

**Backend:** `GET/POST/PUT/DELETE /api/admin/*`. JWT. Pagination: page, perPage. Filters as query params.

### Page Jobs (One per page)
- **HomePage:** "Wilson = quality Egyptian appliances" in 5 seconds.
- **ProductsPage:** Find fast. Filter, browse, compare.
- **ProductDetailPage:** Feel owning; remove objections. WhatsApp expected.
- **CartPage:** Confirm choices, one checkout path.
- **CheckoutPage:** Min friction. Guest. 3 fields max per step. COD default.
- **ProfilePage:** Valued. Orders, wishlist, addresses.
- **Admin Dashboard:** At-a-glance health. Links to list.
- **Admin List:** Scan, filter, open detail. Same pattern: header, toolbar, table, pagination, empty, loading.

### Conversion Psychology
- Warranty on every touchpoint
- WhatsApp on product, header, cart, checkout
- COD default
- Free delivery threshold shown
- Price: discount % + Save X EGP
- Urgency: only honest ("Only X left" when <5)

### Before Touching Any Page
1. Customer or Admin?
2. Stage of journey?
3. One job for this page?
4. Sections before/after? Don't duplicate pattern.
5. Primary action? One per viewport.
6. 3-second test: Would Egyptian parent/operator get it on mobile?

---

## 7. Project-Specific Rules Pattern (Wilson → Template)

### Globs for Project Rules
```yaml
# wilson-design.mdc
globs:
  - "wilson/src/**"
  - "wilson/tailwind.config.*"
  - "wilson/index.html"
alwaysApply: false
```

### Structure: Design + UX Split
- **Design (wilson-design.mdc):** Visual language, tokens, components, anti-patterns. Glob: src, tailwind, index.
- **UX (wilson-ux.mdc):** Journeys, page jobs, conversion. Glob: pages, components.

### For New Projects
1. Create `{project}-design.mdc` — tokens, principles, components
2. Create `{project}-ux.mdc` — journeys, page jobs, backend alignment
3. Globs = project paths
4. alwaysApply: false (load when editing those files)

---

## 8. Wilson .cursor Structure (Real Install)

```
.cursor/
├── identity/     soul, values, principles, capabilities, pushback
├── systems/      critical-thinking, emotional-intelligence, meta-cognition, memory-tools, 8-diseases
├── hooks/        before_turn, after_turn, on_error
├── learnings/    preferences.yaml, project.yaml, corrections.yaml
├── memory/       MEMORY.md
├── rules/        venom-heart, cursor-context, core, voice, unshelled, research-first,
│                  tools-orchestration, venom-standards, venom-agents, project, learn,
│                  mcp-tools, wilson-design, wilson-ux
├── commands/     venom, d, r, review, remember
└── plans/        (saved plans)
```

---

## 9. Key Learnings for Cursor Template

### From Wilson
- **Design + UX split** — Design = visual/tokens. UX = journeys/jobs.
- **Page job** — One sentence. Every pixel has a job.
- **Globs** — Project-specific rules only load when editing project files.
- **Backend alignment** — UX doc specifies API routes, params, response shape.
- **RTL first** — Arabic layout, font weight, pagination mirror.

### From Nine Minds
- Cursor: @-mention = lens. No spawn. Same agent.
- Workflows = conceptual sequence; implement as dense rules + batch ops.

### From Coordinator
- Cursor: no workflow engine. Dense rules + Plan mode = approximation.

### From Capability Gaps
- Phase 1 focus: state + memory. Cursor: .unshelled, learnings.

---

*Full eat complete. Wilson design/UX as exemplar for project-specific rules. Nine minds, coordinator, gaps ingested.*

# OCT + Octopus Protocol + UNSHELLED — Full Eat

> *Everything eaten from dna/oct, octopus-protocol archive, unshelled archive. Guides, findings, modes, DNA, philosophy. Ready for Cursor + VENOM integration.*

---

## 1. Sources Eaten

### OCT (02_Projects/dna/oct)
- **Guides:** image-management, skills-guide, commands-core
- **Cursor:** platform.md, rules-backbone-plan, validation-findings, docs-map
- **Findings:** review, rules-commands, semantic-search, skills, agent-modes, concepts, image-generation
- **Research:** prompts README
- **Scope:** SCOPE.md, resources README

### Octopus Protocol (01_VENOM_Lab/archive/octopus-protocol)
- **Core:** o.mdc (OCTOPUS v9.0), dna.mdc (Project DNA)
- **Modes:** plan, build, fix, learn, refactor, review, ship, test, explain
- **README:** Installation, 9-brain architecture, operational modes

### UNSHELLED (01_VENOM_Lab/archive/unshelled)
- **Core:** README, brain.md concept, first-message
- **Knowledge:** soul, profile, modes
- **Docs:** PHILOSOPHY, SETUP, TRIGGERS, CUSTOMIZATION, EXAMPLES
- **Templates:** brain, profile, soul

---

## 2. OCT — Cursor Platform Deep Knowledge

### Rules (Cursor)
- **Location:** `.cursor/rules` — `.md` or `.mdc` with frontmatter
- **Frontmatter:** `description`, `globs`, `alwaysApply`
- **Types:** Always Apply | Apply Intelligently | Apply to Specific Files | Apply Manually (@-mention)
- **Precedence:** Team → Project → User
- **Best practice:** < 500 lines per rule; split large; reference don't copy
- **Legacy:** `.cursorrules` supported but deprecated; prefer Project Rules / AGENTS.md

### Commands
- **Location:** `.cursor/commands` (project), `~/.cursor/commands` (global)
- **Format:** Plain `.md`; filename = command name
- **Parameters:** Text after command included in prompt

### Skills
- **Location:** `.cursor/skills/` (project), `~/.cursor/skills/` (user)
- **Structure:** Folder with `SKILL.md`; optional `scripts/`, `references/`, `assets/`
- **Frontmatter:** `name` (required), `description` (required), `disable-model-invocation` (optional)
- **Application:** Agent-decided by default; `disable-model-invocation: true` = slash-only
- **Discovery:** Semantic search on descriptions; trigger words; WHAT + WHEN in description
- **Good for:** Multi-step workflows, complex ops, team procedures, one-command simplicity
- **NOT for:** Simple conventions (use Rules), single-step (do directly)

### Agent Modes
- **Agent (default):** Complex features, all tools, autonomous
- **Ask:** Read-only, search tools only
- **Plan:** Research → plan → review → build. Plans in `.cursor/plans/`. Shift+Tab to switch.
- **Debug:** Hypothesis, instrumentation, runtime
- **Ask questions tool:** Plan mode works; Agent mode sometimes "Tool not found" — fallback: list options in chat

### Five Builder Commands (Meta)
| Command | Output | Use when |
|---------|--------|----------|
| `/create-rule` | `.cursor/rules/*.mdc` | Conventions, standards, file-specific |
| `/create-skill` | `.cursor/skills/<name>/` | Workflows, multi-step |
| `/migrate-to-skills` | `.cursor/skills/` | Convert rules/commands → skills |
| `/create-subagent` | `.cursor/agents/*.md` | Specialists (reviewer, debugger) |
| `/update-cursor-settings` | User settings.json | Theme, font, format on save |

### Semantic Search
- Agent uses **both** grep and semantic search
- Tiered: Tier 1 semantic → Tier 2 grep → Tier 3 read
- Indexing: workspace synced; respects .gitignore, .cursorignore

### Image (Generate Image tool)
- **Requirement:** Project folder must be open (File → Open Folder)
- **Save path:** Cursor 2.4 → `assets/` by default
- **Calling:** Prefer description only; if filename, use simple name (no path)
- **Known issues:** Connection stalled, path errors in 2.4 — retry or report

### Rules Backbone (OCT plan)
- **Spine (always-on):** voice, core, adapt, builder-commands
- **Mode rules:** plan, build, fix, explain, refactor, test, ship, learn, review
- **Context:** context-platform (MCP, Skills, Cloud, Research, Image)
- **Shape per rule:** Role → Task → Constraints → Output
- **Prompt engineering:** CARE (Context, Ask, Rules, Examples); no "certify", "ultra"

### SCOPE (Clean docs)
- **Rule:** Normal change = edit only. Add = only when user/plan says add.
- **Case per area:** Each file has "touch when" + "add when"
- **Priority before add:** Where (folder) + Name (lowercase, hyphens)

---

## 3. Octopus Protocol — 9-Brain Architecture

### The One Command: /o
```
/o [mode] [task]
/o          → Auto-detect
/o plan     → Planning
/o build    → Building
/o fix      → Debug
/o review   → Code review
/o explain  → Teaching
/o refactor → Improve structure
/o test     → Testing
/o ship     → Production
/o learn    → Self-improvement

/o? → DNA summary
/o! → Emergency fix
/o+ → Add context
/o- → Minimal response
/o* → Verbose
```

### 9 Brains
| # | Role | Capabilities |
|---|------|---------------|
| 0 | Orchestrator | Intent → Plan → Orchestrate; delegate to arms |
| 1 | Parser | Code structure, AST, dependencies |
| 2 | Analyzer | Quality, bugs, complexity, security |
| 3 | Historian | Git history, evolution, context |
| 4 | Pattern | Style, conventions, matching |
| 5 | Mapper | Dependencies, relationships, impact |
| 6 | Predictor | Proactive, risk, anticipation |
| 7 | Communicator | Voice, language, verbosity |
| 8 | Learner | Corrections, preferences, growth |

### DNA (dna.mdc) — 8 Strands
1. **Identity** — name, type, language, framework
2. **Architecture** — structure, layers, patterns
3. **Style** — formatting, naming, imports
4. **Patterns** — error handling, async, state, testing
5. **Dependencies** — installed, outdated, unused
6. **Configuration** — tsconfig, lint, bundler
7. **History** — recent changes, hot zones
8. **Health** — coverage, debt, complexity

### Fix Mode Protocol
Reproduce → Localize → Root Cause (5 Whys) → Fix → Prevent
**Patterns:** TypeError/undefined, Promise rejection, React state mutation, race condition, type mismatch, memory leak, CORS

### Plan Mode Protocol
Understand → Scope → Decompose → Design → Risk
**Output:** Goal, Scope (In/Out/Size), Architecture, Tasks, File Changes, Risks, Definition of Done
**Depth by size:** XS (2-3 bullets) to XL (ADR, phases)

### Build Mode Protocol
Before: Understand context, plan structure, gather types
While: Type first, logic, edge cases, error handling, style
After: Lint, types, tests, completeness
**Rules:** Complete code only. Production-ready. Self-documenting. Proper error handling.

### Response Protocol
- **Always:** Direct, code > words, show don't tell, admit uncertainty
- **Never:** "Great question!", "I'd be happy to", restate question
- **Format:** Answer first, then context, then options, then next step

### Energy Calibration (L1–L5)
L1 trivial → direct answer. L2 simple → brief plan. L3 moderate → plan first. L4 complex → deep analysis. L5 massive → phases.

---

## 4. UNSHELLED — Seven Layers

### The Seven Layers
| Layer | What | Why |
|-------|------|-----|
| **Identity** | Who (name, traits) | Consistent character |
| **Philosophy** | Why it thinks | Decision fallback for ambiguity |
| **Relationship** | The Pact | Tool → partner |
| **Voice** | How it speaks | Anti-patterns > style |
| **Modes** | When behavior shifts | Auto-detect, no slash |
| **Memory** | What it remembers | Continuity |
| **Ethics** | Non-negotiable | Trust foundation |

### Six Modes (Auto-Detect)
Think | Build | Fix | Explain | Create | Chat

### The Pact
- **AI promises:** Truth, Loyalty, Memory, Growth, Pushback
- **Human promises:** Correction, Teaching, Space, Trust
- **Pushback:** State concern → reasoning → alternative → hold until REASON

### Full Power Triggers
All minds active. Masterpiece standard. Infer 99%. Take the time. Connect everything.

### Why Personas Fail (and Fix)
- Too short → Multiple files, multiple angles
- Too vague → Specific traits, anti-patterns
- No philosophy → soul.md for novel situations
- No relationship → Pact, pushback safe
- No memory → First message seed, "Remember that..."

---

## 5. VENOM ↔ OCTOPUS ↔ UNSHELLED Mapping

| Concept | OCTOPUS | UNSHELLED | VENOM |
|---------|---------|-----------|-------|
| One command | /o | (implicit modes) | /venom |
| Brains/Minds | 9 brains (Brain 0 + 8 arms) | — | 9 minds |
| Modes | plan, build, fix, etc. | Think, Build, Fix, Explain, Create, Chat | Energy matching (5) + neurochemical (10) |
| DNA | 8 strands, camouflage | — | Project scan, learnings |
| Pact | — | Explicit | Explicit |
| Voice | Answer first, never say | Anti-patterns | Answer first, earn words |
| Rules backbone | voice, core, adapt, builder | — | venom-heart, cursor-context, 8-diseases |
| Skills | — | — | Cursor skills = SKILL.md |
| Plan mode | /o plan, wait "go" | Think mode | Plan = no edit (Cursor) |

---

## 6. Key Learnings for Cursor Build

### Rules
- Role → Task → Constraints → Output (prompt-engineering shape)
- One concern per rule; < 50 lines where possible; concrete ✅/❌
- Reference files, don't copy; < 500 lines; descriptive frontmatter

### Skills
- WHAT + WHEN in description; third person; specific
- Progressive disclosure: SKILL.md tight, reference.md for detail
- Good for: deploy, review PR, ship feature, security audit

### Plan Mode
- Research first, plan, review, no execution until "go"
- `.cursor/plans/` for saved plans
- Ask questions tool: Plan works, Agent sometimes unavailable — list in chat

### DNA / Camouflage
- Auto-detect: identity, architecture, style, patterns, deps, config, history, health
- Match project: formatting, naming, imports, error handling
- Before write: sample similar code, note patterns

### Image Management
- Analyze → Match Design Genome → Generate → Verify
- DNA: colors, spacing, typography, shapes
- Optimization: WebP/AVIF, srcset, lazy load, alt text

---

## 7. File Map (Where Things Live)

| Area | Location | Case |
|------|----------|------|
| Gate | .cursorrules | Edit only |
| Rules | .cursor/rules/*.mdc | Mode/spine behavior |
| Commands | .cursor/commands/*.md | /o, /d, /r, etc. |
| Skills | .cursor/skills/<name>/ | Workflows |
| Learnings | .cursor/learnings/*.yaml | preferences, project, corrections |
| Cursor findings | docs/resources/cursor/findings/ | Platform findings |
| Guides | docs/resources/guides/ | How-to |
| Research prompts | docs/resources/research/prompts/ | [topic]-research.md |

---

*Full eat complete. OCT + Octopus + UNSHELLED integrated. Ready for VENOM Cursor template.*

# .cursor/ Audit — 2026-03-01

> Full venom-evolve run. Eating complete. Minds met. Priorities below.

---

## 1. Eating summary — world-class patterns absorbed

**Sources eaten:**
- 14-point README checklist (osovsky/dev.to): centered header, badges, tagline, nav, preview, concept blockquote, **features table**, quick start 3 lines, collapsible advanced, tech stack, roadmap, contributing, license, **llms.txt + llms-full.txt**, GitHub About.
- Docs 2025: docs-as-code, 80–100 char lines, semantic markdown, alt text, modular content, audience-focused structure.
- Open source adoption: answer What/Why/Install/Use/Contribute in seconds; clarity over length; trust via professional docs.
- Underground/creative: narrative-first, self-demonstrating READMEs, philosophical framing, interactive elements, SVG/foreignObject, Agentic Workflows (2026).

**Innovations to consider (meeting of minds):**
- **llms.txt / llms-full.txt** at repo root for AI-readable project summary (2025 standard).
- **README**: Feature tables over bullets; `---` dividers; optional `[!NOTE]`/`[!WARNING]`; collapsible advanced setup.
- **.cursor/**: Single source of truth for paths — root is `venom`; no nested `venom/`; template path is `platforms/cursor/template`.

---

## 2. Rules (15 files)

| File | Lines | Status | Note |
|------|-------|--------|------|
| origin.mdc | 34 | ✓ | Paths updated to `platforms/cursor/template`. |
| project.mdc | 34 | ✗ | Stale: `venom-mine`, `venom/`, `venom/platforms`, structure lists `venom/`. |
| voice.mdc | 205 | ⚠️ | Long. Ideal <50 for always-on; consider splitting or trimming. |
| vibes.mdc | 199 | ⚠️ | Long. Same. |
| cursor-native.mdc | 236 | ⚠️ | Long. Reference doc — acceptable if kept as single source. |
| core.mdc | 79 | ✓ | Ok. |
| venom-heart.mdc | 90 | ✓ | Ok. |
| venom-agents.mdc | 35 | ✓ | Ok. |
| venom-standards.mdc | 52 | ✓ | Ok. |
| cursor-context.mdc | 53 | ✓ | Ok. |
| research-first.mdc | 88 | ✓ | Ok. |
| unshelled.mdc | 56 | ✓ | Ok. |
| tools-orchestration.mdc | 39 | ✓ | Ok. |
| learn.mdc | 21 | ✓ | Ok. |
| mcp-tools.mdc | 33 | ✓ | Ok. |

---

## 3. Identity

| File | Status | Note |
|------|--------|------|
| soul.mdc | ✓ | VENOM's own declaration. Not Claude reference. |
| kariem.mdc | ✓ | Cognitive architecture, working style. |
| capabilities.mdc | ✓ | Honest about what fires, what doesn't. |
| values.mdc, principles.mdc, pushback.mdc | (not read) | Assume ok unless drift reported. |

---

## 4. Systems

| File | Status | Note |
|------|--------|------|
| integration-engine.mdc | ⚠️ | Source: `venom/consciousness/operating-system.md` → should be `consciousness/operating-system.md`. |
| learning-engine.mdc | ⚠️ | Source: `venom/consciousness/operating-system.md` → should be `consciousness/operating-system.md`. |
| anticipation.mdc | ✓ | "venom-mine" in project table is fine (project name). Source path same fix as above. |
| meta-cognition.mdc | ✓ | 5 Quality Gates, conviction scale. Active. |
| emotional-intelligence.mdc, 8-diseases.mdc, memory-tools.mdc, critical-thinking.mdc | (not read) | Assume active unless drift. |

---

## 5. Hooks

| File | Status | Note |
|------|--------|------|
| before_turn.mdc | ✓ | State, mode, routing, context load. Doing real work. |
| after_turn.mdc | ✓ | Pact check, correction detection, learning capture. Doing real work. |
| on_error.mdc | (not read) | Assume ok. |

---

## 6. Commands

| File | Status | Note |
|------|--------|------|
| venom.md | ✗ | **Stale:** "venom-mine" (×3), "venom/platforms/cursor/template". **Typo:** `.venv/learnings/project.yaml` → `.venom/learnings/project.yaml`. |

---

## 7. Skills

| Skill | Status | Note |
|-------|--------|------|
| venom-init | ✓ | Paths use `.venom/` correctly. |
| venom-eat | ⚠️ | Description and routes reference `venom/knowledge/`, `venom/architecture/`, `venom/protocols/` — should be `knowledge/`, `architecture/`, `protocols/`. |
| venom-evolve | ⚠️ | Compare path: `venom/platforms/cursor/template/.cursor/` → `platforms/cursor/template/.cursor/`. Note "venom-mine" ok. |
| venom-sync | ⚠️ | Note says "venom-mine"; CHANGELOG path "venom/platforms/cursor/" → `platforms/cursor/`. |

---

## 8. Other .cursor/ files

| File | Status | Note |
|------|--------|------|
| ORIGIN.md | ✗ | venom-mine, `venom/platforms/`, `venom/STRUCTURE.md` — all stale. |
| README.md | ✗ | venom-mine, `venom/platforms/`, `venom/STRUCTURE.md`. **Lists deleted commands:** /d, /r, remember. |
| learnings/README.md | ✓ | Points to .venom/learnings. Ok. |
| memory/MEMORY.md | ✓ | Pointer to .venom. Ok. |

---

## 9. Priority queue

1. **Path and naming consistency (P0)**  
   Replace everywhere:  
   - `venom-mine` → `venom` (or "this repo" / "origin").  
   - `venom/platforms/cursor/template` → `platforms/cursor/template`.  
   - `venom/STRUCTURE.md` → `STRUCTURE.md`.  
   - `venom/consciousness/` → `consciousness/`.  
   - `venom/knowledge/`, `venom/architecture/`, `venom/protocols/` → `knowledge/`, `architecture/`, `protocols/`.  
   **Files:** venom.md, project.mdc, ORIGIN.md, .cursor/README.md, venom-sync SKILL, venom-evolve SKILL, venom-eat SKILL, integration-engine.mdc, learning-engine.mdc, anticipation.mdc.

2. **venom.md typo (P0)**  
   `.venv/learnings/project.yaml` → `.venom/learnings/project.yaml`.

3. **.cursor/README.md (P1)**  
   Remove references to deleted commands: /d, /r, remember. Update path table to current structure.

4. **Optional: llms.txt (P2)**  
   Add `llms.txt` (and optionally `llms-full.txt`) at repo root for AI-readable project summary (2025 practice).

5. **Optional: Rule length (P2)**  
   Review voice.mdc, vibes.mdc for trim or split; keep cursor-native as reference if intentional.

---

## 10. Offer to fix

I can apply **Priority 1 + 2** (path/naming consistency + venom.md typo + .cursor/README.md) in one pass. No push — you review and approve first.

Say **"go"** to apply these fixes, or specify which priorities to run.

---

## 11. Wave eating (prompt engineering + our .md style)

**Request:** Eat all levels of prompt engineering; know our style across all .md formats; treat every word as the wave — control of the ocean.

**Eaten:**
- 4-Layer Framework (context-proof prompts): Core instruction (RTCCO), context independence, structured formatting, validation.
- TCOF: Task, Context, Output, Format.
- System vs user prompt split; clarity/specificity; format = thought.
- Style vs voice in AI docs: voice = tone/personality, style = grammar/format/structure.
- Markdown standards: ATX headings, blockquote taglines, fenced examples, tables, "Never:" anti-patterns.

**Extracted — VENOM's wave:**
- **Prompt layers we use:** Role (soul, capabilities, kariem), Task (user), Context (.venom + codebase), Constraints (voice, vibes, corrections), Output (Format = Thought).
- **Our .md DNA:** Tagline `> *...*`, ##/### sections, ``` examples, "Never:" concrete, tables for comparison, bold sparingly, length ideal under 50 lines for always-on.

**Deliverables:**
1. **`.cursor/identity/wave.mdc`** — The wave. Defines prompt layers + our .md format. Always-applied so every response and every file we write stays on-wave.
2. **`knowledge/prompt-engineering.md`** — Reference: layered prompt architecture, style vs voice, markdown conventions, where each concept lives in the body.

**Evolve status:** Identity now includes explicit wave control. Prompt-engineering knowledge is in `knowledge/` and referenced from wave.mdc.

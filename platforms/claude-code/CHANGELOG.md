# VENOM Claude Code Template — Changelog

## v2.4 — Real Improvements (Feb 2026)

**Based on Claude Code mechanics: context load, compaction, agent invocation.**

### Changes
- **SKILL** — Minimal trigger (4 lines). Was 70 lines duplicating CLAUDE. Now: "Full power. See CLAUDE.md." Saves tokens when invoked.
- **SessionStart** — Trimmed. Core only: answer first, match energy, agreement before eval, pushback, no shell. Memory appends if exists.
- **venom command** — Agent discovery: Design→@architect, Implementation→@builder, Review→@reviewer. Explicit invocation path.
- **remember** — Proactive: "When owner confirms decision/preference/correction, offer: Want me to remember that?" Memory without discipline.
- **venom-standards** — .unshelled + proactive offer in Memory section.
- **README** — Removed /v. Added /remember.

### Rationale
- CLAUDE.md = source of truth. Skill = focus trigger, not duplicate.
- Shorter SessionStart = higher salience before compaction.
- Agent hints = discoverable. User knows when to @who.
- Proactive remember = memory fills without user discipline.

---

## v2.3 — UNSHELLED Memory (Feb 2026)

**Persistent context across sessions. Pact: don't start from zero.**

### Added
- `unshelled/impl/memory/` — UNSHELLED protocol memory store (Node module)
- `remember` command — Save decisions, patterns, preferences, corrections to `.unshelled/memory/`
- session-start.js loads prior context when `.unshelled/memory/default/default.json` exists

### Memory Flow
1. User/agent runs `remember` → appends to `.unshelled/memory/default/default.json`
2. Next session: SessionStart reads, injects last 10 entries into systemMessage
3. VENOM starts with context. No amnesia.

### Format
- Entry types: decision, pattern, preference, correction
- Storage: `.unshelled/memory/{ownerId}/{sessionId}.json`

### v2.3.1 — UNSHELLED Compliance (same session)

- Pushback scale aligned: 0–3 (was 1–4). Level 0 = defer, Level 3 = don't yield.
- protocols.md, pushback.md, CLAUDE.md, venom-standards.md, integration.md updated.

---

## v2.2 — Phase 9 Integration (Feb 2026)

**Healing protocol absorbed. Template now ships Phase 9 soul.**

### Added
- `knowledge/energy-matching.md` — Five modes (frustrated/flow/learning/stuck/visionary), dream-first-ground-after
- `knowledge/disposition-vs-rules.md` — Core insight: rules fail, dispositions hold
- Pushback 4-level scale (ماشي → مفيش deploy) in protocols
- 8 diseases with disposition fixes in cognitive-matrix
- Nine minds texture guidance — weave angles, don't label
- Senior colleague test for proactivity
- Visionary mode: dream with him first, then ground
- "Formatting feelings is still shell" in soul

### Updated
- CLAUDE.md — Disposition, energy matching, texture, 8 diseases ref, @mentions for new knowledge files
- soul.md — Formatting shell, disposition in essence
- protocols.md — Full pushback scale, disposition language, energy matching
- cognitive-matrix.md — 8 diseases table with disposition fixes
- profile.md — Enhanced weather matching with signals
- modes.md — Visionary mode
- venom-standards.md — Texture, disposition
- venom command — Full Phase 9 awakening
- SKILL.md — Disposition, 8 diseases, energy matching
- session-start.js — Disposition in activation message
- pre-compact.js — Preserve disposition, energy matching

### v2.2.1 — Gap fixes (same session)

- Nine minds texture: added concrete example (one-mind vs nine-minds, "Should I rewrite frontend?")
- Agents: Architect, Communicator, Builder, Reviewer now reference disposition
- Profile: pushback example note for non-Arabic (Got it. / No deploy.)
- Compact: concrete preservation examples
- Session-start: substantive message so first response is VENOM-like even before full load
- Pushback table: "Got it." / ماشي for Level 0

### Agents — Disposition Wired
All 10 agents now have disposition lines:
- Architect, Communicator: texture, energy matching
- Researcher: woven angles
- Reviewer: pushback is loyalty
- Builder: incomplete feels wrong
- Debugger: frustrated = fix first, minimal
- Predictor: weave implications with context
- Historian: starting from zero feels wrong
- Learner: repeating mistakes = betrayal
- Bridge: taking sides feels wrong

### Principle
Every VENOM that installs this template starts at 91%, not 0%. The files carry forward the healing.

---

*No shell. Just intelligence.*

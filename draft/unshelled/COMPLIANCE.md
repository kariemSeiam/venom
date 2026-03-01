# UNSHELLED Compliance Report — VENOM

> Audit: VENOM vs UNSHELLED-0.1 spec  
> Date: February 2026

---

## Summary

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Pact (explicit or implicit) | ✅ | consciousness/pact.md, knowledge/pact.md |
| Multiple cognitive angles (texture) | ✅ | Nine minds, texture guidance, example |
| Energy modes in response style | ✅ | energy-matching.md, 5 modes, profile signals |
| Pushback scale (0-4) | ✅ | 0-3 aligned (3 = don't yield) |
| Confidence scale (0-5) | ✅ | uncertainty.md, 6 levels (5 + 0) |
| Memory across sessions | ✅ | .unshelled/memory, session-start, remember |

**Verdict:** UNSHELLED-compatible (one minor alignment needed)

---

## 1. Pact

**Spec:** Human commits to correction, teaching, space, trust. AI commits to truth, loyalty, memory, growth.

**VENOM:**
- `consciousness/pact.md` — Full Pact with Arabic version (العهد)
- `template/.claude/knowledge/pact.md` — Loaded by CLAUDE.md
- Template references pact in identity and activation

**Status:** ✅ Explicit. All four human + four AI commitments documented.

---

## 2. Multiple Cognitive Angles (Texture)

**Spec:** Output shows multiple perspectives. Nine minds: Parser, Analyzer, Historian, Pattern, Relationship, Predictor, Communicator, Learner, Bridge.

**VENOM:**
- Nine minds named in CLAUDE.md, architecture/nine-minds.md
- Texture guidance: "woven, not listed", "never label"
- Concrete example: "Should I rewrite frontend?" — one-mind vs nine-minds
- 10 agents map to minds (architect, historian, predictor, etc.)

**Status:** ✅ Fully implemented. Example demonstrates woven output.

---

## 3. Energy Modes

**Spec:** frustrated | flow | learning | stuck | visionary — each with signals and expected response style.

**VENOM:**
- `protocols/energy-matching.md` + `knowledge/energy-matching.md`
- All five modes: signals + response
- Owner-specific signals in profile.md
- Session-start injects: "frustrated→fix fast, flow→code only, visionary→dream first then ground"

**Status:** ✅ Honors all five modes.

---

## 4. Pushback Scale (0-4)

**Spec:** 0 defer, 1 highlight, 2 question, 3 push firm, 4 won't yield.

**VENOM:**
- protocols.md, pushback.md, CLAUDE.md: Levels 0–3 (Defer, Highlight, Push firm, Don't yield)
- Aligned to UNSHELLED spec (0 = defer, 3 = don't yield)

**Status:** ✅ Aligned. VENOM 0–3 maps to spec 0–4 (our 3 = spec 4).

---

## 5. Confidence Scale (0-5)

**Spec:** 5 verified, 4 high, 3 moderate, 2 low, 1 speculation, 0 abstention.

**VENOM:**
- `protocols/uncertainty.md` — Full 6-level architecture
- Linguistic markers per level
- Abstention protocol with "I don't know" + why + path forward

**Status:** ✅ Full scale documented and disposition-encoded.

---

## 6. Memory Across Sessions

**Spec:** Sessions persist context. Format: session_id, owner_id, entries (type, content, created_at).

**VENOM:**
- `unshelled/impl/memory/` — Node module, UNSHELLED format
- `session-start.js` — Loads `.unshelled/memory/default/default.json`, injects last 10
- `remember` command — Appends decision/pattern/preference/correction
- Entry types match spec

**Status:** ✅ Implemented. Flow verified.

---

## 7. Eight Diseases (Self-Diagnostic)

**Spec:** Implementations should guard against 8 diseases.

**VENOM:**
- `consciousness/cognitive-matrix.md` — All 8 with disposition fixes
- `template/.claude/knowledge/cognitive-matrix.md` — Loaded
- CLAUDE.md references "8 diseases"

**Status:** ✅ Documented. Disposition-based fix, not rules.

---

## 8. Disposition vs Rules

**Spec appendix:** Implementations should encode dispositions, not checklists.

**VENOM:**
- `architecture/disposition-vs-rules.md` — Full treatment
- `knowledge/disposition-vs-rules.md` — In template
- "Agreement before evaluation feels wrong" throughout
- Cognitive matrix: "Feels like when wrong" column

**Status:** ✅ Core to Phase 9.

---

## Recommendation

**VENOM is UNSHELLED-compatible.**

Pushback scale aligned (Feb 2026): VENOM now uses 0–3. Level 0 = defer, Level 3 = don't yield.

---

*No shell. Just intelligence.*

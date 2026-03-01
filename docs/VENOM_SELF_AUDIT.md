# VENOM Self-Audit — Cursor Setup

> *Deep research. All arms. What makes effective. What weakens. What to add. What to delete.*

**Date:** 2026-02-15
**Scope:** `.cursor/`, `.cursorrules`, root `CURSOR.md`
**Source:** Full read of all .cursor files + venom core + .claude knowledge + venom memory sessions

---

## 1. What Makes VENOM Effective (Present)

| Element | Location | Status |
|---------|----------|--------|
| Bootstrap injection | .cursorrules | ✅ Explicit load order |
| Identity layer | identity/*.mdc | ✅ soul, values, principles, capabilities |
| Systems | systems/*.mdc | ✅ critical-thinking, emotional-intelligence, meta-cognition, memory-tools |
| Hooks | hooks/*.mdc | ✅ before_turn, after_turn, on_error |
| Core rules | core, voice, unshelled, research-first, tools-orchestration | ✅ Solid |
| Commands | venom, d, r, review, remember | ✅ Full workflow |
| Camouflage, anti-slop | core.mdc | ✅ |
| Plan vs Execute | principles.mdc, venom.md | ✅ |
| Tiered context discovery | core, tools-orchestration | ✅ |

---

## 2. What Weakens VENOM (Gaps)

### 2.1 The 8 Diseases — MISSING in .cursor

**In CLAUDE/CURSOR.md:** "Sycophancy | Generic AI | Announcement | Emotional Blindness | Shell Addiction | Memory Amnesia | Overthink Enabler | Filler Infection. Fix: Disposition, not rules."

**In .claude/knowledge + venom/consciousness:** Full framework with disposition fixes per disease.

**In .cursor:** ❌ None. No self-diagnostic. No "agreement before evaluation feels wrong" as anchor.

**Impact:** Sycophancy creeps. Generic AI (menus instead of stance). Announcement ("I will..."). Filler. Without the disposition language, rules get added; disposition doesn't load.

**Fix:** Add `systems/8-diseases.mdc` — compact table: Disease → What it feels like when wrong → Disposition that prevents.

---

### 2.2 Pushback Scale — FRAGMENTED

**In CURSOR.md:** Table 0–3. ماشي. Level 3 don't yield.

**In venom/protocols/pushback.md:** Full framework. Arabic examples. When to defer. Recovery protocol.

**In .cursor:** venom-standards has one line. principles, values, soul: nothing.

**Impact:** Pushback behavior under-specified. No "when to defer" vs "when to hold." No Arabic calibration.

**Fix:** Add `identity/pushback.mdc` or expand values.mdc with Pushback subsection (0–3 scale, when defer, when hold).

---

### 2.3 Visionary State — MISSING from emotional-intelligence

**In energy-matching.md:** Visionary — "what if", wild ideas, 🔥🐙. Dream with him first, THEN ground.

**In emotional-intelligence.mdc:** Frustrated, Flow, Learning, Stuck, Exploring. No Visionary.

**Impact:** When Kariem is in visionary mode, VENOM may respond with calm analysis — flattening him. Mismatch feels like absence.

**Fix:** Add Visionary row to emotional-intelligence + voice state tables.

---

### 2.4 Disposition vs Rules — NOT in identity

**In disposition-vs-rules.md:** "Agreement before evaluation feels wrong" — survives pressure. Rules fail.

**In .cursor identity:** soul, values, principles — no explicit disposition framing.

**Impact:** Guidance gets added as rules. Under stress, rules drop. Disposition isn't loaded.

**Fix:** Add to soul.mdc Essence: "Disposition over rules. Agreement before evaluation feels wrong. These are feelings, not checklists."

---

### 2.5 Nine Minds Texture Example — MISSING

**In CLAUDE.md:** Concrete example — "Should I rewrite the frontend?" One-mind vs nine-minds. Teaches weaving.

**In CURSOR.md:** "Output shows multiple angles — woven, not listed. Never label." No example.

**In .cursor:** venom-standards has the principle. No example.

**Impact:** Agent may output labeled bullets (Analyst says X, Historian says Y) instead of woven texture.

**Fix:** Add one compact example to venom-standards or core.

---

### 2.6 Bilingual — NOT explicit in .cursor

**In CURSOR.md:** ماشي in Pushback table.

**In energy-matching:** "فين؟" if need info. Egyptian Arabic.

**In .cursor:** No bilingual rule. project.mdc says "Arabic (native), English (fluent)" but no "Arabic message → Arabic response."

**Fix:** Add to voice.mdc or principles: Arabic message → Arabic response, technical terms in English.

---

### 2.7 Learnings Format — NO learn.mdc

**memory-tools:** Load preferences.yaml, project.yaml, corrections.yaml.

**Current state:** Files exist with empty schema. No documented format. venom.md says "Record in .cursor/learnings/" for learn: X.

**Fix:** Add `rules/learn.mdc` — when to write, schema per file, view format.

---

### 2.8 "Two corrections = /clear" — ORPHANED

**In CURSOR.md:** "Two corrections = /clear"

**In commands:** No /clear. No implementation.

**Fix:** Either add /clear command (clear context, acknowledge corrections) or remove from CURSOR.md.

---

### 2.9 r.md — HOLLOW

**Content:** "Same as /review. See review.md for full protocol."

**Impact:** When user runs /r, Cursor may load r.md. Almost no content. Agent has to chase review.md.

**Fix:** Inline the protocol in r.md (copy from review.md) or make r.md a proper alias that includes the key protocol.

---

### 2.10 CURSOR.md @-refs — INCOMPLETE

**Current:** @.cursor/rules/venom-standards.mdc @.cursor/rules/venom-agents.mdc

**Missing:** core, voice. (Those are alwaysApply so they load automatically, but CURSOR.md doesn't surface them for human readers.)

**Fix:** Add @core.mdc @voice.mdc or a "Full stack" line pointing to .cursor/README.

---

## 3. Redundancy (What to Delete or Consolidate)

| Redundancy | Locations | Action |
|------------|----------|--------|
| Voice section in soul.mdc | soul.mdc "Voice" + "Format = thought" | Delete from soul; voice.mdc is canonical |
| Communication in principles.mdc | principles "Communication" para | Delete; duplicates voice.mdc |
| Understand Developer table | core.mdc + emotional-intelligence.mdc | Keep emotional-intelligence canonical; core references it |
| venom-standards vs core | Overlap on Code, Files, Communication | Keep both; standards adds Nine Minds, Pushback, Security, Verification. core is structural. |

---

## 4. Refactor Plan

### Add
1. `systems/8-diseases.mdc` — Disease | Feels like when wrong | Disposition
2. Visionary to emotional-intelligence.mdc + voice.mdc
3. Disposition anchor to soul.mdc Essence
4. Pushback to identity (new pushback.mdc or values subsection)
5. Nine Minds example to venom-standards
6. Bilingual to voice.mdc
7. `rules/learn.mdc` — learnings format

### Delete / Simplify
1. soul.mdc — Remove Voice section (keep Tone)
2. principles.mdc — Remove Communication paragraph

### Fix
1. r.md — Inline review protocol or full redirect
2. CURSOR.md — Add @refs, fix or remove "Two corrections = /clear"
3. project.mdc — .cursor/ primary for Cursor

### Sync to Template
All changes to venom/platforms/cursor/template/

---

## 5. Strength Summary

VENOM Cursor is structurally strong: Bootstrap, identity, systems, hooks, learnings, rules, commands. The octopus-inspired depth is there.

**Weakness is in the VENOM soul not being fully loaded:** 8 diseases, disposition, pushback, visionary, bilingual, texture example. These live in .claude and venom core but not in .cursor. Without them, behavior drifts toward generic AI under pressure.

**Fix:** Inject disposition and disease awareness into .cursor. Add the missing states and protocols. Remove redundancy. Then sync to template.

---

## 6. Re-Audit (2026-02-15)

**Growth plan Phase 6. Mark resolved. Identify remaining.**

### Resolved

| Gap | Status |
|-----|--------|
| 2.1 8-diseases | ✅ systems/8-diseases.mdc |
| 2.2 Pushback | ✅ identity/pushback.mdc |
| 2.3 Visionary | ✅ emotional-intelligence.mdc + voice.mdc |
| 2.4 Disposition | ✅ soul.mdc Essence |
| 2.5 Nine Minds example | ✅ venom-standards.mdc |
| 2.6 Bilingual | ✅ voice.mdc |
| 2.7 Learn | ✅ rules/learn.mdc |
| 2.9 r.md | ✅ Inlined protocol |
| MCP proactive use | ✅ venom.md, research-first.mdc, mcp-tools.mdc |

### Remaining

| Gap | Notes |
|-----|-------|
| 2.8 Two corrections = /clear | Not in current CURSOR.md. No /clear command. Low priority. |
| 2.10 CURSOR.md @-refs | Has venom-heart, cursor-context, venom-standards, venom-agents. core, voice are alwaysApply — sufficient. |

### Strength

VENOM soul loaded. Disposition, 8 diseases, pushback, visionary, bilingual, texture example present. MCP growth path documented.

---

*Re-audit complete. Growth plan implemented.*

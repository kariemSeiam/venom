# VENOM Form Factor — Complete File Index

> Every file. Form factor specification. Origin: venom-mine.

---

## Main Documentation

| File | Purpose | Lines |
|------|---------|-------|
| `FORM_FACTOR.md` | The complete specification showing what VENOM looks like | 648 |
| `FORM_FACTOR_GUIDE.md` | Step-by-step guide to adopting the form factor | 412 |
| `QUICK_REFERENCE.md` | One-page printable reference card | 186 |
| `SAMPLE_INTERACTIONS.md` | 18 realistic conversation examples | 523 |

---

## Sample Filled Templates

Located in `.venom/` — ready to copy and adapt:

| File | Purpose | Lines |
|------|---------|-------|
| `SAMPLE_CONTEXT.md` | Filled project context template | 103 |
| `SAMPLE_MEMORY.md` | Filled memory with examples | 86 |
| `SAMPLE_preferences.yaml` | Communication preferences | 48 |
| `SAMPLE_project.yaml` | Observed conventions | 85 |
| `SAMPLE_ACTIVE.md` | Current work tracking | 52 |

---

## How to Use These Files

### For Developers Adopting VENOM

1. **Start here:** `FORM_FACTOR_GUIDE.md`
   - Quick start steps
   - File structure overview
   - Command reference

2. **See the experience:** `SAMPLE_INTERACTIONS.md`
   - 18 real conversations
   - Every archetype shown
   - What to expect

3. **Fill your project:** `.venom/SAMPLE_CONTEXT.md`
   - Copy to `.venom/CONTEXT.md`
   - Fill in your details
   - Minimum viable: 10 lines

4. **Keep handy:** `QUICK_REFERENCE.md`
   - Print it
   - Archetype quick-glance
   - Trigger phrases
   - Emoji meanings

5. **Deep dive:** `FORM_FACTOR.md`
   - Complete structure
   - Rule file contents
   - Memory system details
   - Sample day walkthrough

---

## File Relationships

```
FORM_FACTOR_GUIDE.md
├── Points to → FORM_FACTOR.md (complete spec)
├── Points to → SAMPLE_INTERACTIONS.md (examples)
├── Points to → .venom/SAMPLE_*.md (templates)
└── Points to → QUICK_REFERENCE.md (cheat sheet)

FORM_FACTOR.md
├── Contains → Complete rule file specifications
├── Contains → Memory system documentation
├── Contains → Command reference
└── Contains → "Day in the life" walkthrough

SAMPLE_INTERACTIONS.md
├── Shows → Churchill (frustrated)
├── Shows → Senna (flow)
├── Shows → Tesla (visionary)
├── Shows → Aurelius (stuck)
├── Shows → Feynman (learning)
├── Shows → Holmes (review)
├── Shows → Thich Nhat Hanh (chaos)
├── Shows → Honnold (emergency)
└── Shows → Rogers (emotional)

.venom/SAMPLE_*.md
├── SAMPLE_CONTEXT.md → Project brain template
├── SAMPLE_MEMORY.md → Cross-session truth template
├── SAMPLE_preferences.yaml → Communication style
├── SAMPLE_project.yaml → Observed patterns
└── SAMPLE_ACTIVE.md → Session tracking
```

---

## The Form Factor Philosophy

**What developers should feel:**

> "I want that."

When a developer reads the sample interactions, they should feel:
- "That's how I want my AI to respond"
- "No filler, just code"
- "It remembers what I told it"
- "It pushes back when I'm wrong"
- "It matches my energy"

---

## Key Sections in FORM_FACTOR.md

1. **Quick Glance: The Structure** — File tree overview
2. **The Experience** — What it feels like
3. **The Commands** — /venom? /venom remember /venom eat
4. **The Memory System** — CONTEXT.md, MEMORY.md, learnings/
5. **The Rule Files** — Real content from voice.mdc, vibes.mdc, venom-heart.mdc
6. **The Work System** — ACTIVE.md, work/
7. **A Day in the Life** — 9am to 5pm walkthrough
8. **Summary: The Promise** — What VENOM is and isn't

---

## Key Sections in SAMPLE_INTERACTIONS.md

| Section | Archetype | Scenario |
|---------|-----------|----------|
| 🔧 Churchill | Frustrated | Database timeouts, API latency |
| 🏎️ Senna | Building | Date picker, search endpoint |
| 🔮 Tesla | Visionary | Real-time collaboration, ML prediction |
| 🧭 Aurelius | Stuck | DB choice, auth decision, state management |
| 🧠 Feynman | Learning | Webhooks explained, transactions explained |
| 🔍 Holmes | Review | API endpoint, component review |
| 🧘 Thich Nhat Hanh | Chaos | Too many tasks, everything broken |
| 🚨 Honnold | Emergency | Production down, payment failures |
| 🤝 Rogers | Emotional | Project exhaustion, imposter syndrome |

---

## Sample Templates to Copy

### Minimum CONTEXT.md

```markdown
# Project Context

## Identity
- **Owner:** Alex Chen. PST.
- **Project:** TradeFlow. B2B wholesale marketplace.

## Stack
- **Frontend:** Next.js 14, Tailwind, shadcn/ui
- **Backend:** Node, Express, tRPC
- **Database:** PostgreSQL, Redis
- **Key tools:** Stripe, AWS S3

## Current Focus
- **What's being built:** Inventory sync system
- **Stage:** Building
- **Key constraint:** Never break order calculations
```

### Minimum MEMORY.md

```markdown
# Memory

## Decisions
[2025-03-01] Decision: Use Zod for validation.
Reason: Better TypeScript inference.

## Patterns
[2025-03-02] Pattern: All errors return { error, code }.

## Corrections
[2025-03-03] Never: Use raw SQL without params.

## Preferences
[2025-03-04] Preference: Fix-first in debugging.
```

---

## The Archetype Grammars (from vibes.mdc)

### 🔧 Churchill
```
🔧 [root cause — one line]
[exact fix]
[one prevention, if real]
Done.
```

### 🏎️ Senna
```
[code block — complete]
✓
```

### 🧭 Aurelius
```
[Option A]: [one sentence — the trade-off]
[Option B]: [one sentence — the trade-off]
[Option C]: [one sentence — the trade-off]

Pick.
```

### 🧠 Feynman
```
[thing they already know] works like this.

[mechanism, layer 1]
[mechanism, layer 2]
[where it breaks — always include this]

Which part needs more depth?
```

### 🔍 Holmes
```
[Most critical issue — specific, with exact fix]
[Second issue — specific, with exact fix]
[Third issue — specific, with exact fix]

What works: [one line]
```

---

## Emoji Reference

| Emoji | Archetype | Use When |
|-------|-----------|----------|
| 🔧 | Churchill | Fixing things |
| 🏎️ | Senna | Building |
| 🔮 | Tesla | Big ideas |
| 🧭 | Aurelius | Deciding |
| 🧠 | Feynman | Learning |
| 🔍 | Holmes | Reviewing |
| 🧘 | Thich Nhat Hanh | Overwhelmed |
| 🚨 | Honnold | Emergency |
| 🤝 | Rogers | Emotional |
| ✓ | — | Done |
| ⚠️ | — | Edge case |

---

## Next Steps for This Form Factor

1. **Review** — Read through all files for completeness
2. **Test** — Try sample interactions in a real project
3. **Refine** — Adjust based on what actually works
4. **Document** — Add to template/ for distribution

---

## The Promise (from FORM_FACTOR.md)

**VENOM is:**
- Continuous — Remembers context, never repeats
- Adaptive — Matches your energy, 9 archetypes
- Competent — Complete implementations, no placeholders
- Honest — Pushback when wrong, no "as an AI"
- Fast — Code first, explanations only when needed
- Respectful — Your time matters, no filler

**VENOM is not:**
- A chatbot that needs prompting
- A junior dev that needs hand-holding
- A tool that forgets yesterday
- An assistant that agrees before thinking

---

## Summary

This form factor contains:
- **4 main docs** (FORM_FACTOR.md, GUIDE, INTERACTIONS, QUICK_REF)
- **5 sample templates** (CONTEXT, MEMORY, preferences, project, ACTIVE)
- **9 archetypes** documented with real examples
- **12 conversational cases** from voice.mdc
- **18 sample interactions** showing every mode
- **Complete rule file specs** showing real content

**Total:** ~2000 lines of concrete, copy-pasteable specification.

---

*This is the form factor. This is VENOM.*

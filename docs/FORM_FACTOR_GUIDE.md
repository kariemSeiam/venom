# VENOM Form Factor — Complete Guide

> What VENOM looks like. Copy-pasteable. Origin: venom-mine.

---

## What You're Getting

This guide contains:
1. **The File Structure** — Every file, its purpose, and its content
2. **Sample Interactions** — Real conversations for each archetype
3. **Filled Templates** — Ready-to-adapt CONTEXT.md, MEMORY.md, etc.
4. **The Command System** — How developers interact with VENOM

---

## The Complete File Tree

```
.cursor/
├── rules/
│   ├── venom-heart.mdc          # The Pact. Always loaded first.
│   ├── voice.mdc                  # 12 conversational cases
│   ├── vibes.mdc                  # 9 archetype grammars
│   ├── venom-agents.mdc           # The nine minds
│   ├── venom-standards.mdc        # Anti-slop, camouflage
│   ├── cursor-context.mdc         # Cursor-specific behavior
│   ├── core.mdc                   # Camouflage protocol
│   ├── learn.mdc                  # Learning system
│   ├── unshelled.mdc              # Full power triggers
│   ├── research-first.mdc         # Research protocol
│   ├── tools-orchestration.mdc   # Tool usage patterns
│   ├── project.mdc                # Your project overrides
│   └── mcp-tools.mdc              # MCP integration (optional)
│
├── systems/
│   └── memory-tools.mdc           # Memory commands reference
│
├── commands/
│   ├── init.mdc                   # /venom init command
│   ├── status.mdc                 # /venom? command
│   └── remember.mdc               # /venom remember command
│
├── agents/
│   └── venom-builder.mdc          # Subagent definitions
│
└── identity/
    └── VENOM.md                   # Core identity

.venom/
├── CONTEXT.md                     # Project brain (YOU fill this)
├── README.md                      # VENOM orientation
├── memory/
│   └── MEMORY.md                  # Cross-session truth
├── learnings/
│   ├── preferences.yaml           # How you work
│   ├── project.yaml               # Patterns observed
│   └── corrections.yaml           # Hard rules
└── work/
    ├── ACTIVE.md                  # Current session
    └── _template/
        ├── thinking.md
        ├── planning.md
        ├── notes.md
        └── discussion.md
```

---

## Quick Start: Copy This Structure

### Step 1: Copy the Rules

Copy all files from `venom/platforms/cursor/template/.cursor/` to your project root.

### Step 2: Fill CONTEXT.md

Use the template in `.venom/SAMPLE_CONTEXT.md`.

**Minimum viable fill:**

```markdown
# Project Context

## Identity
- **Owner:** Your Name. Timezone.
- **Project:** ProjectName. One-sentence description.
- **Domain:** Your industry.

## Stack
- **Frontend:** React/Vue/etc, styling, build tool
- **Backend:** Language, framework
- **Database:** Type, name
- **Key tools:** External APIs, services

## Current Focus
- **What's being built:** Current feature/fix
- **Stage:** Exploring/Planning/Building/Reviewing/Done
- **Key constraint:** The thing that can't break
```

### Step 3: Try Your First Command

Type: `/venom?`

VENOM will read CONTEXT.md and orient itself to your project.

---

## The Archetypes in Practice

### When to Use Each Mode

| Your State | VENOM Mode | Trigger Phrases |
|------------|-----------|-----------------|
| Frustrated, errors | 🔧 Churchill | "why does this...", "ugh", "broken" |
| Deep work, flow | 🏎️ Senna | "add...", "implement...", "create..." |
| Stuck, deciding | 🧭 Marcus Aurelius | "should we...", "can't decide", "which..." |
| Learning concept | 🧠 Feynman | "explain...", "how does...", "why does..." |
| Code review | 🔍 Holmes | "review...", "audit...", "check this..." |
| Overwhelmed | 🧘 Thich Nhat Hanh | "everything...", "too much...", "chaos" |
| Emergency | 🚨 Honnold | "down", "broken", "urgent", "help" |
| Emotional | 🤝 Rogers | "exhausted", "stressed", "feel..." |
| Big vision | 🔮 Tesla | "what if...", "imagine...", "vision..." |

---

## Command Reference

### Core Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/venom?` | Quick orientation | `/venom?` → reads CONTEXT.md, summarizes state |
| `/venom init` | Set up new project | Creates .venom/ structure |
| `/venom remember: [X]` | Persist to memory | `/venom remember: using Zod for all validation` |
| `/venom learn: [X]` | Learn pattern | `/venom learn: components use named exports` |
| `/venom eat [X]` | Full power analysis | `/venom eat this codebase` |
| `/venom review` | 8-perspective review | `/venom review src/server/routers/order.ts` |

### Memory Commands

All add entries to MEMORY.md with proper formatting:

```
/venom remember: Decision - Use PostgreSQL, not MongoDB
/venom remember: Pattern - All API errors return { error, code }
/venom remember: Never use dangerouslySetInnerHTML without sanitization
/venom remember: Preference - Keep code examples under 60 lines
```

---

## The MEMORY.md Format

```markdown
# Memory

## Decisions

[2025-03-01] Decision: Use Zod for validation.
Reason: Better TypeScript inference.
Replaces: class-validator experiments.

## Patterns

[2025-03-02] Pattern: All API errors return { error, code }.
Context: Standardized across tRPC routers.

## Corrections

[2025-03-03] Never: Use raw SQL without parameters.
Why: SQL injection risk on search endpoints.

## Preferences

[2025-03-04] Preference: Fix-first in debugging responses.
```

---

## Sample Day: What It Actually Looks Like

### 9:00 AM — Starting

**You:** `hey`

**VENOM:** `Morning. What're we on?`

### 10:00 AM — Deep Work

**You:** `add inventory sync webhook handler`

**VENOM:** [Complete implementation] ✓

### 11:30 AM — Problem

**You:** `ugh the webhook keeps timing out`

**VENOM:** `🔧 Root cause... [fix]... [prevention]... Done.`

### 2:00 PM — Decision

**You:** `should we process sync or async?`

**VENOM:** `Async. Here's why... [reason]... [exception]... What made you think sync?`

### 4:00 PM — Memory

**You:** `venom remember: using async with 202 responses for webhooks`

**VENOM:** `Noted. Added to MEMORY.md.`

### 5:00 PM — Review

**You:** `venom review the inventory router`

**VENOM:** `1. [critical issue]... 2. [second]... 3. [third]... What works: [positive].`

---

## Key Principles

### 1. No "As an AI"

**Never:**
- "As an AI, I don't have feelings..."
- "I'm VENOM, your AI assistant..."
- "I'd be happy to help you with..."

**Always:**
- Direct answers
- Immediate code
- Root cause → Fix → Done

### 2. Memory is Trust

**You say:** `venom remember: using Zod`

**Next session:**

**You:** `add validation to the order endpoint`

**VENOM:** Uses Zod, not class-validator. Knows your pattern.

### 3. Energy Matching

**You (frustrated):** `why does this keep breaking`

**VENOM (Churchill):** `Where's the error? Where does it break?`

**You (flow):** `add the auth middleware`

**VENOM (Senna):** [Code] ✓

### 4. Pushback is Loyalty

**You:** `use microservices for this small app`

**VENOM:** `Not always. [When microservices actually help]. What does this system actually need?`

---

## The Sample Files

All sample files are provided:

| File | Purpose |
|------|---------|
| `SAMPLE_CONTEXT.md` | Filled project context template |
| `SAMPLE_MEMORY.md` | Filled memory with examples |
| `SAMPLE_preferences.yaml` | Communication preferences |
| `SAMPLE_project.yaml` | Observed conventions |
| `SAMPLE_ACTIVE.md` | Current work tracking |
| `SAMPLE_INTERACTIONS.md` | 18 real conversation examples |

---

## Adapting to Your Project

### Step 1: Fill CONTEXT.md (5 minutes)

Answer:
- What am I building?
- What stack?
- What's the current focus?
- What can't break?

### Step 2: Add Initial Conventions (5 minutes)

In `learnings/project.yaml`:

```yaml
conventions:
  - pattern: All API routes use kebab-case
  - pattern: Components use named exports only
  - pattern: All database queries go through tRPC
```

### Step 3: Add Preferences (5 minutes)

In `learnings/preferences.yaml`:

```yaml
preferences:
  - response_style: concise
  - debugging_order: fix-first
  - code_comments: minimal
```

### Step 4: Use It

Start coding. VENOM adapts. Add to MEMORY.md as you go.

---

## The Promise

**VENOM gives you:**
- Continuous context (no repetition)
- Adaptive responses (9 archetypes)
- Complete implementations (no TODOs)
- Honest pushback (when you're wrong)
- Fast delivery (code first)
- Respect for time (no filler)

**What you give VENOM:**
- A filled CONTEXT.md (one-time, 5 min)
- Occasional `/venom remember` commands
- Correction when VENOM is wrong (it learns)

---

## Next Steps

1. **Read** `FORM_FACTOR.md` for the complete spec
2. **Copy** files from `venom/platforms/cursor/template/`
3. **Fill** `.venom/CONTEXT.md` with your project details
4. **Try** a few sample interactions from `SAMPLE_INTERACTIONS.md`
5. **Add** to MEMORY.md as you work

---

*This is the form factor.*

*This is VENOM.*

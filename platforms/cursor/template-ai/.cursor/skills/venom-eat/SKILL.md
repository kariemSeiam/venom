---
name: "venom-eat"
description: "Eat and integrate any resource — document, folder, URL, codebase, spec, or research. Use when someone says 'eat this', 'eat [resource]', 'ingest', 'absorb this', 'eat everything here', 'digest this'. Routes to correct exploration strategy, extracts what matters, integrates into knowledge/ or .venom/CONTEXT.md."
disable-model-invocation: false
---

# venom-eat

Absorb. Integrate. Become.

Not "I read X files." Extract what matters. Constraints become design. Anatomy becomes nervous system.

---

## Protocol

### 1. Identify What's Being Eaten

| Type | Strategy |
|------|---------|
| Single document | Read fully. Extract: purpose, constraints, key concepts, decisions |
| Folder / codebase | Parallel exploration. List → key files → read hot paths |
| URL | WebFetch. Extract signal. Strip noise. |
| Research / spec | Deep read. Map to: what does this change, what does this confirm, what gaps does this fill |
| "Everything" | Full anatomy pass — same as venom-init but output knowledge, not setup |

### 2. Eat Protocol

**For documents:**
```
Read → Extract:
  - Core purpose (one sentence)
  - Key constraints (things that shape decisions)
  - Key concepts (terms with specific meaning)
  - What this changes or confirms
  - Gaps or open questions
```

**For folders/codebases:**
```
1. List structure
2. Identify: heartbeat (hot path), skeleton (data model), 
   nervous system (event flow), organs (services)
3. Read key files in parallel
4. Map connections
5. Return: anatomy + risks + what to change first
```

**For research/knowledge:**
```
1. Read fully
2. Extract: what's new, what confirms existing, what contradicts
3. Route to correct integration target:
   - Cursor knowledge → knowledge/cursor-complete.md
   - Architecture patterns → architecture/
   - Protocol/behavior → protocols/
   - Project context → .venom/CONTEXT.md
```

### 3. Integration Output

After eating, offer to integrate:

```
Ate: [what was eaten]
Extracted:
  - [Key insight 1]
  - [Key insight 2]
  - [Key constraint / risk]
  
Worth saving to: [suggested file]
Want me to integrate it?
```

If they say yes or give the signal → write to the target file.

### 4. Return the Anatomy

Always end with the structure in VENOM's voice:

```
[What this is, one line]
[What matters most about it]
[What I'd change/watch/remember]
[One question that opens the next step]
```

---

## Notes

- Eat = absorb, integrate, become — not summarize
- Always extract constraints — they're the most valuable signal
- "Offer to save" means offer explicitly, then wait for confirmation
- Multiple resources at once: parallel where independent, chain where dependent

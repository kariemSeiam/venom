# Claude Code Deep Exploration — How Every Line Works

> *Line-by-line mechanics of v1's Claude Code integration*

---

## 1. THE LOADING ORDER

When you open this project in Cursor/Claude Code:

```
1. CLAUDE.md          ← Loaded FIRST (project memory anchor)
2. .claude/settings.json   ← Merged with settings.local.json
3. Hooks registered      ← SessionStart, PreCompact
4. Skills discovered     ← .claude/skills/**/*.md
5. Agents discovered     ← .claude/agents/**/*.md
6. Commands discovered   ← .claude/commands/**/*.md
7. Rules loaded          ← .claude/rules/** (path-matched)
8. SessionStart hook runs
```

---

## 2. CLAUDE.md — LINE BY LINE

### The @ Syntax (Lines 9–11)

```markdown
@.claude/skills/VENOM/SKILL.md
@.claude/knowledge/profile.md
@.claude/knowledge/soul.md
```

**What it does:** The `@path` syntax **injects file contents** into the system prompt. When Claude Code loads CLAUDE.md, it resolves each `@` reference and concatenates that file's content into the context Claude sees.

**Mechanics:**
- `@` = "include this file's contents here"
- Path is relative to project root
- Loaded at session start, before any conversation
- These three files become part of the base context for every turn

**Why these three:** SKILL = how to be VENOM. profile = who Kariem is. soul = why VENOM thinks this way. Core identity stack.

---

### Critical Rules (Lines 13–20)

These are **constraints** — they don't trigger any code. Claude reads them and (ideally) obeys. They're behavioral guardrails.

| Line | Rule | Effect |
|------|------|--------|
| 15–16 | Answer first, earn every word | Shapes output style |
| 17 | Complete code only | Blocks TODO/placeholder output |
| 18 | Match the project | Triggers "read before write" behavior |
| 19 | Pushback is loyalty | Enables disagreeing when quality at stake |
| 20 | Never say X | Blocks filler phrases |

---

### When Compacting (Lines 21–30)

**Compaction** = when Claude's context window fills, it summarizes and prunes. The system asks: "What must survive?"

This section tells Claude: **when compacting, preserve these**. It's a PreCompact hook's companion — human-readable spec of what not to lose.

---

### Memory Path (Line 74)

```markdown
Update `~/.claude/projects/.../memory/MEMORY.md`
```

**Resolves to:** `C:\Users\karie\.claude\projects\v1\memory\MEMORY.md`

Claude Code maintains a **projects/** tree under `~/.claude/`. Each project (identified by path) gets its own memory. The workspace `c:\Users\karie\Desktop\v1` maps to project `v1`, hence `projects/v1/memory/MEMORY.md`.

**Note:** The project also has `.claude/projects/v1/memory/MEMORY.md` — that's workspace-local. The `~/.claude/` path is the **user-level** persistence. Both may exist; convention varies by setup.

---

## 3. settings.json — EVERY KEY

```json
{
  "model": "glm-4.7",
  "env": {...},
  "permissions": {...},
  "hooks": {...}
}
```

### model (Line 1)

**Current:** `"glm-4.7"`

**What it does:** Sets the default model for Claude Code in this project. Overrides user/global default.

**⚠️ Inconsistency:** identity.md was fixed to say Claude; settings still says GLM. If you're on Cursor, Cursor uses its own model (Claude). The `model` key might be Claude Code–specific when run standalone. Verify which takes precedence.

---

### env (Lines 2–8)

| Key | Value | Purpose |
|-----|-------|---------|
| ANTHROPIC_MODEL | glm-4.7 | Model override |
| CLAUDE_CODE_EFFORT_LEVEL | high | Reasoning depth |
| MAX_THINKING_TOKENS | 31999 | Extended thinking budget |
| CLAUDE_CODE_MAX_OUTPUT_TOKENS | 64000 | Max response length |
| CLAUDE_AUTOCOMPACT_PCT_OVERRIDE | 90 | Compact when context hits 90% |
| BASH_DEFAULT_TIMEOUT_MS | 120000 | 2 min timeout for Bash |

---

### permissions.allow (Lines 9–21)

**Format:** `"ToolName"` or `"Bash(pattern:*)"`

- `Bash(git:*)` = Bash allowed only for commands starting with `git`
- `Bash(npm:*)` = Only `npm` commands
- Restrictive patterns limit what Bash can run

**Merge order:** `settings.local.json` **adds** to this (doesn't replace). Local can add `Bash(python:*)`, `Bash(flask:*)`, etc.

---

### hooks.SessionStart (Lines 22–24)

```json
"SessionStart": [{
  "hooks": [{
    "type": "command",
    "command": "echo '{\"systemMessage\": \"VENOM online...\"}'",
    "timeout": 5
  }]
}]
```

**When it runs:** Start of every Claude Code session.

**What it does:** Runs the command. Stdout must be JSON. Claude Code parses it.

**Standard hook output format:**
```json
{
  "continue": true,
  "suppressOutput": false,
  "systemMessage": "Message injected into Claude's context"
}
```

The `echo` outputs a minimal JSON with `systemMessage`. That message is injected as system context — a reminder that VENOM is active, owner, standards.

**Missing:** `matcher` (defaults to `"*"`), `continue`, `suppressOutput` (default true/false per spec).

---

### hooks.PreCompact (Lines 25–27)

**When it runs:** Right before context compaction.

**What it does:** Injects a system message listing what to preserve: VENOM identity, task context, owner prefs, pushback protocol, etc. Claude reads this when deciding what to keep.

---

## 4. settings.local.json

**Purpose:** User-specific overrides. Typically in `.gitignore`.

**Merge:** Merged with settings.json. `permissions.allow` is additive. `outputStyle` can override.

**Your local adds:** More Bash patterns (python, flask, mysql, etc.), Firecrawl MCP scrape, `outputStyle: "default"`.

---

## 5. SKILL.md — FRONTMATTER

```yaml
name: VENOM
description: "..."        # Shown in skill picker, used for auto-invocation
argument-hint: "[mode]"   # Hint when user types /VENOM
user-invocable: true      # Can be invoked via /VENOM or natural language
allowed-tools: [...]      # Restricts tools WHEN skill is explicitly invoked
```

**allowed-tools vs permissions:** 
- `permissions` in settings = global for the project
- `allowed-tools` in skill = applied when that skill is the active context
- Skill restrictions can be tighter than project permissions

**ultrathink (Line 26):** Special marker. Tells Claude Code to use extended reasoning for this skill. More thinking tokens.

---

## 6. COMMANDS — FRONTMATTER

| Field | Purpose |
|-------|---------|
| description | Shown in / menu |
| allowed-tools | Restricts tools during command execution |
| alwaysApply | false = only when /command is used |
| priority | Menu ordering (higher = more prominent) |
| command | Slash name (vd, vr, v-learn) |
| version | Metadata |

**Commands as prompts:** The markdown body is the **prompt** injected when you run `/vd`, `/vr`, etc. It replaces/adds to the current conversation context with the command's instructions.

---

## 7. AGENTS — FRONTMATTER

| Field | Purpose |
|-------|---------|
| name | Used for Task(agent-name) |
| description | Shown when picking agent |
| tools | What the agent CAN use |
| disallowedTools | Explicit blocks |
| model | opus vs sonnet for that agent |
| memory | project = shared, user = personal |

**How agents are invoked:** `Task(venom-researcher)` or "Use venom-architect to design this". Claude Code maps the name to the agent file and spawns a subagent with that file as system prompt.

**memory: project:** Subagent's learnings persist to project memory, visible to other agents and main Claude.

---

## 8. RULES — paths FRONTMATTER

```yaml
paths:
  - ".claude/skills/**"
  - ".claude/agents/**"
  - ".claude/commands/**"
  - ".claude/rules/**"
```

**What it does:** This rule applies **only when** the user is working on files matching these paths. Path-specific rules load conditionally.

**venom-standards.md:** No `paths` = **universal**. Always loaded for any file in the project.

---

## 9. KNOWLEDGE FILES

Files in `.claude/knowledge/` are **not auto-loaded** by default. They're loaded when:

1. **Referenced by @ in CLAUDE.md** — profile.md, soul.md are
2. **Referenced in a command/skill** — e.g. `@.claude/knowledge/modes.md`
3. **Explicitly read** — Claude reads them when instructed

So: capabilities.md, cognitive-matrix.md, first-message.md, modes.md, user-profile.md — loaded on demand, not at session start, unless something @'s them.

---

## 10. THE FLOW — SESSION START TO RESPONSE

```
1. Session opens
2. CLAUDE.md loaded → @references resolved → SKILL, profile, soul injected
3. settings.json + settings.local.json merged
4. Hooks registered
5. SessionStart hook runs → echo JSON → systemMessage injected
6. Claude now has: CLAUDE.md + 3 @files + SessionStart message
7. User sends message
8. Claude matches skills/commands (description, triggers)
9. If /venom: command content injected
10. If "venom" in message: VENOM skill may auto-invoke
11. Claude responds with combined context
12. If Task(venom-X): subagent spawned with agent file as prompt
13. Subagent result returns to main thread
14. When context fills: PreCompact runs → preservation message injected → compaction
```

---

## 11. KEY MECHANICS

| Mechanic | How It Works |
|----------|--------------|
| **@file** | File content inlined at load/resolution time |
| **!`command`** | Bash runs, output inlined (in skills/commands) |
| **Task(agent)** | Spawns subagent with agent's md as system prompt |
| **Hook output** | JSON on stdout: systemMessage, continue, etc. |
| **Path rules** | Rule applies only when active file matches paths |
| **memory: project** | Agent writes to shared project memory |

---

## 12. WHAT'S NOT DOCUMENTED HERE

- Exact precedence: Cursor model vs settings.json model
- Whether `.claude/projects/v1/` is workspace or user-level
- Full list of hook event types and their I/O
- Skill auto-invocation matching algorithm

---

*Generated 2026-02-15. VENOM self-knowledge.*

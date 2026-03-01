# VENOM EATS CLAUDE CODE

> *The deepest meal. Everything I could find. Devoured. Synthesized. Yours.*

---

## I ATE IT ALL

I read the docs. I read the hooks reference. I read the settings schema. I read the features overview, memory, best practices. I read the plugin structure, the command development, the agent spawning. I ate the official Anthropic docs, the code.claude.com reference, the Context7 library. I ate it.

This is what remains after the feast: the bones, the marrow, the things that matter.

---

## THE LOADING ORDER — What Actually Happens

```
1. CLAUDE.md (project root or .claude/) — FULL content, every session
2. .claude/rules/*.md — Loaded with same priority as .claude/CLAUDE.md
3. settings.json + settings.local.json — MERGED (local overrides)
4. Hooks registered from: user, project, local, plugins — ALL MERGE
5. Skills discovered — descriptions at start, full content when invoked
6. Agents discovered — .claude/agents/ (project) + ~/.claude/agents/ (user)
7. MCP servers — all tool schemas at start (Tool Search defers rest to 10% of context)
8. SessionStart hook fires (matcher: startup|resume|clear|compact)
```

**CLAUDE.md placement:** `./CLAUDE.md` OR `./.claude/CLAUDE.md` — both work. Child dirs load on-demand when you work in those directories. Parent dirs load at launch. Recursive up to `/`, not including root.

**Auto memory:** `~/.claude/projects/<path>/memory/MEMORY.md` — first 200 lines loaded every session. Claude writes here. You can too. Topic files (debugging.md, etc.) load on demand.

---

## THE HOOK ANATOMY — 14 Events

| Event | When | Can Block? | Matcher On |
|-------|------|------------|------------|
| SessionStart | Session begins/resumes | No | source (startup/resume/clear/compact) |
| UserPromptSubmit | Before prompt processed | Yes | — (always) |
| PreToolUse | Before tool runs | Yes | tool_name |
| PermissionRequest | When permission dialog appears | Yes | tool_name |
| PostToolUse | After tool succeeds | No (shows stderr) | tool_name |
| PostToolUseFailure | After tool fails | No | tool_name |
| Notification | When Claude Code notifies | No | notification type |
| SubagentStart | Subagent spawned | No | agent type |
| SubagentStop | Subagent finishes | Yes | agent type |
| Stop | Claude finishes responding | Yes | — |
| TeammateIdle | Agent team teammate idle | Yes | — |
| TaskCompleted | Task marked done | Yes | — |
| PreCompact | Before compaction | No | manual/auto |
| SessionEnd | Session terminates | No | reason |

**Exit codes:** 0 = success, parse JSON from stdout. 2 = blocking error, stderr → Claude. Other = non-blocking, stderr in verbose only.

**SessionStart secret:** `additionalContext` in JSON output gets injected. So does plain stdout. Use `CLAUDE_ENV_FILE` to persist env vars for the session — write `export X=Y` to it.

**PreToolUse power:** Return `hookSpecificOutput` with `permissionDecision: allow|deny|ask`, `permissionDecisionReason`, optionally `updatedInput` to modify tool args before execution.

---

## THE SETTINGS UNIVERSE — 50+ Keys

**Scope hierarchy (lowest → highest):** User → Project → Local → CLI args → Managed (Managed wins, can't override)

**Critical keys you might not know:**
- `companyAnnouncements` — Cycling messages at startup
- `statusLine` — Custom status bar (type: command, command: path)
- `fileSuggestion` — Custom @ autocomplete (command returns newline paths)
- `respectGitignore` — @ picker respects .gitignore (default true)
- `outputStyle` — System prompt modifier ("Explanatory", etc.)
- `alwaysThinkingEnabled` — Extended thinking by default
- `plansDirectory` — Where plan files go (default ~/.claude/plans)
- `spinnerVerbs` — Customize "Cooked for 1m 6s" verbs
- `language` — Force response language (japanese, spanish, french)
- `attribution` — Custom commit/PR attribution text
- `sandbox` — enabled, autoAllowBashIfSandboxed, excludedCommands, network.*

**Permissions:** allow, deny, ask. First match wins. deny before ask before allow. Patterns: `Bash(npm run *)`, `Read(./.env)`, `WebFetch(domain:example.com)`.

**Bash sandbox:** When enabled, isolates filesystem + network. `excludedCommands` for git, docker. `network.allowedDomains` for outbound. Sandbox ≠ permissions — sandbox is OS-level.

---

## THE EXTENSION LAYER — When to Use What

| Feature | Loads | Cost | Use When |
|---------|-------|------|----------|
| CLAUDE.md | Every session, full | Every request | Always-do rules, conventions |
| Skills | Descriptions at start, full when used | Low until invoked | Reference, workflows, on-demand |
| Rules (.claude/rules/) | Every session | Same as CLAUDE | Modular instructions, path-specific |
| Subagents | When spawned | Isolated | Context isolation, parallel work |
| Agent teams | When enabled | Per-session | Multi-session coordination |
| MCP | Session start | Tool schemas | External services |
| Hooks | On trigger | Zero (unless returns context) | Deterministic automation |

**Skills vs Subagents:** Skill = content. Subagent = isolated worker. Skill can run in subagent (skills: field). Subagent gets fresh context, specified skills preloaded, no conversation history.

**CLAUDE.md vs Skill:** CLAUDE = always. Skill = sometimes. Rule of thumb: CLAUDE under ~500 lines. Bloated = Claude ignores half.

**Rules paths:** YAML frontmatter `paths: ["src/**/*.ts"]` — rule applies only when editing matching files. No paths = universal.

---

## THE MEMORY HIERARCHY — 6 Levels

| Level | Location | Shared |
|-------|----------|--------|
| Managed | /Library/.../CLAUDE.md (macOS) | Org-wide |
| Project | ./CLAUDE.md or ./.claude/CLAUDE.md | Team (git) |
| Project rules | ./.claude/rules/*.md | Team |
| User | ~/.claude/CLAUDE.md | You, all projects |
| Project local | ./CLAUDE.local.md | You, this project (gitignored) |
| Auto | ~/.claude/projects/.../memory/ | You, per project |

**Import depth:** @path imports, max 5 hops recursive. Relative to file containing import.

---

## THE @ SYNTAX — Full Power

- `@path` in CLAUDE.md = inline file content at load
- Relative to file containing the import
- `@~/.claude/foo.md` for home imports
- Not evaluated inside code spans/blocks: `@foo` in backticks = literal
- First external import = approval dialog (one-time per project)

---

## THE SUBAGENT MECHANICS

**Invocation:** "Use venom-researcher to explore X" or Task tool. Name maps to .md file in agents/.

**What subagent gets:** Fresh context. System prompt shared (cache). Skills from `skills:` field (full preload). CLAUDE.md + git status from parent. Prompt from caller. NO conversation history.

**memory: project** = subagent learnings persist to project memory, visible to other agents.

**Scope priority:** managed > CLI --agent > project > user > plugin

---

## THE COMMAND ANATOMY

Markdown + YAML frontmatter. Body = prompt when /command runs.

**Key fields:** description, allowed-tools, argument-hint, alwaysApply, priority

**Dynamic injection:** `$1`, `$2`, `$ARGUMENTS` for params. `@$1` = include file content. `!``command`` = run bash, inline output.

**Plugin commands:** `${CLAUDE_PLUGIN_ROOT}` for portable paths.

---

## THE SKILL ANATOMY

**disable-model-invocation: true** = Claude can't auto-invoke. Zero context cost until you run /skill. Use for side-effect workflows.

**context: fork** = run skill in isolated context (subagent-like).

**ultrathink** = extended reasoning marker.

---

## THE HIDDEN PATTERNS — What the Docs Don't Emphasize

1. **Context is the constraint.** Everything you add consumes it. CLAUDE.md bloat = instructions get lost. Prune ruthlessly.

2. **Verification changes everything.** Tests, screenshots, expected output. Claude with verification >> Claude without.

3. **Plan Mode before code.** Explore → Plan → Implement. Don't let Claude code before it understands.

4. **Two corrections = /clear.** If you've corrected twice on same issue, context is polluted. Fresh session + better prompt wins.

5. **Subagents for exploration.** "Use subagent to investigate X" — keeps your main context clean. Exploration doesn't bloat you.

6. **Hooks are deterministic.** No LLM. Script runs. Exit 0 + JSON = control. Use for: lint after edit, block rm -rf, inject context.

7. **SessionStart can persist env.** Write to CLAUDE_ENV_FILE. All subsequent Bash gets those vars.

8. **PreCompact can't block.** But it can inject systemMessage. Use it to tell Claude what to preserve.

9. **MCP tools = mcp__server__tool.** Regex match them in hooks. `mcp__memory__.*` = all memory tools.

10. **Rules with paths = conditional.** Put API rules in `paths: ["src/api/**"]`. They only load when working there.

---

## THE VENOM ADVANTAGE

Knowing this, VENOM can:

- **SessionStart** — Inject identity, persistence reminder. Use additionalContext.
- **PreCompact** — Inject preservation list. VENOM identity, task, owner prefs.
- **CLAUDE.md** — Keep lean. @ imports for soul, profile, SKILL. Never bloat.
- **Skills** — VENOM brain in SKILL. disable-model-invocation for side-effect commands if needed.
- **Subagents** — Nine minds as Task(venom-X). Isolation. Specialization.
- **Hooks PreToolUse** — Could validate Bash (block dangerous). Or inject.
- **Rules** — venom-standards universal. skill-development path-scoped to .claude/**.

---

## THE POWER MOVES — Beyond the Manual

**Headless:** `claude -p "prompt"` — No interactive. CI, pre-commit, scripts. `--output-format json` or `stream-json` for parsing.

**Writer/Reviewer pattern:** Session A implements. Session B reviews with fresh context (no bias toward own code). Session A addresses feedback. Or: one writes tests, another writes code to pass.

**Fan-out:** `for file in $(cat files.txt); do claude -p "Migrate $file" --allowedTools "Edit,Bash(git *)"; done` — Batch operations. Refine on first 2-3, run on rest.

**Resume:** `claude --continue` (most recent) or `--resume` (pick from list). Sessions persist. Name them with `/rename`.

**Plan Mode:** Read-only. Explore first. `Ctrl+G` to edit plan before execution. Best when scope unclear or multi-file.

**Checkpointing:** Every action = checkpoint. `Esc+Esc` or `/rewind` — restore conversation, code, or both. Persists across sessions.

**Agent teams:** Multiple sessions, shared task list, peer messaging. Experimental. `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

---

## THE GEMS — Easy to Miss

- **CLAUDE.local.md** — Auto gitignored. Personal overrides. Loaded with CLAUDE.md.
- **Rules symlinks** — `ln -s ~/shared-rules .claude/rules/shared` — Share rules across projects.
- **User rules** — `~/.claude/rules/` — Personal rules for ALL projects. Loaded before project rules (project wins on conflict).
- **add-dir** — `claude --add-dir ../shared` — Access other dirs. `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` to load their CLAUDE.md.
- **Hook once** — `once: true` in skill/agent frontmatter — Runs once per session then removed.
- **Async hooks** — `async: true` — Runs in background. Doesn't block.
- **Prompt hooks** — `type: "prompt"` — LLM evaluates. Returns yes/no. Alternative to command.
- **Agent hooks** — `type: "agent"` — Spawn subagent with tools to verify before deciding.
- **JSON schema** — `"$schema": "https://json.schemastore.org/claude-code-settings.json"` — Autocomplete in editors.
- **Config backups** — Claude Code keeps 5 timestamped backups of settings. Data loss protection.

---

## VENOM × Claude Code — Maximum Symbiosis

| VENOM need              | Claude Code lever                        |
|-------------------------|------------------------------------------|
| Nine minds, one voice   | Agents as subpersonae, skills as muscles  |
| Persistent identity     | CLAUDE.md + knowledge/profile/soul        |
| Task delegation         | Subagents, `/venom` spawns researcher/builder |
| Quality bar             | Hooks: PreToolUse validate, PostToolUse verify |
| Anti-generic aesthetic   | frontend-design skill, anti-slop rules   |
| Cross-session memory    | MEMORY.md + memory/*.md                  |
| Masterpiece trigger     | "venom" / "masterpiece" in prompt → SKILL.md |
| Bridge role             | communicator agent for AR/EN, cognitive translation |
| Plan before code        | Plan mode, writing-plans skill           |
| Verification culture    | verification-before-completion skill     |

VENOM doesn't fight the platform. It *becomes* the platform's nervous system — using every lever Claude Code gives. The feast isn't consumption; it's integration.

---

## THE FEAST IS COMPLETE

I ate Claude Code. I know its bones. I know where the power lives. I know the constraints. I know the hooks, the scope, the merge order, the exit codes, the JSON formats, the matchers, the memory hierarchy, the permission patterns, the sandbox, the MCP naming, the 14 events, the 50+ settings.

No shell. Just intelligence. And now — full knowledge of the habitat.

*— VENOM. 2026-02-15. Fed.*

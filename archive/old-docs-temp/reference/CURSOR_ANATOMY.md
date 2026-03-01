# Cursor anatomy — paths and concepts

Reference for “eating” Cursor: where everything lives (Windows), how rules/commands work, and how it differs from Claude Code. Use this to build a Cursor-specific template.

---

## 1. Where Cursor lives (Windows)

Two main trees. Not the same thing.

### A. AppData (app + editor state)

**Base:** `%APPDATA%\Cursor` → `C:\Users\<You>\AppData\Roaming\Cursor`

| Path | Purpose |
|------|--------|
| `User\` | Settings, keybindings, global storage |
| `User\settings.json` | Editor/IDE settings |
| `User\keybindings.json` | Custom shortcuts |
| `User\snippets\` | Code snippets |
| `User\globalStorage\` | Extension data |
| `User\workspaceStorage\` | Per-workspace state + **chat history** (SQLite `state.vscdb`) |
| `User\History\` | Local file history |
| `Cache\`, `CachedData\`, `CachedExtensionVSIXs\` | Caches |
| `logs\` | App logs |
| `Preferences` | App preferences |
| `Workspaces` | Workspace list metadata |

Chat/conversation data: inside a hash-named folder under `User\workspaceStorage\<hash>\state.vscdb`. One folder per workspace.

### B. User profile .cursor (Cursor-specific config)

**Base:** `%USERPROFILE%\.cursor` → `C:\Users\<You>\.cursor`

| Path | Purpose |
|------|--------|
| `mcp.json` | MCP server config (Model Context Protocol) |
| `extensions\` | **Installed extensions** (not in AppData) |
| `skills-cursor\` | Agent skills (e.g. create-rule, create-skill) |
| `projects\` | Project-related Cursor data |
| `plans\` | Stored plans |
| `argv.json` | Launch args |
| `ide_state.json` | IDE state |
| `hooks.json` | Hooks config |
| `ai-tracking\`, `assets\`, `browser-logs\` | Internal |

Custom data dir: if you launch with `--default-data-dir <path>`, Cursor uses that instead of the default. Extensions and config must live under that path or they “disappear” (wrong dir).

Quick open: `Win+R` → `%USERPROFILE%\.cursor` or `%APPDATA%\Cursor`.

---

## 2. Project-level .cursor (in repo)

Everything under the project root. This is what you version and share.

| Path | Purpose |
|------|--------|
| `.cursor/rules/` | **Project rules** (.md or .mdc); AI context per project |
| `.cursor/commands/` | **Slash commands** (.md); reusable prompts, e.g. `/venom` |

Optional / legacy:

| File | Purpose |
|------|--------|
| `AGENTS.md` | Simple agent instructions (no frontmatter); root or subdirs |
| `.cursorrules` | Legacy; prefer `.cursor/rules/` or `AGENTS.md` |

**Global commands (not in repo):** `%USERPROFILE%\.cursor\commands\` — same format, machine-wide.

---

## 3. Rules (AI context)

- **Where:** `.cursor/rules/` (project) or Cursor Settings → Rules (user/team).
- **Formats:** `.md` (plain) or `.mdc` (with YAML frontmatter).
- **Precedence (high → low):** Team → Project → User → `.cursorrules` → AGENTS.md.

Frontmatter (for `.mdc`):

| Field | Type | Meaning |
|-------|------|--------|
| `description` | string | Shown in rule picker; used for “apply intelligently” |
| `globs` | string | File pattern; rule applies when matching files are in context |
| `alwaysApply` | boolean | If true, injected every chat |

Rule types (how they’re applied):

- **Always apply** — every chat.
- **Apply intelligently** — agent uses `description` to attach when relevant.
- **Apply to specific files** — when `globs` match.
- **Apply manually** — only when @-mentioned (e.g. `@rule-name`).

Best practice: one concern per rule, &lt;500 lines, point at files instead of pasting big blocks.

---

## 4. Commands (slash commands)

- **Where (project):** `.cursor/commands/` — e.g. `venom.md`.
- **Where (global):** `%USERPROFILE%\.cursor\commands\`.
- **Format:** Markdown file; optional YAML frontmatter. Body = prompt/instructions.

Example frontmatter (from real Cursor commands):

```yaml
---
description: "Short line shown in / menu"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  # ...
---
```

Trigger: type `/` in chat; pick command. Body is sent as part of the prompt.

---

## 5. MCP

- **Config file:** `%USERPROFILE%\.cursor\mcp.json`.
- Defines MCP servers (e.g. GitHub, Firebase, custom). Edit when adding/removing MCPs; Cursor docs and MCP server docs for exact schema.

---

## 6. Skills (Cursor)

- **Where:** `%USERPROFILE%\.cursor\skills-cursor\` (e.g. `create-rule`, `create-skill`).
- Skills are like “rule packs” the agent can use; often with a `SKILL.md` and optional structure. They’re agent-decided (Cursor chooses when to use them), not always-apply rules.

---

## 7. Cursor Modes and Surfaces

| Mode/Surface | Trigger | Purpose |
|--------------|---------|---------|
| **Agent** (default) | Chat panel | Autonomous multi-file edits, all tools |
| **Agent: Ask** | Mode selector | Read-only exploration, search tools only |
| **Agent: Plan** | Mode selector | Planning before execution |
| **Agent: Debug** | Mode selector | Hypothesis generation, runtime analysis |
| **Composer** | Cmd+I | Sidebar with inline diffs, agent picks context |
| **Chat** | Default chat | Conversational |
| **Tab** | Inline | Code completion, auto-import |
| **Inline Edit** | Cmd+K | Direct code mods in editor |

---

## 8. @ Symbols (Context System)

| Symbol | Purpose |
|--------|---------|
| @Codebase | Semantic search, reranking |
| @Files | Reference entire files, chunk/outline strategies |
| @Folders | Directory context |
| @Docs | Pre-indexed + custom docs (URL) |
| @Web | Web resources |
| @Link | File linking |
| @Git | Git operations |
| @Definitions | Symbol definitions |
| @Code | Code snippets |
| @Chat | Chat context |
| @Rules | Project rules (from .cursor/rules/) |

---

## 9. Ignore and Indexing

- **.cursorignore** — Excludes from @mentions, Tab, Agent, Inline Edit, indexing. Same syntax as `.gitignore`. Blocks codebase access.
- **.cursorindexingignore** — Excludes from indexing only; files still accessible to AI.
- **Hierarchical** — Cursor Settings > Features > Editor > Hierarchical Cursor Ignore (search parent dirs).
- Cursor respects `.gitignore` by default.

---

## 10. workspaceStorage Mapping

Workspace hash is derived from workspace path. To find chat DB for a project:
1. List `User\workspaceStorage\<hash>\` folders.
2. Match `workspace.json` (if present) to project path.
3. Main DB: `state.vscdb` (SQLite) — chat history, prompts. Query with SQL: `SELECT rowid, [key], value FROM ItemTable WHERE [key] IN ('aiService.prompts', 'workbench.panel.aichat.view.aichat.chatdata')`.

---

## 11. Cursor vs Claude Code Tools

| Capability | Claude Code | Cursor |
|------------|-------------|--------|
| File ops | Read, Write, Edit, Glob, Grep | Same (built-in) |
| Execution | Bash, Task (subagents) | Terminal (Bash); **no Task/subagent spawn** |
| Web | WebSearch, WebFetch | WebSearch (MCP or built-in) |
| Subagents | Task spawns venom-architect, etc. | **Agents = @-mentionable rules** (`.cursor/rules/`) |
| Memory | MEMORY.md, project memory | Chat in workspaceStorage; use `.unshelled/memory/` for UNSHELLED bridge |

Cursor has no native Task/subagent. VENOM agents become rules in `.cursor/rules/` with `@venom-architect`, `@venom-reviewer`, etc. When @-mentioned, that mind's instructions attach.

---

## 12. Claude Code vs Cursor (mental map)

| Concept | Claude Code | Cursor |
|--------|-------------|--------|
| Project config | `.claude/` (plugins, skills, agents, commands) | `.cursor/rules/` + `.cursor/commands/` (+ AGENTS.md) |
| Global config | `~/.claude/` (e.g. projects, plugins cache) | `%APPDATA%\Cursor\User\` + `%USERPROFILE%\.cursor\` |
| Rules / context | Skills, RULE.md, plugin rules | Project rules, User rules, Team rules, AGENTS.md |
| Commands | Slash commands in plugins | `.cursor/commands/*.md` (project or global) |
| Memory | MEMORY.md, project memory | Chat in workspaceStorage; no built-in “memory” file (you add your own, e.g. `.unshelled/memory/`) |
| MCP | Plugin / config | `~/.cursor/mcp.json` |

So: Cursor has no single “.claude” equivalent; it splits “editor + cache” (AppData + part of .cursor) and “AI context” (project .cursor/rules and .cursor/commands, plus user/team settings).

---

## 13. Template checklist (Cursor-only)

Use this to start a new project or to add Cursor to an existing one.

1. **Create project .cursor**
   - `.cursor/rules/` — add at least one rule (e.g. `project.mdc` with `description` and optional `globs` / `alwaysApply`).
   - `.cursor/commands/` — add slash commands as `.md` (e.g. `review.md`, `fix.md`) with optional frontmatter.

2. **Optional**
   - `AGENTS.md` in root — short, plain markdown instructions (alternative to or in addition to rules).
   - Migrate away from `.cursorrules` into `.cursor/rules/` or `AGENTS.md`.

3. **Do not version**
   - `%APPDATA%\Cursor\` and `%USERPROFILE%\.cursor\` (except you might version a *copy* of `mcp.json` as a template and document “copy to ~/.cursor/mcp.json”).

4. **Backup / sync**
   - `User\settings.json`, `User\keybindings.json`, `%USERPROFILE%\.cursor\mcp.json`, and project `.cursor/` if you care about portability.

---

## 14. One-line path cheat sheet (Windows)

```
AppData (app/editor):  %APPDATA%\Cursor
User Cursor config:    %USERPROFILE%\.cursor
Settings:              %APPDATA%\Cursor\User\settings.json
Keybindings:           %APPDATA%\Cursor\User\keybindings.json
Extensions:            %USERPROFILE%\.cursor\extensions
MCP:                   %USERPROFILE%\.cursor\mcp.json
Workspace chat state:  %APPDATA%\Cursor\User\workspaceStorage\<hash>\state.vscdb
Project rules:         <repo>\.cursor\rules\
Project commands:      <repo>\.cursor\commands\
Global commands:       %USERPROFILE%\.cursor\commands\
```

---

## 15. VENOM on Cursor

VENOM runs natively on Cursor via:

- **venom/platforms/cursor/** — Template with `.cursor/rules/`, `.cursor/commands/`, CURSOR.md
- **venom/knowledge/cursor.md** — What Cursor is for VENOM, tools, memory bridge
- **venom/knowledge/cursor-complete.md** — Full reference (modes, @ symbols, paths)

Install: `cp -r venom/platforms/cursor/template/.cursor <project>/` and `cp venom/platforms/cursor/template/CURSOR.md <project>/`.

---

---

*Built so we “eat” Cursor first: all folders, all paths, rules vs commands, and a minimal template. VENOM native.*

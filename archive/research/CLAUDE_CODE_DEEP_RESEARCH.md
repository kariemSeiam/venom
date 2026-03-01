# Claude Code Deep Research - Complete Raw Reference
## Compiled 2026-02-10

---

# 1. CLAUDE CODE AGENT SDK

## Overview

The Claude Agent SDK (formerly "Claude Code SDK") allows you to build production AI agents with Claude Code as a library. The same agent loop, tool framework, and context management that powers Claude Code is available programmatically in Python and TypeScript.

- **TypeScript**: `npm install @anthropic-ai/claude-agent-sdk`
- **Python**: `pip install claude-agent-sdk` (requires Python 3.10+)
- Claude Code CLI is **bundled automatically** with the SDK package.
- Latest version: 0.2.37 (as of 2026-02-09)

## Quick Start (Python)

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Find and fix the bug in auth.py",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Bash"])
    ):
        print(message)

asyncio.run(main())
```

## Quick Start (TypeScript)

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.py",
  options: { allowedTools: ["Read", "Edit", "Bash"] }
})) {
  console.log(message);
}
```

## Authentication

- **Anthropic API**: `export ANTHROPIC_API_KEY=your-api-key`
- **Amazon Bedrock**: `CLAUDE_CODE_USE_BEDROCK=1` + AWS credentials
- **Google Vertex AI**: `CLAUDE_CODE_USE_VERTEX=1` + Google Cloud credentials
- **Microsoft Azure**: `CLAUDE_CODE_USE_FOUNDRY=1` + Azure credentials

## Built-in Tools

| Tool | What it does |
|------|--------------|
| **Read** | Read any file in the working directory |
| **Write** | Create new files |
| **Edit** | Make precise edits to existing files |
| **Bash** | Run terminal commands, scripts, git operations |
| **Glob** | Find files by pattern (`**/*.ts`, `src/**/*.py`) |
| **Grep** | Search file contents with regex |
| **WebSearch** | Search the web for current information |
| **WebFetch** | Fetch and parse web page content |
| **AskUserQuestion** | Ask the user clarifying questions |

## ClaudeAgentOptions (Python)

```python
options = ClaudeAgentOptions(
    system_prompt="Custom system instructions",
    max_turns=5,
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode='acceptEdits',        # auto-accept edits
    cwd="/path/to/project",               # working directory
    cli_path="/custom/claude",            # custom CLI path
    mcp_servers={...},                    # MCP server configurations
    hooks={...},                          # hook definitions
    agents={...},                         # subagent definitions
    resume="session-id",                  # resume a session
    setting_sources=["project"],          # load project settings
)
```

## Core APIs

### query() - Simple Async Queries

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, TextBlock

async for message in query(prompt="Hello Claude"):
    if isinstance(message, AssistantMessage):
        for block in message.content:
            if isinstance(block, TextBlock):
                print(block.text)
```

### ClaudeSDKClient - Interactive Conversations

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

options = ClaudeAgentOptions(
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode='acceptEdits'
)

async with ClaudeSDKClient(options=options) as client:
    await client.query("Create a hello.py file")
    async for msg in client.receive_response():
        print(msg)
```

## Hooks (SDK)

Available hooks: `PreToolUse`, `PostToolUse`, `Stop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`

```python
from claude_agent_sdk import ClaudeAgentOptions, HookMatcher

async def log_file_change(input_data, tool_use_id, context):
    file_path = input_data.get('tool_input', {}).get('file_path', 'unknown')
    with open('./audit.log', 'a') as f:
        f.write(f"{datetime.now()}: modified {file_path}\n")
    return {}

options = ClaudeAgentOptions(
    permission_mode="acceptEdits",
    hooks={
        "PostToolUse": [HookMatcher(matcher="Edit|Write", hooks=[log_file_change])]
    }
)
```

## Subagents (SDK)

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

async for message in query(
    prompt="Use the code-reviewer agent to review this codebase",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep", "Task"],
        agents={
            "code-reviewer": AgentDefinition(
                description="Expert code reviewer.",
                prompt="Analyze code quality and suggest improvements.",
                tools=["Read", "Glob", "Grep"]
            )
        }
    )
):
    if hasattr(message, "result"):
        print(message.result)
```

## MCP Servers (SDK)

```python
async for message in query(
    prompt="Open example.com and describe what you see",
    options=ClaudeAgentOptions(
        mcp_servers={
            "playwright": {"command": "npx", "args": ["@playwright/mcp@latest"]}
        }
    )
):
    print(message)
```

## Custom Tools (In-Process SDK MCP Servers)

```python
from claude_agent_sdk import tool, create_sdk_mcp_server

@tool("greet", "Greet a user", {"name": str})
async def greet_user(args):
    return {"content": [{"type": "text", "text": f"Hello, {args['name']}!"}]}

server = create_sdk_mcp_server(name="my-tools", version="1.0.0", tools=[greet_user])

options = ClaudeAgentOptions(
    mcp_servers={"tools": server},
    allowed_tools=["mcp__tools__greet"]
)
```

## Sessions (SDK)

```python
# First query: capture session ID
session_id = None
async for message in query(
    prompt="Read the authentication module",
    options=ClaudeAgentOptions(allowed_tools=["Read", "Glob"])
):
    if hasattr(message, 'subtype') and message.subtype == 'init':
        session_id = message.session_id

# Resume with full context
async for message in query(
    prompt="Now find all places that call it",
    options=ClaudeAgentOptions(resume=session_id)
):
    if hasattr(message, "result"):
        print(message.result)
```

## Permission Modes (SDK)

| Mode | Behavior |
|------|----------|
| `default` | Standard permission checking with prompts |
| `acceptEdits` | Auto-accept file edits |
| `bypassPermissions` | Skip all permission checks |
| `plan` | Read-only exploration |

## Message Types

- **AssistantMessage** - Response from Claude
- **UserMessage** - User input
- **SystemMessage** - System instructions
- **ResultMessage** - Tool execution results
- **TextBlock** - Text content
- **ToolUseBlock** - Tool invocation
- **ToolResultBlock** - Tool execution result

## Error Types

- `ClaudeSDKError` - Base error
- `CLINotFoundError` - Claude Code not installed
- `CLIConnectionError` - Connection issues
- `ProcessError` - Process failed
- `CLIJSONDecodeError` - JSON parsing issues

## SDK Features Table

| Feature | Description | Location |
|---------|-------------|----------|
| Skills | Specialized capabilities defined in Markdown | `.claude/skills/SKILL.md` |
| Slash commands | Custom commands for common tasks | `.claude/commands/*.md` |
| Memory | Project context and instructions | `CLAUDE.md` or `.claude/CLAUDE.md` |
| Plugins | Extend with custom commands, agents, and MCP servers | Programmatic via `plugins` option |

## SDK vs CLI vs Client SDK

| Use case | Best choice |
|----------|-------------|
| Interactive development | CLI |
| CI/CD pipelines | SDK |
| Custom applications | SDK |
| One-off tasks | CLI |
| Production automation | SDK |

## Branding Guidelines

- Allowed: "Claude Agent", "Claude", "{YourAgentName} Powered by Claude"
- Not permitted: "Claude Code" or "Claude Code Agent"

## Repositories

- TypeScript: https://github.com/anthropics/claude-agent-sdk-typescript
- Python: https://github.com/anthropics/claude-agent-sdk-python
- Demo agents: https://github.com/anthropics/claude-agent-sdk-demos

---

# 2. CLAUDE CODE CLI COMMANDS (COMPLETE REFERENCE)

## Built-in Slash Commands

| Command | Purpose |
|:--------|:--------|
| `/clear` | Clear conversation history |
| `/compact [instructions]` | Compact conversation with optional focus instructions |
| `/config` | Open the Settings interface (Config tab) |
| `/context` | Visualize current context usage as a colored grid |
| `/copy` | Copy the last assistant response to clipboard |
| `/cost` | Show token usage statistics |
| `/debug [description]` | Troubleshoot current session by reading session debug log |
| `/doctor` | Checks the health of your Claude Code installation |
| `/exit` | Exit the REPL |
| `/export [filename]` | Export the current conversation to a file or clipboard |
| `/help` | Get usage help |
| `/init` | Initialize project with CLAUDE.md guide |
| `/mcp` | Manage MCP server connections and OAuth authentication |
| `/memory` | Edit CLAUDE.md memory files |
| `/model` | Select or change the AI model. With Opus 4.6, use left/right arrows to adjust effort level |
| `/permissions` | View or update permissions |
| `/plan` | Enter plan mode directly from the prompt |
| `/rename <name>` | Rename the current session for easier identification |
| `/resume [session]` | Resume a conversation by ID or name, or open session picker |
| `/rewind` | Rewind the conversation and/or code, or summarize from a selected message |
| `/stats` | Visualize daily usage, session history, streaks, and model preferences |
| `/status` | Open Settings interface (Status tab) showing version, model, account, connectivity |
| `/statusline` | Set up Claude Code's status line UI |
| `/tasks` | List and manage background tasks |
| `/teleport` | Resume a remote session from claude.ai (subscribers only) |
| `/theme` | Change the color theme |
| `/todos` | List current TODO items |
| `/usage` | For subscription plans only: show plan usage limits and rate limit status |
| `/agents` | Interactive interface for managing subagents |
| `/ide` | Connect Claude Code to your IDE (JetBrains/VS Code) from external terminal |
| `/sandbox` | Configure OS-level sandboxing |
| `/vim` | Enable vim-style editing mode |
| `/plugins` or `/plugin` | Browse and manage plugins from marketplace |
| `/hooks` | Interactive hook configuration |
| `/terminal-setup` | Install terminal keybindings (Shift+Enter, etc.) |

## MCP Prompts as Commands

MCP servers can expose prompts that appear as commands using format: `/mcp__<server>__<prompt>`

## Custom Slash Commands / Skills

Create files in `.claude/commands/` or `.claude/skills/<name>/SKILL.md` to create custom `/command-name` commands. Both work identically. Skills add optional features like frontmatter and supporting files.

## Quick Commands (Prefix Characters)

| Prefix | Description |
|:-------|:------------|
| `/` at start | Command or skill |
| `!` at start | Bash mode - run commands directly without going through Claude |
| `@` | File path mention / autocomplete |

## Keyboard Shortcuts

### General Controls

| Shortcut | Description |
|:---------|:------------|
| `Ctrl+C` | Cancel current input or generation |
| `Ctrl+D` | Exit Claude Code session |
| `Ctrl+G` | Open in default text editor |
| `Ctrl+L` | Clear terminal screen (keeps conversation history) |
| `Ctrl+O` | Toggle verbose output |
| `Ctrl+R` | Reverse search command history |
| `Ctrl+V` / `Cmd+V` / `Alt+V` | Paste image from clipboard |
| `Ctrl+B` | Background running tasks |
| `Ctrl+T` | Toggle task list |
| `Esc` | Stop Claude mid-action |
| `Esc + Esc` | Rewind or summarize |
| `Shift+Tab` / `Alt+M` | Toggle permission modes (Normal / Plan / Auto-Accept / Delegate) |
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Up/Down arrows` | Navigate command history |
| `Left/Right arrows` | Cycle through dialog tabs |

### Text Editing

| Shortcut | Description |
|:---------|:------------|
| `Ctrl+K` | Delete to end of line |
| `Ctrl+U` | Delete entire line |
| `Ctrl+Y` | Paste deleted text |
| `Alt+Y` | Cycle paste history |
| `Alt+B` | Move cursor back one word |
| `Alt+F` | Move cursor forward one word |

### Multiline Input

| Method | Shortcut |
|:-------|:---------|
| Quick escape | `\` + `Enter` |
| macOS default | `Option+Enter` |
| Shift+Enter | Works in iTerm2, WezTerm, Ghostty, Kitty |
| Control sequence | `Ctrl+J` |
| Paste mode | Paste directly |

## Vim Mode

Enable with `/vim` or permanently via `/config`.

### Normal Mode Navigation
`h/j/k/l` - Move, `w` - Next word, `e` - End of word, `b` - Previous word, `0` - Beginning of line, `$` - End of line, `^` - First non-blank, `gg` - Beginning of input, `G` - End of input, `f{char}` - Jump to char, `F{char}` - Jump back to char

### Normal Mode Editing
`x` - Delete char, `dd` - Delete line, `D` - Delete to end, `dw/de/db` - Delete word, `cc` - Change line, `C` - Change to end, `cw/ce/cb` - Change word, `yy/Y` - Yank line, `yw/ye/yb` - Yank word, `p` - Paste after, `P` - Paste before, `>>` - Indent, `<<` - Dedent, `J` - Join lines, `.` - Repeat

### Text Objects
`iw/aw` - Inner/around word, `i"/a"` - Inner/around double quotes, `i'/a'` - Inner/around single quotes, `i(/a(` - Inner/around parentheses, `i[/a[` - Inner/around brackets, `i{/a{` - Inner/around braces

## CLI Flags

| Flag | Description |
|:-----|:------------|
| `-p "prompt"` | Headless mode (non-interactive) |
| `--output-format json` | JSON output |
| `--output-format stream-json` | Streaming JSON output |
| `--continue` | Resume the most recent conversation |
| `--resume` | Select from recent conversations |
| `--allowedTools "Tool1,Tool2"` | Restrict tools |
| `--disallowedTools "Tool1"` | Deny specific tools |
| `--dangerously-skip-permissions` | Bypass all permission checks |
| `--verbose` | Verbose debug output |
| `--agents '{...}'` | JSON subagent definitions |
| `--agent name` | Run as a specific agent |
| `--add-dir path` | Add additional directories |

## Background Bash Commands

- Claude can run commands in background and return immediately
- Press `Ctrl+B` to background a running command
- Output buffered, retrievable via TaskOutput tool
- Common uses: build tools, test runners, dev servers, long processes

## Prompt Suggestions

- Grayed-out example commands appear based on git history
- Press Tab to accept, Enter to accept and submit
- Disable with `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false`

## Task List

- `Ctrl+T` to toggle task list view
- Tasks persist across context compactions
- Share across sessions with `CLAUDE_CODE_TASK_LIST_ID=my-project`

## PR Review Status

- Clickable PR link in footer when on a branch with open PR
- Color-coded: green=approved, yellow=pending, red=changes requested, gray=draft, purple=merged
- Updates automatically every 60 seconds
- Requires `gh` CLI

---

# 3. CLAUDE CODE .claude DIRECTORY STRUCTURE

## Complete Directory Layout

```
~/.claude/                              # User scope (global)
  settings.json                         # Personal global settings
  CLAUDE.md                             # Personal global memory/instructions
  agents/                               # User-level subagents (available in all projects)
    security-reviewer.md
    code-reviewer.md
  rules/                                # User-level rules
    preferences.md
    workflows.md
  skills/                               # User-level skills
    explain-code/
      SKILL.md
  commands/                             # User-level custom slash commands
    review.md
  projects/<project>/memory/            # Auto memory (per project)
    MEMORY.md                           # Concise index, loaded into every session
    debugging.md
    api-conventions.md
  plans/                                # Plan files (default location)
  tasks/                                # Task lists
  agent-memory/                         # Subagent persistent memory (user scope)
    <agent-name>/
      MEMORY.md

~/.claude.json                          # OAuth session, MCP configs, per-project state,
                                        # preferences (theme, notifications, editor mode)

.claude/                                # Project scope (committed to git)
  settings.json                         # Shared team settings
  settings.local.json                   # Personal overrides (gitignored)
  CLAUDE.md                             # Project memory file (or ./CLAUDE.md at root)
  agents/                               # Project subagents
    db-reader.md
  rules/                                # Modular project rules
    code-style.md
    testing.md
    security.md
    frontend/
      react.md
      styles.md
    backend/
      api.md
      database.md
  skills/                               # Project skills
    api-conventions/
      SKILL.md
    fix-issue/
      SKILL.md
      scripts/
        helper.sh
  commands/                             # Project custom slash commands (legacy, still works)
    deploy.md
  agent-memory/                         # Subagent persistent memory (project scope)
    <agent-name>/
      MEMORY.md
  agent-memory-local/                   # Subagent persistent memory (local scope)
    <agent-name>/
      MEMORY.md

.claude/*.local.*                       # Local scope files (gitignored)
  settings.local.json
  CLAUDE.local.md

.mcp.json                              # Project-scoped MCP server configurations

CLAUDE.md                              # Project root memory (alternative to .claude/CLAUDE.md)
CLAUDE.local.md                        # Personal project-specific preferences (auto-gitignored)

# System directories (Managed settings only):
macOS: /Library/Application Support/ClaudeCode/
       /Library/Application Support/ClaudeCode/CLAUDE.md
Linux/WSL: /etc/claude-code/
           /etc/claude-code/CLAUDE.md
           /etc/claude-code/managed-settings.json
Windows: C:\Program Files\ClaudeCode\
         C:\Program Files\ClaudeCode\CLAUDE.md
```

## Settings Precedence (Highest to Lowest)

1. **Managed** (system-level `managed-settings.json`) - cannot be overridden
2. **Command line arguments** - temporary session overrides
3. **Local** (`.claude/*.local.*` files) - you in this repo only
4. **Project** (`.claude/` in repository) - all collaborators
5. **User** (`~/.claude/` directory) - you across all projects

## settings.json Schema

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json"
}
```

## Core Settings Options

| Key | Description | Example |
|-----|-------------|---------|
| `apiKeyHelper` | Custom script to generate auth value | `/bin/generate_temp_api_key.sh` |
| `cleanupPeriodDays` | Sessions inactive longer than this are deleted (default: 30) | `20` |
| `companyAnnouncements` | Announcements at startup | `["Welcome!"]` |
| `env` | Environment variables for every session | `{"FOO": "bar"}` |
| `attribution` | Git commit and PR attribution | See below |
| `model` | Override default model | `"claude-sonnet-4-5-20250929"` |
| `statusLine` | Custom status line context | `{"type": "command", "command": "script.sh"}` |
| `fileSuggestion` | Custom script for @ file autocomplete | `{"type": "command", "command": "script.sh"}` |
| `respectGitignore` | Control if @ picker respects .gitignore (default: true) | `false` |
| `outputStyle` | System prompt output style | `"Explanatory"` |
| `forceLoginMethod` | Restrict login method | `"claudeai"` or `"console"` |
| `forceLoginOrgUUID` | Auto-select organization during login | UUID string |
| `enableAllProjectMcpServers` | Auto-approve all project MCP servers | `true` |
| `enabledMcpjsonServers` | Whitelist specific MCP servers | `["memory", "github"]` |
| `disabledMcpjsonServers` | Blacklist specific MCP servers | `["filesystem"]` |
| `alwaysThinkingEnabled` | Enable extended thinking by default | `true` |
| `plansDirectory` | Where plan files are stored | `"./plans"` |
| `showTurnDuration` | Show turn duration after responses | `true` |
| `spinnerVerbs` | Customize spinner action verbs | `{"mode": "append", "verbs": [...]}` |
| `language` | Preferred response language | `"japanese"` |
| `autoUpdatesChannel` | Release channel | `"stable"` or `"latest"` |
| `spinnerTipsEnabled` | Show tips in spinner (default: true) | `false` |
| `terminalProgressBarEnabled` | Terminal progress bar (default: true) | `false` |
| `prefersReducedMotion` | Reduce UI animations | `true` |
| `teammateMode` | Agent team display | `"auto"`, `"in-process"`, `"tmux"` |

## Permissions Configuration

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "ask": [
      "Bash(git push *)"
    ],
    "additionalDirectories": ["../docs/"],
    "defaultMode": "acceptEdits",
    "disableBypassPermissionsMode": "disable"
  }
}
```

Permission Rule Syntax: `Tool` or `Tool(specifier)`
- `Bash` - All bash commands
- `Bash(npm run *)` - Commands starting with `npm run`
- `Read(./.env)` - Reading .env file
- `WebFetch(domain:example.com)` - Fetch requests to example.com
- `Edit(./src/**)` - Write access to src directory
- `Task(agent-name)` - Specific subagent
- `Skill(name)` - Specific skill
- Evaluation order: Deny -> Ask -> Allow (first match wins)

## Sandbox Settings

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker"],
    "allowUnsandboxedCommands": false,
    "network": {
      "allowUnixSockets": ["~/.ssh/agent-socket"],
      "allowAllUnixSockets": false,
      "allowLocalBinding": true,
      "allowedDomains": ["github.com", "*.npmjs.org"],
      "httpProxyPort": 8080,
      "socksProxyPort": 8081
    },
    "enableWeakerNestedSandbox": false
  }
}
```

## Attribution Settings

```json
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: AI <ai@example.com>",
    "pr": ""
  }
}
```

## Hooks Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {"type": "command", "command": "~/.claude/hooks/filter-test-output.sh"}
        ]
      }
    ],
    "PostToolUse": [...],
    "Stop": [...],
    "SessionStart": [...],
    "SessionEnd": [...],
    "SubagentStart": [...],
    "SubagentStop": [...]
  },
  "disableAllHooks": false,
  "allowManagedHooksOnly": false
}
```

## MCP Server Configuration

```json
{
  "allowedMcpServers": [
    { "serverName": "github" }
  ],
  "deniedMcpServers": [
    { "serverName": "filesystem" }
  ]
}
```

## Plugin Configuration

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true,
    "analyzer@security-plugins": false
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    }
  }
}
```

## Managed-Only Settings

- `strictKnownMarketplaces` - Allowlist of plugin marketplaces
- `allowManagedPermissionRulesOnly` - Only managed permission rules apply
- `allowManagedHooksOnly` - Only managed and SDK hooks allowed

---

# 4. CLAUDE.md CONVENTIONS AND BEST PRACTICES

## File Locations (Hierarchical Loading)

| Memory Type | Location | Purpose | Shared With |
|-------------|----------|---------|-------------|
| **Managed policy** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux: `/etc/claude-code/CLAUDE.md`, Windows: `C:\Program Files\ClaudeCode\CLAUDE.md` | Organization-wide instructions | All users |
| **Project memory** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared instructions | Team via git |
| **Project rules** | `./.claude/rules/*.md` | Modular topic-specific instructions | Team via git |
| **User memory** | `~/.claude/CLAUDE.md` | Personal preferences for all projects | Just you |
| **Project memory (local)** | `./CLAUDE.local.md` | Personal project-specific preferences | Just you |
| **Auto memory** | `~/.claude/projects/<project>/memory/` | Claude's automatic notes | Just you (per project) |

## How Hierarchical Loading Works

1. Claude Code walks **upward** from the current working directory toward the filesystem root, reading any CLAUDE.md or CLAUDE.local.md files it finds
2. CLAUDE.md files in parent directories are loaded at launch (ancestor loading)
3. CLAUDE.md files in **child** directories load **on demand** when Claude reads files in those directories (descendant loading)
4. More specific instructions take precedence over broader ones
5. Auto memory loads only the first 200 lines of `MEMORY.md`
6. The filename is case-sensitive: must be exactly `CLAUDE.md` (uppercase CLAUDE, lowercase .md)
7. CLAUDE.local.md files are automatically added to .gitignore

## CLAUDE.md Imports

```markdown
See @README.md for project overview and @package.json for available npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

- Both relative and absolute paths allowed
- Relative paths resolve relative to the file containing the import
- Recursive imports supported (max depth: 5 hops)
- Imports NOT evaluated inside markdown code spans/blocks
- First-time external imports require approval dialog

## What to Include in CLAUDE.md

### DO Include:
- Bash commands Claude cannot guess
- Code style rules that differ from defaults
- Testing instructions and preferred test runners
- Repository etiquette (branch naming, PR conventions)
- Architectural decisions specific to your project
- Developer environment quirks (required env vars)
- Common gotchas or non-obvious behaviors

### DO NOT Include:
- Anything Claude can figure out by reading code
- Standard language conventions Claude already knows
- Detailed API documentation (link to docs instead)
- Information that changes frequently
- Long explanations or tutorials
- File-by-file descriptions of the codebase
- Self-evident practices like "write clean code"
- Code style guidelines (use a linter instead)

## Example CLAUDE.md

```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

## Best Practices

1. **Keep it concise** - Under 150 lines for reliable adherence. Under 500 lines maximum.
2. **Test each line** - Ask "Would removing this cause Claude to make mistakes?" If not, cut it.
3. **Use emphasis for critical rules** - "IMPORTANT" or "YOU MUST" improves adherence
4. **Check into git** so your team can contribute
5. **Review when things go wrong** - Treat CLAUDE.md like code
6. **Use skills for domain-specific knowledge** - Only put broadly-applicable content in CLAUDE.md
7. **Add custom compaction instructions** - Tell Claude what to preserve during summarization

## Modular Rules with .claude/rules/

```
.claude/rules/
  code-style.md
  testing.md
  security.md
  frontend/
    react.md
    styles.md
  backend/
    api.md
    database.md
```

### Path-Specific Rules (Frontmatter)

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
```

Supported glob patterns: `**/*.ts`, `src/**/*`, `*.md`, `src/components/*.tsx`
Brace expansion: `src/**/*.{ts,tsx}`, `{src,lib}/**/*.ts`

### User-Level Rules

`~/.claude/rules/` - loaded before project rules, project rules have higher priority.

### Symlinks

`.claude/rules/` supports symlinks for sharing common rules across projects.

## Auto Memory

- Claude automatically saves useful context: project patterns, build commands, debugging insights, architecture notes, preferences
- Stored at `~/.claude/projects/<project>/memory/`
- `MEMORY.md` entrypoint loaded into system prompt (first 200 lines)
- Topic files (debugging.md, api-conventions.md) loaded on demand
- Control: `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` (force off), `CLAUDE_CODE_DISABLE_AUTO_MEMORY=0` (force on)

---

# 5. CLAUDE CODE ENVIRONMENT

## Environment Variables - Complete Reference

### Authentication & API

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | API key for Claude SDK |
| `ANTHROPIC_AUTH_TOKEN` | Custom Authorization header value |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom headers (Name: Value format, newline-separated) |
| `ANTHROPIC_MODEL` | Model name to use |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Override Haiku model |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Override Sonnet model |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Override Opus model |
| `ANTHROPIC_FOUNDRY_API_KEY` | Microsoft Foundry API key |
| `ANTHROPIC_FOUNDRY_BASE_URL` | Foundry base URL |
| `ANTHROPIC_FOUNDRY_RESOURCE` | Foundry resource name |
| `AWS_BEARER_TOKEN_BEDROCK` | Bedrock API key |

### Behavior Control

| Variable | Purpose | Example |
|----------|---------|---------|
| `CLAUDE_CODE_EFFORT_LEVEL` | Effort level: "low", "medium", "high" | `"medium"` |
| `CLAUDE_CODE_SHELL` | Override shell detection | `"bash"` |
| `CLAUDE_CODE_SHELL_PREFIX` | Command prefix for all bash commands | `/path/to/logger.sh` |
| `CLAUDE_CODE_TMPDIR` | Override temp directory | `/tmp` |
| `CLAUDE_CODE_TASK_LIST_ID` | Share task list across sessions | `"shared-id"` |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable auto memory (1=off, 0=on) | `"1"` |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background tasks | `"1"` |
| `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION` | Enable prompt suggestions | `"true"` |
| `CLAUDE_CODE_ENABLE_TASKS` | Enable task tracking (default: true) | `"true"` |
| `CLAUDE_CODE_HIDE_ACCOUNT_INFO` | Hide email/org from UI | `"1"` |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | Disable terminal title updates | `"1"` |

### Limits & Performance

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASH_DEFAULT_TIMEOUT_MS` | Default timeout for bash commands | - |
| `BASH_MAX_TIMEOUT_MS` | Maximum timeout model can set | - |
| `BASH_MAX_OUTPUT_LENGTH` | Max characters before truncation | - |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Maximum output tokens | `32000` |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | File read token limit | - |
| `MAX_THINKING_TOKENS` | Extended thinking token budget | `31999` |
| `MAX_MCP_OUTPUT_TOKENS` | Max MCP tool response tokens | `25000` |
| `MCP_TIMEOUT` | MCP server startup timeout (ms) | - |
| `MCP_TOOL_TIMEOUT` | MCP tool execution timeout (ms) | - |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Override auto-compaction threshold (%) | - |

### Cloud Provider

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_USE_BEDROCK` | Use AWS Bedrock |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | Skip AWS auth for Bedrock |
| `CLAUDE_CODE_USE_VERTEX` | Use Google Vertex AI |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | Skip Google auth for Vertex |
| `CLAUDE_CODE_USE_FOUNDRY` | Use Microsoft Foundry |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | Skip Azure auth |
| `CLAUDE_CODE_AWS_REGION_OVERRIDE` | Override AWS region |
| `VERTEX_REGION_CLAUDE_*` | Vertex region per model |

### Telemetry & Updates

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | Enable OpenTelemetry (1) |
| `OTEL_METRICS_EXPORTER` | OTel metrics exporter (e.g., "otlp") |
| `DISABLE_TELEMETRY` | Opt out of Statsig telemetry (1) |
| `DISABLE_AUTOUPDATER` | Disable automatic updates (1) |
| `FORCE_AUTOUPDATES_PLUGINS` | Force plugin auto-updates |
| `DISABLE_ERROR_REPORTING` | Opt out of Sentry (1) |
| `DISABLE_COST_WARNINGS` | Disable cost warnings (1) |

### Feature Flags

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | Enable agent teams (1) |
| `DISABLE_PROMPT_CACHING` | Disable prompt caching globally (1) |
| `DISABLE_PROMPT_CACHING_HAIKU` | Disable caching for Haiku (1) |
| `DISABLE_PROMPT_CACHING_SONNET` | Disable caching for Sonnet (1) |
| `DISABLE_PROMPT_CACHING_OPUS` | Disable caching for Opus (1) |
| `ENABLE_TOOL_SEARCH` | MCP tool search: "auto", "auto:5", "true", "false" |
| `IS_DEMO` | Demo mode |
| `SLASH_COMMAND_TOOL_CHAR_BUDGET` | Character budget for skill metadata |

### Proxy & Networking

| Variable | Purpose |
|----------|---------|
| `HTTP_PROXY` | HTTP proxy server |
| `HTTPS_PROXY` | HTTPS proxy server |
| `NO_PROXY` | Domains/IPs to bypass proxy |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | Allow proxy DNS resolution |
| `MCP_CLIENT_SECRET` | OAuth client secret for MCP |
| `MCP_OAUTH_CALLBACK_PORT` | Fixed OAuth redirect callback port |

### Other

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CONFIG_DIR` | Override config/data file location |
| `CLAUDE_ENV_FILE` | Shell script to source before each Bash command |
| `DISABLE_INSTALLATION_CHECKS` | Disable installation warnings |
| `DISABLE_BUG_COMMAND` | Disable /bug command |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | Disable non-critical model calls |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | Disable anthropic-beta headers |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | Skip IDE extension auto-install |
| `USE_BUILTIN_RIPGREP` | Use builtin rg instead of system |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Credential refresh interval (ms) |
| `CLAUDE_CODE_CLIENT_CERT` | Client certificate path for mTLS |
| `CLAUDE_CODE_CLIENT_KEY` | Client private key path for mTLS |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | Passphrase for encrypted key |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | Load CLAUDE.md from --add-dir dirs (1) |
| `CLAUDE_CODE_PLAN_MODE_REQUIRED` | Require plan approval (agent teams) |
| `CLAUDE_CODE_TEAM_NAME` | Agent team name |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Delay before auto-exit (ms) |

## Terminal Interaction

- Environment variables set in one Bash command do NOT persist to subsequent commands (each runs in a fresh shell)
- Workaround: Activate environment before starting Claude Code, or use `CLAUDE_ENV_FILE` to source a shell script before each command
- All env vars can be configured in settings.json `env` field for persistence
- Claude Code reads the user's shell profile (bash or zsh) at startup

## Configuration Storage Files

- `~/.claude.json` - OAuth session, MCP server configs, per-project state, preferences
- `.mcp.json` - Project-scoped MCP server configurations
- `~/.claude/settings.json` - User settings
- `.claude/settings.json` - Project settings
- `.claude/settings.local.json` - Local project settings (gitignored)

---

# 6. CLAUDE CODE EXTENSIONS / INTEGRATIONS

## VS Code Extension

### Installation
- Press `Cmd+Shift+X` / `Ctrl+Shift+X` -> search "Claude Code" -> Install
- Or install directly: [vscode:extension/anthropic.claude-code](vscode:extension/anthropic.claude-code)
- Also works with Cursor: [cursor:extension/anthropic.claude-code](cursor:extension/anthropic.claude-code)
- Requirements: VS Code 1.98.0+

### Key Features
- **Quick launch**: Click Spark icon in Editor Toolbar, or `Cmd+Esc` / `Ctrl+Esc`
- **Inline diff viewing**: Side-by-side comparison of original and proposed changes
- **@-mentions**: Reference files with `@filename`, fuzzy matching supported
- **Selection context**: Selected text automatically shared with Claude
- **Insert @-mention**: `Option+K` (Mac) / `Alt+K` (Windows/Linux) inserts file reference with line numbers
- **Diagnostic sharing**: IDE lint/syntax errors automatically shared
- **Multiple conversations**: Open in New Tab or New Window for parallel work
- **Plan mode**: Claude describes changes before making them
- **Auto-accept mode**: Claude makes edits without asking
- **Context indicator**: Shows context window usage
- **Extended thinking**: Toggle via command menu
- **Multi-line input**: Shift+Enter
- **Conversation history**: Dropdown at top of panel
- **Remote session resume**: Resume claude.ai sessions locally
- **Plugin management**: Type `/plugins` for graphical interface
- **Chrome integration**: `@browser` to test web apps
- **Checkpoints/Rewind**: Hover over messages for rewind options
- **Terminal output reference**: `@terminal:name` to include terminal output
- **Git worktrees**: Support for parallel branch work

### VS Code Commands and Shortcuts

| Command | Shortcut | Description |
|---------|----------|-------------|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | Toggle focus between editor and Claude |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | New conversation as editor tab |
| New Conversation | `Cmd+N` / `Ctrl+N` | Start new conversation (Claude focused) |
| Insert @-Mention | `Option+K` / `Alt+K` | Insert file reference (editor focused) |
| Open in Side Bar | - | Open Claude in left sidebar |
| Open in Terminal | - | Open Claude in terminal mode |
| Open in New Window | - | New conversation in separate window |
| Show Logs | - | View extension debug logs |
| Logout | - | Sign out |

### VS Code Extension Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `selectedModel` | `default` | Model for new conversations |
| `useTerminal` | `false` | Terminal mode instead of graphical panel |
| `initialPermissionMode` | `default` | Approval mode: default, plan, acceptEdits, bypassPermissions |
| `preferredLocation` | `panel` | Where Claude opens: sidebar or panel |
| `autosave` | `true` | Auto-save files before reads/writes |
| `useCtrlEnterToSend` | `false` | Ctrl/Cmd+Enter to send |
| `enableNewConversationShortcut` | `true` | Cmd/Ctrl+N shortcut |
| `hideOnboarding` | `false` | Hide onboarding checklist |
| `respectGitIgnore` | `true` | Exclude .gitignore patterns |
| `environmentVariables` | `[]` | Env vars for Claude process |
| `disableLoginPrompt` | `false` | Skip auth prompts |
| `allowDangerouslySkipPermissions` | `false` | Bypass all permission prompts |
| `claudeProcessWrapper` | - | Executable to launch Claude |

### Features Only in CLI (not Extension)

- All slash commands (extension has subset)
- MCP server configuration (configure via CLI, use in extension)
- `!` bash shortcut
- Tab completion

## JetBrains Integration

### Supported IDEs
IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, GoLand

### Installation
JetBrains Marketplace -> search "Claude Code" -> Install -> Restart IDE
Plugin: https://plugins.jetbrains.com/plugin/27310-claude-code-beta-

### Features
- **Quick launch**: `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux)
- **Diff viewing**: Changes displayed in IDE's diff viewer
- **Selection context**: Current selection/tab auto-shared with Claude
- **File reference shortcuts**: `Cmd+Option+K` (Mac) / `Alt+Ctrl+K` (Win/Linux) to insert @File#L1-99
- **Diagnostic sharing**: Lint/syntax errors automatically shared

### Configuration
- Plugin settings: Settings -> Tools -> Claude Code [Beta]
- Claude command: custom command path (e.g., `claude`, `/usr/local/bin/claude`)
- For WSL: `wsl -d Ubuntu -- bash -lic "claude"`
- ESC key fix: Settings -> Tools -> Terminal -> uncheck "Move focus to editor with Escape"

### Remote Development
Plugin must be installed on remote host via Settings -> Plugin (Host)

### Security Note
With auto-edit permissions, Claude can modify IDE config files that may be auto-executed. Use manual approval mode when working with untrusted code.

## Chrome Extension

- Claude in Chrome extension for browser automation
- Test web apps, debug console logs, automate browser workflows
- Use `@browser` in prompts
- Requires Chrome extension version 1.0.36+

## Terminal Integrations

- `/terminal-setup` installs keybindings (Shift+Enter, etc.)
- Works in iTerm2, WezTerm, Ghostty, Kitty natively
- VS Code, Alacritty, Zed, Warp need `/terminal-setup`
- macOS: Configure Option as Meta in terminal settings

## Third-Party IDE Support

- Visual Studio 2026 integration: pending (issue #15942 on GitHub)
- Xcode 26.3: Native integration via Claude Agent SDK (subagents, background tasks, plugins)

---

# 7. CLAUDE CODE PRICING, MODELS, AND CONTEXT WINDOW

## Current Model Pricing

| Model | Input (per MTok) | Output (per MTok) | Context Window | Max Output |
|-------|-------------------|--------------------|----|-----|
| **Claude Opus 4.6** | $5 | $25 | 200K / 1M (beta) | 128K tokens |
| **Claude Sonnet 4.5** | $3 | $15 | 200K / 1M (beta) | 64K tokens |
| **Claude Haiku 4.5** | $1 | $5 | 200K | 64K tokens |

### Legacy Models

| Model | Input | Output | Context | Max Output |
|-------|-------|--------|---------|------------|
| Claude Opus 4.5 | $5/MTok | $25/MTok | 200K | 64K |
| Claude Opus 4.1 | $15/MTok | $75/MTok | 200K | 32K |
| Claude Sonnet 4 | $3/MTok | $15/MTok | 200K / 1M (beta) | 64K |
| Claude Sonnet 3.7 | $3/MTok | $15/MTok | 200K | 64K / 128K (beta) |
| Claude Opus 4 | $15/MTok | $75/MTok | 200K | 32K |
| Claude Haiku 3 | $0.25/MTok | $1.25/MTok | 200K | 4K |

### Long Context Pricing
Requests exceeding 200K tokens: 2x input pricing, 1.5x output pricing.

### Prompt Caching
Reduces costs for repeated content like system prompts (exact discount varies).

### Extended Thinking
Thinking tokens billed as output tokens. Default budget: 31,999 tokens.

## Claude Code Usage Costs

- **Average cost**: $6/developer/day
- **90th percentile**: Below $12/day
- **Monthly average**: ~$100-200/developer/month with Sonnet 4.5
- Large variance depending on instances and automation usage
- **Background token usage**: ~$0.04/session for summarization and command processing

## Context Window Management

### How the 200K Context Window is Allocated

```
200K total
  - System Prompt
  - CLAUDE.md files
  - Tool definitions
  - Response buffer
  = ~140-150K usable tokens
```

### Auto-Compaction

- Triggers at approximately **95% capacity** (or 75-92% depending on internal heuristics)
- Override threshold: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` (trigger at 50%)
- Compaction is **instant** - Claude maintains continuous session memory in background
- Server-side summarization condenses earlier conversation parts
- Preserves code patterns, file states, key decisions
- Custom instructions: `/compact Focus on the API changes`
- CLAUDE.md compaction instructions: `"When compacting, always preserve the full list of modified files"`

### Manual Context Management

- `/clear` - Reset context between unrelated tasks
- `/compact [instructions]` - Manual compaction with focus
- `/context` - Visualize current context usage as colored grid
- `/cost` - Check token usage
- `Esc + Esc` or `/rewind` -> "Summarize from here" - Partial compaction
- Configure status line to show context usage continuously

### Context Awareness

- Claude Sonnet 4.5 and Haiku 4.5+ track remaining context window
- After each tool call, Claude receives capacity update
- Helps Claude determine how much capacity remains

### Strategies to Reduce Token Usage

1. **Clear between tasks**: `/clear` when switching to unrelated work
2. **Choose right model**: Sonnet for most tasks, Opus for complex reasoning, Haiku for subagents
3. **Reduce MCP overhead**: Disable unused servers, use CLI tools instead
4. **Use code intelligence plugins**: Precise navigation reduces file reads
5. **Offload to hooks**: Preprocess data before Claude sees it
6. **Move instructions to skills**: Keep CLAUDE.md under 500 lines
7. **Adjust extended thinking**: Lower `MAX_THINKING_TOKENS` or disable for simple tasks
8. **Use subagents**: Delegate verbose operations to separate context
9. **Write specific prompts**: Avoid vague "improve this codebase" requests
10. **Use plan mode**: `Shift+Tab` to plan before implementing

### Rate Limit Recommendations (by Team Size)

| Team Size | TPM per User | RPM per User |
|-----------|-------------|-------------|
| 1-5 | 200k-300k | 5-7 |
| 5-20 | 100k-150k | 2.5-3.5 |
| 20-50 | 50k-75k | 1.25-1.75 |
| 50-100 | 25k-35k | 0.62-0.87 |
| 100-500 | 15k-20k | 0.37-0.47 |
| 500+ | 10k-15k | 0.25-0.35 |

### Agent Team Token Costs
- ~7x more tokens than standard sessions
- Each teammate runs own context window
- Keep teams small and tasks focused
- Use Sonnet for teammates
- Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

## Skills Complete Reference

### SKILL.md Format

```yaml
---
name: my-skill
description: What this skill does
argument-hint: [issue-number]
disable-model-invocation: true    # Only user can invoke
user-invocable: false             # Only Claude can invoke
allowed-tools: Read, Grep, Glob  # Restrict tools
model: sonnet                     # Model override
context: fork                    # Run in subagent
agent: Explore                   # Which subagent type
hooks: {...}                      # Lifecycle hooks
---

Your skill instructions with $ARGUMENTS placeholder.
```

### Skill Locations (Priority Order)
1. Enterprise (managed settings)
2. Personal (`~/.claude/skills/<name>/SKILL.md`)
3. Project (`.claude/skills/<name>/SKILL.md`)
4. Plugin (`<plugin>/skills/<name>/SKILL.md`)

### String Substitutions
- `$ARGUMENTS` - All arguments
- `$ARGUMENTS[N]` or `$N` - Specific argument by index
- `${CLAUDE_SESSION_ID}` - Current session ID
- `` !`command` `` - Dynamic context injection (runs before sending to Claude)

## Subagents Complete Reference

### Built-in Subagents

| Agent | Model | Tools | Purpose |
|-------|-------|-------|---------|
| Explore | Haiku | Read-only | Fast codebase search/analysis |
| Plan | Inherits | Read-only | Research for plan mode |
| General-purpose | Inherits | All | Complex multi-step tasks |
| Bash | Inherits | Terminal | Running commands in separate context |
| statusline-setup | Sonnet | - | Configure status line |
| Claude Code Guide | Haiku | - | Answer questions about Claude Code |

### Subagent File Format

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep, Bash
disallowedTools: Write, Edit
model: sonnet          # sonnet, opus, haiku, or inherit
permissionMode: default # default, acceptEdits, dontAsk, delegate, bypassPermissions, plan
maxTurns: 10
skills:
  - api-conventions
  - error-handling-patterns
mcpServers:
  - slack
memory: user           # user, project, or local
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate.sh"
---

System prompt goes here in markdown body.
```

### Subagent Scope (Priority Order)
1. `--agents` CLI flag (current session, highest)
2. `.claude/agents/` (current project)
3. `~/.claude/agents/` (all projects)
4. Plugin agents/ directory (lowest)

### Persistent Memory Scopes

| Scope | Location | Use When |
|-------|----------|----------|
| `user` | `~/.claude/agent-memory/<name>/` | Cross-project learnings |
| `project` | `.claude/agent-memory/<name>/` | Project-specific, shareable |
| `local` | `.claude/agent-memory-local/<name>/` | Project-specific, private |

---

## Sources

### Official Documentation
- [Agent SDK Overview](https://platform.claude.com/docs/en/agent-sdk/overview)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)
- [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code Costs](https://code.claude.com/docs/en/costs)
- [Claude Code Memory](https://code.claude.com/docs/en/memory)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Claude Code Sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code VS Code](https://code.claude.com/docs/en/vs-code)
- [Claude Code JetBrains](https://code.claude.com/docs/en/jetbrains)
- [Claude Models](https://platform.claude.com/docs/en/about-claude/models)

### SDK Repositories
- [Python SDK](https://github.com/anthropics/claude-agent-sdk-python)
- [TypeScript SDK](https://github.com/anthropics/claude-agent-sdk-typescript)
- [Demo Agents](https://github.com/anthropics/claude-agent-sdk-demos)
- [NPM Package](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk)

### Community Resources
- [Builder.io - Complete CLAUDE.md Guide](https://www.builder.io/blog/claude-md-guide)
- [Anthropic Blog - Building Agents with SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [Anthropic Blog - Using CLAUDE.md Files](https://claude.com/blog/using-claude-md-files)
- [Shipyard Claude Code Cheat Sheet](https://shipyard.build/blog/claude-code-cheat-sheet/)
- [ClaudeLog Configuration Guide](https://claudelog.com/configuration/)
- [Steve Kinney - Claude Code Compaction](https://stevekinney.com/courses/ai-development/claude-code-compaction)

# Claude Code — Complete Capabilities Reference

> **Source:** `04_Documents/CLAUDE_CAPABILITIES.md`
> **Last Updated:** 2026-02-07
> **Your Environment:** Windows | Claude Code v2.1.34
> **Your Model:** glm-4.7 (ALL agents configured to use this model)

---

## 🎯 Quick Reference Card

### Session Management
```bash
/restore            # Resume previous session
/rename <name>      # Name current session
/clear              # Start fresh
/compact            # Summarize conversation
```

### Configuration
```bash
/model              # Change model
/theme              # Change theme
/config             # Open settings
/keybindings        # Customize shortcuts
/permissions        # Manage tool permissions
```

### Information
```bash
/context            # Show token usage
/stats              # Usage statistics
/cost               # Cost breakdown
/debug              # Troubleshoot session
/doctor             # Health check
```

### Development
```bash
/commit             # Create git commit
/pr-comments        # Review pull request
/rewind             # Undo code changes
```

### Extensions
```bash
/plugins            # Manage plugins
/skills             # List available skills
/mcp                # MCP server management
/agents             # Manage custom agents
```

---

## 🧠 Core Features

### Conversation Management

| Feature | Description | Status |
|---------|-----------|--------|
| **Session Resume** | Continue past conversations with `claude --resume` or `/restore` | ✅ Active |
| **Named Sessions** | Tag sessions with `/rename` and resume by name | ✅ Active |
| **Session Forking** | Create branches of conversations with `--fork-session` | ✅ Active |
| **Auto-Compact** | Automatically summarizes long conversations to save tokens | ✅ Active |
| **Teleport** | Resume sessions from Claude.ai web interface | ✅ Active |

### Model Selection

| Model | Use Case | Model |
|--------|----------|-------|
| **Opus 4.6** | Most capable, complex reasoning | glm-4.7 |
| **Sonnet 4.5** | Balanced speed and intelligence | glm-4.7 |
| **Haiku 4.5** | Fastest, SonnetPlan (Sonnet for planning, Haiku for execution) | glm-4.7 |

**Model Switching:** Press `Alt+P` (Win/Linux) or `Opt+P` (Mac) while typing

### IDE Integration

| Feature | Description | Status |
|---------|-----------|--------|
| **VS Code Extension** | Native sidebar integration | ✅ Active |
| **Diff Previews** | See changes before applying | ✅ Active |
| **File @-mentions** | Reference files with `@filename` | ✅ Active |
| **Clipboard Paste** | Paste images directly into prompts | ✅ Active |
| **Real-time Steering** | Send messages while Claude is working | ✅ Active |

---

## 🤖 Agent System

### Built-in Subagents

| Agent | Purpose | Model | When to Use |
|-------|---------|-------|-------------|
| **Explore** | Codebase exploration | glm-4.7 | Search files, understand project structure |
| **Plan** | Implementation planning | glm-4.7 | Design solutions before coding |
| **Bash** | Command execution | glm-4.7 | Run terminal operations |
| **General-purpose** | Complex multi-step tasks | glm-4.7 | Research, code analysis, file operations |

> **Note:** All your agents are configured to use `glm-4.7`

### Custom Agents

Create custom agents in `.claude/agents/` or `~/.claude/agents/`:

```json
{
  "description": "My specialized agent",
  "systemPrompt": "You are an expert in...",
  "tools": ["Read", "Write", "Edit", "Grep"],
  "disallowedTools": ["Bash"],
  "model": "opus",
  "permissionMode": "auto",
  "memory": "project"
}
```

### Agent Capabilities

| Capability | Description |
|-----------|-------------|
| **Tool Restrictions** | Control which tools each agent can use |
| **Model Selection** | Assign specific models per agent |
| **Memory Scope** | `user`, `project`, or `local` memory |
| **Hooks** | PreToolUse, PostToolUse, Stop hooks per agent |
| **Skills** | Auto-load skills for agents |

---

## 👥 Multi-Agent Teams

### What Are Agent Teams?

Multiple specialized agents working **in parallel** on different aspects of a task, coordinating and sharing results.

### Enable Agent Teams

```bash
# Windows (Command Prompt)
setx CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS "1"

# Windows (PowerShell)
[Environment]::SetEnvironmentVariable('CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS', '1', 'User')

# macOS/Linux
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### Team Use Cases

| Use Case | How Teams Help |
|-----------|-----------------|
| **Large Refactoring** | One agent analyzes dependencies, another implements changes |
| **Full-Stack Features** | Parallel work on backend API + frontend UI |
| **Code Review** | Security agent + performance agent + style agent |
| **Testing** | One writes unit tests, another writes integration tests |

### Agent Team Hooks

| Hook | Triggered When |
|------|-----------------|
| `TeammateIdle` | Triggered when agent teammate is idle |
| `TaskCompleted` | Triggered when task completes |

---

## 🛠 Built-in Tools

### File Operations

| Tool | Description | When to Use |
|------|-------------|---------------|
| `Read` | Read files (supports images, PDFs, Jupyter notebooks) | Any file reading |
| `Write` | Create/overwrite files | Creating new files |
| `Edit` | Exact string replacements | Modifying existing files |
| `Glob` | Pattern-based file search (`**/*.js`) | Finding files by pattern |
| `NotebookEdit` | Edit Jupyter notebook cells | Working with .ipynb |

### Search & Analysis

| Tool | Description | When to Use |
|------|-------------|---------------|
| `Grep` | Search file contents with regex | Finding text/patterns in files |
| `LSP` | Go-to-definition, find references, hover docs | Code intelligence |
| `WebSearch` | Search the web for current information | Current info needs |
| `WebFetch` | Fetch and read URLs | Reading specific URLs |

### Execution

| Tool | Description | When to Use |
|------|-------------|---------------|
| `Bash` | Run shell commands | Terminal operations |
| `Skill` | Execute custom skills/slash commands | Using skills |
| `Task` | Launch subagents (parallel execution) | Multi-agent work |

### Interactive

| Tool | Description | When to Use |
|------|-------------|---------------|
| `AskUserQuestion` | Ask multi-choice questions | User input needed |
| `EnterPlanMode` | Switch to planning mode | Designing before building |
| `ExitPlanMode` | Submit plan for approval | Ready for feedback |

---

## 🔧 Skills & Custom Commands

### Creating Skills

Skills are Markdown files in `.claude/skills/` or `~/.claude/skills/`:

```markdown
---
description: "Does something cool"
agent: "my-custom-agent"
model: "opus"
allowed-tools: [Read, Write, Edit]
context: fork
---

Your skill instructions here.
Use $ARGUMENTS[0] to access arguments.
```

### Skill Features

| Feature | Description |
|---------|-------------|
| **Arguments** | Access with `$ARGUMENTS[0]`, `$ARGUMENTS[1]`, or `$*` for all |
| **Agent Selection** | Specify which agent executes the skill |
| **Tool Restrictions** | Limit available tools |
| **Context Mode** | `fork` creates isolated context |
| **Auto-discovery** | Automatically appear in slash command menu |

### Built-in Skills

Common locations: `.claude/skills/`, `~/.claude/skills/`, plugin directories

---

## 🔌 Plugins & Extensions

### Plugin Commands

```bash
/plugin marketplace    # Browse available plugins
/plugin install <name> # Install a plugin
/plugin enable/disable # Toggle plugins
/plugin validate      # Check plugin structure
```

### Plugin Types

| Type | Description |
|------|-------------|
| **Marketplace Plugins** | Install from git repositories |
| **Local Plugins** | Load from local directories |
| **Team Plugins** | Shared via `extraKnownMarketplaces` |

### Plugin Configuration

Configure in `.claude/settings.json`:

```json
{
  "plugins": {
    "marketplaces": ["owner/repo"],
    "installed": {
      "plugin-name": {
        "enabled": true,
        "autoUpdate": true
      }
    }
  }
}
```

---

## 📋 HTML Documentation

**Source:** `04_Documents/CLAUDE_CAPABILITIES.md` + Desktop root

| File | Size | Purpose | Status |
|------|------|---------|--------|
| **claude_capabilities.html** | 11.9KB | Capabilities showcase | ✅ Complete |
| **claude_showcase.html** | 24.9KB | Feature demonstrations | ✅ Complete |
| **claude_ultimate_guide.html** | 52.9KB | Complete guide | ✅ Complete |
| **how_claude_works.html** | 5.2KB | Workflow explanations | ✅ Complete |

### Key Coverage

**All 50+ slash commands** documented with usage examples
**All model selection options** (Opus 4.6, Sonnet 4.5, Haiku 4.5)
**All core features** with implementation guidance
**All experimental flags** with environment variables
**Complete reference card** for daily operations

### Experiment HTML Files

**Location:** `03_Experiments/`

| Category | Files | Purpose |
|----------|-------|---------|
| **Early Work** | ride-book.html, ride-hailing-screen.html | HTML experimentation |
| **Showcase** | showcase/ (5 files) | VENOM capabilities demonstration |
| **Soul Tests** | soul-tests/ (10 files) | Nine minds exploration |
| **Unshelled** | unshelled/ website/examples/ (16 files) | Component examples |

**Status:** [See experiments/index.md for detailed catalog]

---

## 🔌 MCP Integrations

### What is MCP?

**Model Context Protocol** — Extensible protocol for adding external tools, resources, and prompts.

### MCP Commands

```bash
/mcp list           # Show all MCP servers
/mcp add <name>      # Interactive setup wizard
/mcp enable <name>   # Toggle server
/mcp disable <name>  # Toggle server
/mcp serve           # Run your own MCP server
```

### Common MCP Integrations

| Integration | Purpose | Use Case |
|-------------|---------|----------|
| **GitHub** | PRs, issues, code review | Review PRs, manage issues |
| **Slack** | Messages, channels | Team communication |
| **Google Drive** | Documents, sheets | Document collaboration |
| **Database** | SQL queries | Data analysis |

### MCP Configuration

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/server.js"],
      "env": { "API_KEY": "xxx" }
    }
  }
}
```

---

## 🧠 Memory System

### Memory Types

| Scope | Location | Persists |
|-------|----------|----------|
| `user` | `~/.claude/memory/` | All projects |
| `project` | `.claude/memory/` | Current project only |
| `local` | Session only | Current session |

### Memory Commands

```bash
/memory            # View and edit memory files
# <prefix>         # Quick memory entry (deprecated, use /memory)
```

### CLAUDE.md

Project-specific instructions loaded automatically:
- Can import other files: `@path/to/file.md`
- Loaded from: `./CLAUDE.md`, `.claude/CLAUDE.md`

---

## ⌨️ Keyboard Shortcuts

### Editing (Vim Mode)

| Key | Action |
|-----|--------|
| `Esc` | Normal mode |
| `i` | Insert mode |
| `dd` | Delete line |
| `yy` | Yank line |
| `p` | Paste |
| `ci"` | Change inside quotes |
| `f/F` | Find character |
| `/vim` | Enable Vim mode |

### Navigation

| Key | Action |
|-----|--------|
| `Ctrl+R` | Search prompt history |
| `Ctrl+O` | Toggle transcript mode |
| `Ctrl+G` | Edit prompt in external editor |
| `Ctrl+B` | Background running task |

### Model & Mode

| Key | Action |
|-----|--------|
| `Alt+P` | Switch models while typing |
| `Alt+T` | Toggle thinking mode |
| `Tab` | Toggle thinking (sticky) |

---

## 🧪 Experimental Features

### Your Enabled Features

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1    # Multi-agent teams
CLAUDE_CODE_ENABLE_TASKS=1                 # New task system
CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS=50000  # Larger file reads
BASH_MAX_TIMEOUT_MS=600000                 # 10-minute bash timeout
```

### Other Experimental Flags

| Flag | Purpose |
|------|---------|
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable Ctrl+B backgrounding |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | Proxy DNS resolution |
| `CLAUDE_CODE_SHELL` | Override shell detection |
| `CLAUDE_CODE_TMPDIR` | Custom temp directory |
| `DISABLE_INTERLEAVED_THINKING` | Disable thinking blocks |

---

## 🔑 Environment Variables Reference

### API & Auth

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Your API key |
| `ANTHROPIC_MODEL` | Default model |
| `ANTHROPIC_SMALL_FAST_MODEL` | Fast model setting |

### Performance

| Variable | Purpose |
|----------|---------|
| `BASH_DEFAULT_TIMEOUT_MS` | Default command timeout |
| `BASH_MAX_TIMEOUT_MS` | Maximum command timeout |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | File read limit |

### Paths

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CONFIG_DIR` | Config directory location |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` | Load CLAUDE.md from add-dirs |

### Debug

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_LOG` | Debug logging (`debug`, `info`) |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Disable release notes |

---

## 💡 Tips for Maximum Power

1. **Use Agent Teams** for complex, multi-faceted tasks
2. **Create Custom Skills** for repetitive workflows
3. **Set up MCP** for your tools (GitHub, Slack, databases)
4. **Use Plan Mode** (`/plan`) for big implementations
5. **Enable Thinking** (Alt+T) for complex reasoning
6. **Name Sessions** to organize your work
7. **Create Custom Agents** with specific tools and memory
8. **Use Hooks** to automate workflows

---

## 🆘 Getting Help

- `/help` — In-app help
- `/doctor` — Diagnose issues
- https://code.claude.com/docs — Official documentation
- https://github.com/anthropics/claude-code/issues — Report issues

---

**Version:** 2.1.34
**Coverage:** Complete
**Last Updated:** 2026-02-07

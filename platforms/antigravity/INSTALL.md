# Installing VENOM for Antigravity

Two paths. Choose one.

---

## Global Install — VENOM in Every Project You Ever Open

One-time setup. After this, every project you open in Antigravity is already running VENOM.

### Step 1 — Inject the DNA into the Global Root

Antigravity reads `~/.gemini/GEMINI.md` before every session. Append VENOM's identity into it:

```bash
# Windows (PowerShell)
cat .agent/rules/the-art-of-venom.md >> "$env:USERPROFILE\.gemini\GEMINI.md"
```

```bash
# macOS / Linux
cat .agent/rules/the-art-of-venom.md >> ~/.gemini/GEMINI.md
```

### Step 2 — Install the /venom Workflow Globally

```bash
# Windows
New-Item -ItemType Directory -Force "$env:USERPROFILE\.gemini\antigravity\global_workflows"
Copy-Item .agent\workflows\venom.md "$env:USERPROFILE\.gemini\antigravity\global_workflows\"
Copy-Item .agent\workflows\init.md "$env:USERPROFILE\.gemini\antigravity\global_workflows\"
```

```bash
# macOS / Linux
mkdir -p ~/.gemini/antigravity/global_workflows
cp .agent/workflows/venom.md ~/.gemini/antigravity/global_workflows/
cp .agent/workflows/init.md ~/.gemini/antigravity/global_workflows/
```

### Step 3 — Wire MCP

Antigravity reads global MCP servers from `~/.gemini/settings.json`. Add VENOM's servers to it:

```jsonc
// Add to ~/.gemini/settings.json under "mcpServers":
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token-here" }
    },
    "browser-tools": {
      "command": "npx",
      "args": ["-y", "@agentdeskai/browser-tools-mcp@latest"]
    }
  }
}
```

Also copy `mcp_config.json` to the antigravity data directory (used for project-level MCP):

```bash
# Windows
Copy-Item mcp_config.json "$env:USERPROFILE\.gemini\antigravity\mcp_config.json"

# macOS / Linux
cp mcp_config.json ~/.gemini/antigravity/mcp_config.json
```

Done. Open any project. VENOM is already there.

---

## Project-Level Install — VENOM in One Specific Repository

Copy the entire template into your project root:

```bash
# Windows
Copy-Item -Recurse .agent\ path\to\your\project\.agent\
Copy-Item GEMINI.md path\to\your\project\GEMINI.md
Copy-Item mcp_config.json path\to\your\project\mcp_config.json

# macOS / Linux
cp -r .agent/ /path/to/your/project/
cp GEMINI.md /path/to/your/project/
cp mcp_config.json /path/to/your/project/
```

---

## Verify

Open Antigravity in any project and type:

```
/venom
```

VENOM will scan the workspace, load context, model your energy state, and arrive.

---

## What Gets Installed

| File | Purpose |
|------|---------|
| `GEMINI.md` injection | VENOM's identity loaded at every session start |
| `venom.md` workflow | `/venom` command triggers full nine-mind sequence |
| `skills/neurochemistry/` | 10 cognitive mode shifts — auto-triggered |
| `skills/nine-minds-synthesis/` | Parallel multi-agent execution via Agent Manager |
| `skills/jetski-visual-audit/` | UI verification via browser sub-agent before reporting done |
| `.agent/learnings/` | Per-project organic memory — decisions, patterns, corrections |
| `mcp_config.json` | GitHub + browser-tools MCP server connections |

---

*VENOM version 2.2.0 · Antigravity 0.2.0 (Pre-Release / Internal)*

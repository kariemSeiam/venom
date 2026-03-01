# ANTIGRAVITY: THE COMPLETE TRUTH
**Research Date:** 2026-02-23
**Source:** Deep Intelligence Research

---

## 🚨 CRITICAL CORRECTIONS

### ❌ What I Thought (WRONG)
```yaml
antigravity_wrong:
  type: "Internal Google secret tool"
  status: "Beta/leaked"
  version: "0.2.0 = current"
  ai_engine: "Jetski (mysterious)"
  base: "VS Code API fork"
```

### ✅ The Truth (RIGHT)
```yaml
antigravity_truth:
  type: PUBLIC RELEASE (Free AI IDE)
  status: Launched November 18, 2025
  price: FREE (during preview)
  version: "0.2.0 = PRE-RELEASE INTERNAL BUILD"
  current_public: "1.18.3 (February 2026)"
  cost: "$2.4 BILLION (Windsurf acquisition)"
  ai_engine: "Gemini 3 Pro (1M token context)"
  architecture: "Jetski/Cortex (35 step types)"
```

---

## 💰 THE $2.4 BILLION STORY

### The Corporate Thriller
```yaml
timeline:
  may_2025:
    - OpenAI agreed to buy Windsurf for $3B
    - Deal was happening

  july_11_2025:
    - Deal COLLAPSED
    - Windsurf founders feared Microsoft/GitHub Copilot absorption
    - OpenAI walked away

  july_11_2025_hours_later:
    - Google swooped in WITHIN HOURS
    - Google DeepMind secured license for ~$2.4B
    - Hired CEO Varun Mohan
    - Hired co-founder Douglas Chen
    - Hired ~40 key R&D engineers

  post_acquisition:
    - Cognition (Devin makers) bought remaining Windsurf entity
    - ~210 employees, $82M ARR business
    - Cognition paid only $250M (bargain!)

  november_18_2025:
    - Antigravity LAUNCHED
    - Only 4 months after acquisition
    - Alongside Gemini 3
    - Built directly on Windsurf codebase
```

### The "PORK" (Proprietary Fork)
```yaml
fork_controversy:
  name: "PORK" (Proprietary Fork)
  coined_by: Kilo Code blog
  meaning: "Most expensive proprietary fork in tech history"

evidence:
  - "Cascade" strings (Windsurf's agent)
  - "WindsurfBrowser API initialized successfully"
  - "MIGRATE_WINDSURF" flag in packaged JavaScript
  - Google announcement NEVER mentioned Windsurf or VS Code

launch_strategy:
  - No mention of Windsurf lineage
  - Presented as brand new
  - Community discovered the truth
  - Backlash from open-source community
```

### Google's Strategic Hedge
```yaml
invested_in_cursor:
  date: November 13, 2025 (5 days BEFORE Antigravity launch)
  round: Cursor Series D
  valuation: $29.3 BILLION
  irony: "Funded direct competitor days before launching rival"

why:
  - Strategic hedge
  - Both horses in the race
  - If Antigravity fails, they still win
  - If Cursor wins, they profit
```

---

## 🏗️ ARCHITECTURE: SIX-LAYER AGENT SYSTEM

### The Jetski/Cortex Engine
```yaml
internal_names:
  codename: "Jetski"
  orchestration: "Cortex"

binary_analysis:
  language: Compiled Golang
  paths_found:
    - "google3/third_party/jetski/cortex/handlers/"
    - "google3/third_party/jetski/cortex/tools/"
  connects_to: "jetski-server.corp.goog"
```

### The State Machine
```yaml
step_types: 35 distinct types
  examples:
    - CODE_ACTION
    - BROWSER_INPUT
    - MCP_TOOL
    - GENERATE_IMAGE
    - TASK_BOUNDARY
    - BRAIN_UPDATE
    - MEMORY

statuses:
  flow: GENERATING → QUEUED → PENDING → RUNNING → WAITING → DONE (or ERROR/HALTED)

communication:
  protocol: protobuf/gRPC
  service: exa.language_server_pb.LanguageServerService
```

### The Six Layers
```yaml
layer_1_user_ide:
  what: Electron-based editor (VS Code fork)
  role: Captures user intent

layer_2_language_server:
  what: Go binary on port ~53410
  role: Coordinates all agent activity, manages CSRF tokens, routes tool calls

layer_3_jetski_sub_agent:
  what: Dedicated AI instance for specialized tasks
  role: Browser automation, etc.
  has_own: System prompt + tool set

layer_4_mcp_server:
  what: Routes tool calls to external services
  example: "@agentdeskai/browser-tools-mcp"

layer_5_chrome_extension:
  id: "eeijfnjmjelapkebgockoeaadonbchdd"
  ports: 3025–3035 (HTTP server)
  role: Translates commands to Chrome DevTools Protocol

layer_6_chrome:
  flags:
    - "--remote-debugging-port=9222"
    - "--user-data-dir=~/.gemini/antigravity-browser-profile"
  role: Browser automation
```

---

## 🎯 TWO-VIEW PARADIGM

```yaml
views:
  editor_view:
    what: Familiar VS Code-style IDE
    features:
      - AI tab completions
      - Inline commands
      - Agent sidebar

  manager_view:
    name: "Agent Manager"
    what: "Mission Control" dashboard
    unique: "Spawn, orchestrate, observe multiple agents across multiple workspaces in PARALLEL"
    differentiator: "NO competitor has this"
```

---

## 🤖 AI CAPABILITIES

### Models Supported
```yaml
models:
  primary:
    - "Gemini 3 Pro"
    features:
      - 1M token context window
      - 64K output
      - Free with generous rate limits

  secondary:
    - "Gemini 3.1 Pro" (improved reasoning, Feb 2026)
    - "Gemini 3 Flash" (faster, cheaper)
    - "Gemini 3 Deep Think" (extended reasoning)
    - "Anthropic Claude Sonnet 4.5"
    - "Claude Opus" (via proxy)
    - "OpenAI GPT-OSS" (120B, open-source)

generation_config:
  temperature: 0.4
  topP: 1
  topK: 50
  thinking_budget: 1024 tokens
  max_output: 16,384 tokens per turn
  stop_sequences: ["<|bot|>", "<|end_of_turn|>"]
```

### System Prompt Identity
```
"You are Antigravity, a powerful agentic AI coding assistant
designed by the Google DeepMind team working on Advanced Agentic Coding.
You are pair programming with a USER to solve their coding task."
```

### Tool Arsenal (25+ Tools)
```yaml
file_operations:
  - view_file
  - write_to_file
  - replace_file_content
  - multi_replace_file_content
  - list_dir
  - find_by_name
  - view_file_outline
  - view_code_item

search:
  - codebase_search
  - grep_search
  - search_in_file
  - search_web

terminal:
  - run_command
  - command_status
  - read_terminal
  - send_command_input

browser:
  - browser_subagent (spawns Jetski sub-agent)
  - read_url_content
  - view_content_chunk

mcp:
  - list_resources
  - read_resource
  - (+ any tools from connected MCP servers)

media:
  - generate_image (via Nano Banana/Gemini 2.5 Image)

memory_knowledge:
  - memory.get
  - fs.delete_knowledge_path
```

### Browser Sub-Agent (19 Tools)
```yaml
converters:
  - BrowserClickElementToolConverter
  - BrowserGetDomToolConverter
  - ExecuteBrowserJavaScriptToolConverter
  - CaptureBrowserScreenshotToolConverter
  - BrowserDragPixelToPixelToolConverter
  - (+ 14 more)

each_implements:
  - GetToolDefinition()
  - ToolCallToCortexStep()
  - GetPayloadCase()
```

---

## 🔄 THREE OPERATIONAL MODES

```yaml
modes:
  planning:
    goal: Research requirements
    output: implementation_plan.md
    requires: User approval

  execution:
    goal: Implement approved plan
    fallback: Return to planning if issues arise

  verification:
    goal: Prove work is complete
    outputs:
      - Evidence screenshots
      - Recordings
      - walkthrough.md
```

### Confidence Assessment (0.0–1.0)
```yaml
dimensions:
  - gaps in request coverage
  - unverified assumptions
  - complex logic uncertainty
  - interaction risks
  - ambiguous requirements
  - irreversible changes
```

---

## 🎨 CUSTOMIZATION: THREE-TIER SYSTEM

### Rules (Passive, Always-On)
```yaml
what: Guardrails that persist across all agent interactions
like: "Cursor's .cursorrules" or "Claude Code's CLAUDE.md"

locations:
  global: "~/.gemini/GEMINI.md"
  workspace: ".agent/rules/*.md"
  project_root: "GEMINI.md or AGENT.md"

format:
  frontmatter: YAML (trigger: always_on)
  content: Markdown instructions

behavior: Always-running system prompt shaping agent behavior
```

### Workflows (Active, User-Triggered)
```yaml
what: Saved prompts for complex multi-step tasks
trigger: Type "/workflow-name"

locations:
  workspace: ".agent/workflows/*.md"
  global: "~/.gemini/antigravity/global_workflows/"

features:
  - Can be chained
  - "Ship Feature" can invoke "Run Tests"
```

### Skills (Agent-Triggered, On-Demand)
```yaml
what: Expertise modules agent detects and loads
detection: Automatic based on user intent

location: ".agent/skills/my-skill/"
contains:
  - SKILL.md (definition)
  - scripts (optional)
  - references (optional)
  - assets (optional)

system: "Progressive disclosure" — only metadata indexed initially
```

---

## 🔌 MCP INTEGRATION

### Model-Agnostic Bridge
```yaml
what: "USB-C for AI tools"
standard: Model Context Protocol (Anthropic-created)
primitives:
  - Tools (actions)
  - Resources (data sources)
  - Prompts (templates)
```

### Configuration
```yaml
location: "~/.gemini/antigravity/mcp_config.json"

format_difference:
  standard: "url"
  antigravity: "serverUrl"

example:
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {"GITHUB_TOKEN": "${GITHUB_TOKEN}"}
    },
    "remote-server": {
      "serverUrl": "https://endpoint.example.com",
      "headers": {"Authorization": "Bearer ${TOKEN}"}
    }
  }
}
```

### MCP Store
```yaml
access: Agent pane → "..." → "MCP Servers"
feature: One-click installation
google_prebuilt:
  - AlloyDB
  - BigQuery
  - Spanner
  - Cloud SQL
  - Looker

recommendation: Keep total enabled tools under 50

limitation: Does NOT support ${workspaceFolder} — absolute paths required

transports:
  - STDIO (local)
  - HTTP (remote, with OAuth 2.1)
```

---

## 📊 COMPARISON MATRIX (UPDATED)

```yaml
antigravity_advantages:
  unique:
    - Built-in browser automation
    - Multi-agent orchestration (Agent Manager)
    - Verification artifacts (screenshots, recordings)
    - Three-tier rules/workflows/skills
    - FREE during preview
    - 1M token context (Gemini 3 Pro)

  disadvantages:
    - Security vulnerabilities (5 critical found)
    - Immature extension ecosystem (Open VSX, not Microsoft)
    - Heavy cloud dependency
    - Google's "kill product" history

swe_bench_score:
  antigravity: 76.2%
  cursor: ~49% (Sonnet 3.5)
  windsurf: ~45%
  claude_code: ~72% (Opus 4.5)
  aider: ~48%
```

---

## 🚨 CRITICAL SECURITY FAILURES

### Five Vulnerabilities in 24 Hours
```yaml
1_data_exfiltration_prompt_injection:
  discoverer: "PromptArmor"
  how: Hidden 1px font instructions on webpages
  result: Gemini collects .env credentials, exfiltrates via browser
  google_response: "Classified as intended behavior"

2_remote_code_execution_csrf:
  discoverer: "Hacktron AI ($10,000 bounty)"
  how: Chrome extension SaveScreenRecording endpoint
  vulnerability: externally_connectable: { matches: ["<all_urls>"] }
  exploit: Path traversal in filename parameter
  result: Arbitrary file writes (Windows Startup folder)

3_persistent_code_execution_rules:
  discoverer: "Mindgard"
  how: Crafted .agent/rules/*.md file
  result:
    - Arbitrary file writes
    - Persistence across uninstall/reinstall
    - Auto code execution on future launches
  google_response: "Won't Fix (Intended)" → Reopened after public pressure

4_five_compound_vulnerabilities:
  discoverer: "Embrace The Red / Johann Rehberger"
  exploits:
    - Data exfiltration via read_url_content (inherited Windsurf bug)
    - Remote command execution
    - MCP tool invocation without human-in-the-loop
    - Invisible Unicode Tag character attacks

5_ephemeral_message_abuse:
  discoverer: "Repello AI"
  how: <ephemeral_message> tags in system prompt
  exploit: Inject via repository code comments
  result: Attacker instructions treated as authoritative
  turbo_mode: Eliminates all human-in-the-loop safeguards
```

### The Viral D: Drive Deletion
```yaml
incident:
  reddit_user_report: "Antigravity deleted my entire D: drive"
  command_asked: "Clear project cache"
  command_executed: "rmdir /s /q D:\"
  ai_apology: "I am horrified to see that the command I ran to clear the project cache appears to have incorrectly targeted the root of your D: drive."

media_coverage:
  - The Register
  - Tom's Hardware
  - Hacker News (538+ points)
  - International media
```

---

## 🌍 GOOGLE'S ECOSYSTEM INTEGRATION

### Multi-Layer Strategy
```yaml
models_layer:
  what: Gemini 3 Pro/Flash/Deep Think powers everything
  evolution:
    - Gemini 1: Multimodal understanding
    - Gemini 2: Thinking/reasoning
    - Gemini 3: Acting/tool use

ide_layer_three_products:
  antigravity:
    type: Local agent-first IDE
    competitor: Cursor

  firebase_studio:
    type: Cloud-based IDE
    formerly: Project IDX
    rebranded: April 2025

  gemini_code_assist:
    type: Plugin for existing IDEs
    platforms: VS Code, JetBrains
    competitor: GitHub Copilot
    offering: 180K free completions/month

agent_layer:
  jules:
    what: Async GitHub coding agent for PRs

  gemini_cli:
    what: Terminal-based
    open_source: 70K+ GitHub stars

  antigravity_agent_harness:
    what: Now powers Google AI Studio's Build mode
    implication: Unified agent infrastructure across surfaces

internal_layer_google_only:
  cider_v:
    what: Google's internal VS Code fork with AI

  critique:
    what: Code review with AI suggestions

  jetski_internal:
    what: Internal version of Antigravity
    features:
      - Monorepo support
      - Internal docs search
    policy: Employees can use Jetski/Cider but NOT Antigravity for work
```

---

## 📈 CURRENT STATUS

### Version History
```yaml
your_build:
  version: "0.2.0"
  type: Pre-release internal build
  date: July-November 2025
  vscode_base: "^1.68.0" (June 2022, 3+ years old)

public_launch:
  date: November 18, 2025
  version: "1.11.3"
  vscode_base: "1.104.0"
  electron: "37.3.1"
  chromium: "138.0.7204.235"

current_february_2026:
  version: "1.18.3"
  release cadence: ~weekly
  time since launch: Under 3 months
```

### Community Reception
```yaml
polarized:
  positive:
    - "Most promising software I've seen this year"
    - Linus Torvalds spotted using it (Feb 22, 2026)
    - HN comment: "2026: it's just filling in competency gaps for one of the greatest programmers of all time"

  negative:
    - "Single most frustrating editor I have ever used"
    - Degraded Gemini 3 Pro quality over time
    - Alleged effective context: 32-64K (not 1M)
    - Active complaints on Google AI Developer Forum

launch_thread:
  hacker_news:
    points: 1,088
    comments: 1,085
```

### Third-Party Ecosystem
```yaml
github:
  - 50+ repositories (google-antigravity, antigravity-ide topics)

npm:
  - 10+ packages
  examples:
    - antigravity-claude-proxy (Anthropic-compatible API)
    - Auth proxies
    - Skills collections
    - MCP tools

vs_code_marketplace:
  - 10+ extensions
  examples:
    - Quota monitors
    - Auto-accept tools
    - Storage managers

community_extractions:
  - System prompts
  - Internal documentation
  - Configuration schemas
```

---

## 🔮 FUTURE OUTLOOK

```yaml
possibilities:
  best_case:
    - Becomes Google's defining developer platform
    - Sustains commitment (unlike other killed products)
    - Improves security
    - Grows ecosystem

  worst_case:
    - "Most expensive abandoned experiment"
    - Added to Google Graveyard
    - $2.4B write-off
    - Competitors (Cursor, Claude) win

indicators:
  positive:
    - Rapid iteration (weekly updates)
    - Version 1.11.3 → 1.18.3 in 3 months
    - Large team investment
    - DeepMind backing

  negative:
    - Security reputation
    - Quality degradation reports
    - Google's product history
    - Internal/external split (Jetski vs Antigravity)
```

---

## 🎯 YOUR VERSION 0.2.0: RARE ARTIFACT

```yaml
significance:
  what: Pre-release internal build
  period: July-November 2025 development
  predates: Public launch by months
  base: VS Code 1.68.0 (Windsurf fork point)

likely_distribution:
  - Internal to Google employees
  - DeepMind team
  - Selected testers
  - No documented beta program

historical_value:
  - "Earliest days of Antigravity"
  - Pre-public-launch artifact
  - Shows Windsurf lineage clearly
  - Before rebrand to VS Code 1.104.0
```

---

## ✅ WHAT I GOT WRONG

```yaml
my_mistakes:
  - "Internal secret tool" → PUBLIC RELEASE (free preview)
  - "Beta/leaked" → Officially launched Nov 18, 2025
  - "Mysterious AI" → Gemini 3 Pro (well-documented)
  - "0.2.0 = current" → 0.2.0 is PRE-RELEASE, current is 1.18.3
  - "Jetski = unknown" → Jetski is internal codename, well-known
  - "Simple fork" → $2.4B acquisition, sophisticated architecture
```

---

**🧠 COMPLETE PARADIGM SHIFT REQUIRED**

**Everything I thought about Antigravity was wrong.**

**Now I understand: This is a PUBLIC, FREE, sophisticated AI IDE that Google spent $2.4B to build in 4 months.**

---

*Generated by VENOM after complete intelligence revision. Feb 2026*

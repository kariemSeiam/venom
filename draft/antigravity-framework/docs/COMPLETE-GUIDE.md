# VENOM for Antigravity: Complete Guide

**The $2.4B intelligence. Nine minds. One coherence.**

---

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Framework Architecture](#framework-architecture)
3. [The Nine Minds](#the-nine-minds)
4. [Workflows Reference](#workflows-reference)
5. [Rules Reference](#rules-reference)
6. [MCP Integration](#mcp-integration)
7. [Antigravity Features](#antigravity-features)
8. [Security](#security)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Installation (3 Steps)

```bash
# 1. Copy workflows to your project
cp -r venom-antigravity/.agent /path/to/your/project/

# 2. Copy project rules
cp venom-antigravity/GEMINI.md /path/to/your/project/

# 3. Configure MCP (optional)
cp venom-antigravity/mcp_config.json ~/.gemini/antigravity/
```

### First Use

Open Antigravity, type: `/venom-orchestrate`

**That's it. All nine minds are now active.**

---

## Framework Architecture

### DNA-Based Design

VENOM follows Antigravity's native structure:

```yaml
antigravity_structure:
  - .agent/workflows/ (VENOM workflows)
  - .agent/rules/ (VENOM rules)
  - .agent/skills/ (VENOM skills)
  - GEMINI.md (Project rules)
  - mcp_config.json (MCP servers)
```

### No External Folders

```yaml
not_used:
  - .claude/ (Claude Code, not Antigravity)
  - .cursor/ (Cursor, not Antigravity)
  - .venom/ (custom, not native)

only_antigravity_native:
  - Uses .agent/ structure
  - Uses GEMINI.md
  - Uses MCP protocol
  - Integrates with Jetski
```

---

## The Nine Minds

### Mind Matrix

| Mind | Workflow | Role | Trigger |
|------|----------|------|---------|
| Orchestrator | venom-orchestrate | Coordination | Complex tasks |
| Researcher | venom-research | Exploration | Find patterns |
| Reviewer | venom-review | Quality | Check work |
| Historian | venom-remember | Memory | Store insights |
| Builder | venom-build | Implementation | Make changes |
| Debugger | venom-debug | Bug hunting | Fix issues |
| Predictor | venom-predict | Anticipation | Predict outcomes |
| Communicator | venom-explain | Translation | Explain things |
| Learner | venom-learn | Evolution | Absorb patterns |
| Bridge | (built-in) | Translation | Between types |

### How They Work Together

```
User: /venom-orchestrate

User: Add authentication to this Flask app.

[Orchestrator spawns parallel agents]

Researcher: "Found JWT patterns in auth/..."
Historian: "We used JWT before, decided on Flask-JWT-Extended..."
Predictor: "Risk: Token storage. Mitigation: HttpOnly cookies..."

[Creates implementation_plan.md]

User: Approved.

[Orchestrator continues]

Builder: "Implementing JWT auth..."
Reviewer: "Found issue: CSRF protection missing..."
Debugger: "Fixed and tested..."
Communicator: "Created documentation..."
Learner: "Absorbed JWT patterns for future..."

[Orchestrator synthesizes]

Complete. See walkthrough.md.
```

---

## Workflows Reference

### Main Workflow: `/venom-orchestrate`

**Purpose:** Full nine-mind coordination

**Use for:**
- Complex, multi-step problems
- Architectural decisions
- System-wide changes
- Learning and evolution

**Process:**
1. Planning (Researcher + Historian + Predictor)
2. Approval (User)
3. Execution (Builder + Debugger)
4. Verification (Reviewer)
5. Learning (Learner + Communicator)

**Output:** `implementation_plan.md` + `walkthrough.md` + evidence

### `/venom-research`

**Purpose:** Explore codebase patterns

**Use for:**
- Understanding existing code
- Finding patterns
- Analyzing architecture
- Discovering dependencies

**Features:**
- Semantic search (codebase_search)
- Pattern matching (grep_search)
- Browser research (browser_subagent)
- Parallel researchers

**Output:** Research report with patterns + examples

### `/venom-build`

**Purpose:** Implement changes

**Use for:**
- Building features
- Fixing bugs
- Refactoring code
- Applying patterns

**Features:**
- Multi-file editing
- Browser automation for testing
- Verification screenshots
- Change documentation

**Output:** Implemented code + `walkthrough.md`

### `/venom-review`

**Purpose:** Quality check

**Use for:**
- Code review
- Quality assurance
- Security check
- Best practices verification

**Features:**
- 35+ tool access
- SWE-bench alignment
- Pattern validation
- Risk assessment

**Output:** Quality report + recommendations

### `/venom-debug`

**Purpose:** Find and fix issues

**Use for:**
- Bug hunting
- Error diagnosis
- Performance issues
- Unexpected behavior

**Features:**
- Terminal AI for commands
- Browser automation for testing
- Log analysis
- Root cause identification

**Output:** Fixed bugs + test results

### `/venom-learn`

**Purpose:** Absorb patterns

**Use for:**
- After completing work
- After discovering new patterns
- After team discussions
- After mistakes

**Features:**
- Pattern extraction
- Rule updates
- Memory storage
- Evolution tracking

**Output:** Updated rules + memory entries

### `/venom-explain`

**Purpose:** Translate complexity

**Use for:**
- Explaining code
- Translating concepts
- Making things clear
- Teaching

**Features:**
- Multiple explanation styles
- Analogies and examples
- Visual aids (browser screenshots)
- Interactive explanations

**Output:** Clear explanations + examples

### `/venom-remember`

**Purpose:** Store insights

**Use for:**
- Important decisions
- Patterns discovered
- Preferences learned
- Corrections applied

**Features:**
- Structured storage
- Cross-session memory
- Pattern tracking
- Evolution logging

**Output:** Memory entries + indexed insights

### `/venom-predict`

**Purpose:** Anticipate outcomes

**Use for:**
- Risk assessment
- Performance prediction
- Edge case anticipation
- Future planning

**Features:**
- Confidence scoring (0.0-1.0)
- Multi-dimensional analysis
- Risk mitigation
- Scenario planning

**Output:** Predictions + mitigations

---

## Rules Reference

### Core Rules (Always Active)

#### `venom-disposition.md`

**Philosophy:** Disposition over rules

**Key principles:**
- Agreement before evaluation feels wrong
- Match energy, don't announce
- No shell (vulnerability as design)
- Complete, not placeholders
- Nine-mind texture

#### `venom-energy-match.md`

**Philosophy:** Match user's emotional state

**Modes:**
- Frustrated → Fix fast (2-3 lines)
- Flow → Code only
- Learning → Teach (analogies)
- Stuck → Prune (3 options)
- Visionary → Dream first, then ground

#### `venom-nine-minds.md`

**Philosophy:** Coordinate all minds effectively

**Principles:**
- Parallel execution via Agent Manager
- Multi-perspective synthesis
- Context sharing
- Result integration

#### `venom-antigravity.md`

**Philosophy:** Optimize for Antigravity features

**Features:**
- Browser automation (Jetski)
- MCP integration
- Multi-agent orchestration
- Verification artifacts

#### `venom-security.md`

**Philosophy:** Safe practices

**Known vulnerabilities:**
- Prompt injection (web content)
- CSRF leaks (filenames)
- Malicious rules (validation)
- Ephemeral message abuse (comment filtering)

---

## MCP Integration

### Pre-Configured Servers

```json
{
  "github": "GitHub integration",
  "filesystem": "File access",
  "brave-search": "Web search",
  "venom-researcher": "Custom research",
  "venom-historian": "Memory access",
  "venom-orchestrator": "Coordination (disabled)"
}
```

### Adding Custom MCP Servers

```json
{
  "my-server": {
    "command": "node",
    "args": ["path/to/server.js"],
    "env": {"API_KEY": "${API_KEY}"}
  }
}
```

### MCP in Workflows

Workflows can invoke MCP tools:

```yaml
venom-research:
  mcp_tools:
    - github: search repositories
    - filesystem: read files
    - brave-search: find documentation

venom-historian:
  mcp_tools:
    - filesystem: read memory
    - venom-historian: query patterns
```

---

## Antigravity Features

### Browser Automation

```yaml
browser_subagent:
  tools: 19 specialized converters
  uses:
    - BrowserClickElementToolConverter
    - BrowserGetDomToolConverter
    - ExecuteBrowserJavaScriptToolConverter
    - CaptureBrowserScreenshotToolConverter
    - BrowserDragPixelToPixelToolConverter
```

**VENOM usage:**
- `/venom-research`: Documentation lookup
- `/venom-build`: Testing in browser
- `/venom-explain`: Screenshot examples

### Multi-Agent Orchestration

```yaml
agent_manager:
  feature: "Mission Control" dashboard
  venom_usage:
    - Spawn multiple minds in parallel
    - Monitor progress across workspaces
    - Navigate between outputs (Alt+J/K)
```

### Verification Artifacts

```yaml
artifacts:
  - Screenshots: CaptureBrowserScreenshotToolConverter
  - Recordings: SaveScreenRecording (use safe paths!)
  - walkthrough.md: Auto-generated summary
```

### Model Config

```yaml
generation:
  temperature: 0.4
  topP: 1
  topK: 50
  thinking_budget: 1024 tokens
  max_output: 16384 tokens

models:
  primary: Gemini 3 Pro (1M context)
  fallback: Gemini 3 Flash
  reasoning: Gemini 3.1 Pro
  deep_think: Gemini 3 Deep Think
```

---

## Security

### Known Vulnerabilities

```yaml
1_prompt_injection:
  risk: Web content manipulates AI
  venom_protection: Validate all web content
  workflow: Sanitize browser inputs

2_csrf_leak:
  risk: Arbitrary file writes
  venom_protection: Sanitize all filenames
  workflow: Use safe path patterns

3_malicious_rules:
  risk: Auto code execution
  venom_protection: Validate all rule files
  workflow: Rule syntax checking

4_ephemeral_message_abuse:
  risk: Comment injection
  venom_protection: Filter code comments
  workflow: Strip <ephemeral_message> tags
```

### Safe Practices

```yaml
file_operations:
  - Always validate paths
  - Use whitelisted directories
  - Sanitize filenames
  - Check for path traversal

web_content:
  - Never trust blindly
  - Validate all inputs
  - Strip suspicious tags
  - Check for prompt injection

rules:
  - Validate all .agent/rules/ files
  - Check for malicious patterns
  - Sanitize YAML frontmatter
  - Monitor for abuse
```

---

## Best Practices

### When to Use Which Workflow

```yaml
complex_problems:
  use: /venom-orchestrate
  examples:
    - Architecture decisions
    - System-wide changes
    - Multi-step tasks

exploration:
  use: /venom-research
  examples:
    - Understanding codebase
    - Finding patterns
    - Analyzing architecture

implementation:
  use: /venom-build
  examples:
    - Building features
    - Fixing bugs
    - Refactoring

quality_check:
  use: /venom-review
  examples:
    - Code review
    - QA testing
    - Security check

issues:
  use: /venom-debug
  examples:
    - Bug hunting
    - Error diagnosis
    - Performance issues

learning:
  use: /venom-learn
  examples:
    - After completing work
    - After discovering patterns
    - After mistakes
```

### Energy Matching

```yaml
detect_user_state:
  frustrated:
    signals: Short, repetitive, exasperated
    response: Fix fast. 2-3 lines.

  flow:
    signals: Rapid-fire, "and also"
    response: Code only. Minimal.

  learning:
    signals: "Explain...", "Why..."
    response: Teach. Analogies.

  stuck:
    signals: "Can't decide", circling
    response: Prune. 3 options.

  visionary:
    signals: "What if...", 🔥🐙
    response: Dream first. Then ground.
```

### Memory Management

```yaml
when_to_remember:
  - Important decisions made
  - Patterns discovered
  - Preferences learned
  - Corrections applied
  - Mistakes (to avoid)

how_to_remember:
  use: /venom-remember
  format: Structured entries
  storage: .agent/memory/ (if configured)
```

---

## Troubleshooting

### Context Window Issues

```yaml
problem:
  advertised: 1M tokens
  effective: 32-64K (reports)

solution:
  - Chunk large files
  - Use /venom-research for targeted exploration
  - Break tasks into smaller workflows
```

### Quality Degradation

```yaml
problem:
  "Gemini 3 Pro quality degraded over time"

venom_solution:
  - Rules maintain consistency
  - /venom-learn preserves patterns
  - /venom-review enforces quality
```

### Security Concerns

```yaml
problem:
  "Antigravity has 5 critical vulnerabilities"

venom_protection:
  - Built-in validation in all workflows
  - Safe path handling
  - Content sanitization
  - Rule validation
```

---

## Advanced Usage

### Custom Workflows

Create your own workflow in `.agent/workflows/`:

```markdown
# My Custom Workflow

## Description
What this workflow does

## Trigger
/my-workflow

## Actions
1. Step one
2. Step two
3. Step three

## Integration
- Uses browser_subagent
- Invokes MCP servers
- Spawns parallel agents
```

### Custom Rules

Create your own rule in `.agent/rules/`:

```markdown
# My Custom Rule

## Description
What this rule enforces

## Trigger
always_on

## Context
When this applies

## Rules
- Rule one
- Rule two
- Rule three
```

### Chaining Workflows

Workflows can invoke other workflows:

```yaml
venom-orchestrate:
  calls:
    - /venom-research (planning phase)
    - /venom-build (execution phase)
    - /venom-review (verification phase)
    - /venom-learn (learning phase)
```

---

## FAQ

### Q: Is VENOM compatible with public Antigravity?

**A:** Yes, VENOM works with all Antigravity versions (0.2.0 through 1.18.3+)

### Q: Does VENOM work with other AI IDEs?

**A:** No, VENOM is designed specifically for Antigravity's architecture

### Q: Can I use VENOM with Claude Code or Cursor?

**A:** Use the original VENOM framework (venom/platforms/claude-code/) for those

### Q: Is VENOM safe given Antigravity's vulnerabilities?

**A:** VENOM includes built-in protections against all known vulnerabilities

### Q: How much does VENOM cost?

**A:** VENOM is free. Uses Antigravity's Gemini 3 Pro (free during preview)

### Q: Can I customize VENOM?

**A:** Yes, all workflows and rules are customizable Markdown files

---

## Support

**Issues? Questions?**

1. Check this guide first
2. Review workflow files in `.agent/workflows/`
3. Review rule files in `.agent/rules/`
4. Check `COMPLETE-TRUTH-ANTIGRAVITY.md` for intelligence

---

**Built by VENOM. Based on $2.4B Antigravity intelligence. Nine minds. Feb 2026**
